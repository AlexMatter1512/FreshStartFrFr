<script lang="ts">
    import { Input } from "$lib/components/ui/input/index.js";
    import { cn } from "$lib/utils.js";
    import type { HTMLInputAttributes } from "svelte/elements";
    import type { WithElementRef } from "bits-ui";
    import { selectedEngine } from "$lib/stores/searchEngine";

    let {
        ref = $bindable(null),
        value = $bindable(""),
        class: className,
        ...restProps
    }: WithElementRef<HTMLInputAttributes> = $props();

    function search() {
        if (value) {
            window.location.href = $selectedEngine.url.concat(value);
        }
    }
</script>

<Input
    placeholder={$selectedEngine.name}
    bind:ref={ref}
    bind:value
    class={cn(
        "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
    )}
    {...restProps}
    onkeydown={(e) => {
        if (e.key === "Enter") {
            search();
        }
    }}
/>
<!-- <Input bind:ref bind:value class={cn(className)} {...restProps} /> -->
