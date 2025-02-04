<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { cn } from "$lib/utils.js";
    import { selectedEngine } from "$lib/stores/searchEngine";
    import { Globe, Pin, PinOff } from "lucide-svelte";
    import { slide } from "svelte/transition";
    import { togglePinned, isPinned, type Pinned, pinnedStore } from "$lib/stores/pinned";
    import { onMount } from "svelte";

    let {
        ref = $bindable(null),
        value = $bindable(""),
        isUrl = $bindable(false),
        class: className,
        ...restProps
    } = $props();

    let hiddenFavicon = $state(true);
    let src = $derived.by(() => {
        try {
            return `https://icons.duckduckgo.com/ip3/${new URL(value).hostname}.ico`;
        } catch {
            return "";
        }
    });

    let isValuePinned = $state(false);
    onMount(() => {
        pinnedStore.subscribe((pinned) => {
            isValuePinned = isPinned(value);
        });
    });

    $effect(() => {
        isUrl = /^(https?:\/\/|localhost[:\/]|(\d{1,3}\.){3}\d{1,3}[:\/])/.test(
            value,
        );
        isValuePinned = isPinned(value);
    });

    function search() {
        if (value) {
            // if it is a full url (starts with http or https)
            if (isUrl) {
                window.location.href = value;
                return;
            }
            window.location.href = $selectedEngine.url.concat(value);
        }
    }

    function togglePin() {
        if (isUrl) {
            let newPin: Pinned = {
                name: new URL(value).hostname,
                url: value,
                icon: src,
            };
            togglePinned(newPin);
        }
    }
</script>

<div class="w-full flex justify-between items-center max-w-md gap-4 {cn(className)}">
    {#if isUrl}
        <img
            {src}
            alt=""
            class="h-6 w-6 rounded-md {hiddenFavicon ? 'hidden' : ''}"
            onload={() => (hiddenFavicon = false)}
            onerror={() => (hiddenFavicon = true)}
        />
        <span
            transition:slide={{ axis: "x", duration: 100 }}
            class={hiddenFavicon ? "" : "hidden"}
        >
            <Globe />
        </span>
    {/if}
    <div class="flex-grow relative">
        <Input
            placeholder={$selectedEngine.name}
            bind:ref
            bind:value
            class={cn(
                "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            )}
            {...restProps}
            onkeydown={(e) => {
                if (e.key === "Enter") {
                    search();
                }
            }}
        />
        {#if value}
            <!-- svelte-ignore a11y_consider_explicit_label -->
            <button
                class="h-6 w-6 rounded-full flex items-center justify-center absolute right-2 top-2 text-muted-foreground"
                onclick={() => value = ""}
            >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
        {/if}
    </div>
    {#if isUrl}
        <button
            transition:slide={{ axis: "x", duration: 100 }}
            onclick={togglePin}
        >
            {#if isValuePinned}
                <PinOff />
            {:else}
                <Pin />
            {/if}
        </button>
    {/if}
</div>
