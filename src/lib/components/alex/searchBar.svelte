<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { cn } from "$lib/utils.js";
    import { selectedEngine } from "$lib/stores/searchEngine";
    import { Globe } from "lucide-svelte";
    import { slide } from "svelte/transition";

    let {
        ref = $bindable(null),
        value = $bindable(""),
        isUrl = $bindable(false),
        class: className,
        ...restProps
    } = $props();

    let hiddenFavicon = $state(true);
    let src = $derived.by(() => {
        return value.lastIndexOf("/") > 8
            ? value.split('/').slice(0, 3).join('/') + "/favicon.ico"
            : value + "/favicon.ico";
    });

    $inspect(src);

    $effect(() => {
        isUrl = /^(https?:\/\/|localhost[:\/]|(\d{1,3}\.){3}\d{1,3}[:\/])/
        .test(
            value,
        );
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
</script>

<div class="w-full flex justify-between items-center max-w-md">
    {#if isUrl}
        <img 
            src={src}
            alt="" 
            class="h-6 w-6 rounded-md {hiddenFavicon ? "hidden" : ""}" 
            onload={() => (hiddenFavicon = false)} 
            onerror={() => (hiddenFavicon = true)} 
        />
        <span transition:slide={{ axis: "x", duration: 100 }} class={hiddenFavicon ? "" : "hidden"}>
            <Globe />
        </span>
    {/if}
    <Input
        placeholder={$selectedEngine.name}
        bind:ref
        bind:value
        class={cn(
            "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className,
        )}
        {...restProps}
        onkeydown={(e) => {
            if (e.key === "Enter") {
                search();
            }
        }}
    />
</div>
<!-- <Input bind:ref bind:value class={cn(className)} {...restProps} /> -->
