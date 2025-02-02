<script lang="ts">
    import { toggleMode } from "mode-watcher";
    import { mode } from "mode-watcher";
    import { Sun } from "lucide-svelte";
    import { Moon } from "lucide-svelte";
    import {
        Switch as SwitchPrimitive,
        type WithoutChildrenOrChild,
    } from "bits-ui";
    import { cn } from "$lib/utils.js";

    let {
        ref = $bindable(null),
        class: className,
        // checked = $bindable(false),
        ...restProps
    }: WithoutChildrenOrChild<SwitchPrimitive.RootProps> = $props();

    let checked = $state($mode === "dark");

</script>

<SwitchPrimitive.Root
    bind:ref
    bind:checked
    onCheckedChange={toggleMode}
    class={cn(
        "focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-primary data-[state=unchecked]:bg-input peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
    )}
    {...restProps}
>
    <SwitchPrimitive.Thumb
        class={cn(
            "bg-transparent pointer-events-none block size-5 rounded-full shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
        )}
    >
        <!-- <Skull class="text-background w-5 h-5" /> -->
    {#if $mode === "dark"}
        <Moon class="w-5 h-5" fill="black" color="black" />
    {:else}
        <Sun class="w-5 h-5" fill="black" color="black" />
    {/if}
    </SwitchPrimitive.Thumb>
</SwitchPrimitive.Root>
