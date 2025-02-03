<script lang="ts">
    import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
    import {
        searchEnginesStore,
        selectedEngine,
    } from "$lib/stores/searchEngine.js";
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";

    let selectedEngineName = $state($selectedEngine.name);
    // svelte-ignore non_reactive_update
    // let ref: HTMLDivElement | null = null;
    let { ref = $bindable(null), hidden = $bindable(false) } = $props();

    $effect(() =>
        selectedEngine.set(
            $searchEnginesStore.find(
                (engine) => engine.name === selectedEngineName,
            ) ?? $searchEnginesStore[0],
        ),
    );

    selectedEngine.subscribe((engine) => {
        selectedEngineName = engine.name;
    });
</script>

{#if !hidden}
    <!-- content here -->
    <div transition:slide={{ duration: 100 }}>
        <ToggleGroup.Root
            type="single"
            bind:value={selectedEngineName}
            bind:ref
            tabindex={0}
        >
            {#each $searchEnginesStore as engine}
                {#if engine.enabled}
                    <!-- content here -->
                    <ToggleGroup.Item
                        value={engine.name}
                        aria-label={engine.name}
                    >
                        <span class="size-4">{engine.icon}</span>
                    </ToggleGroup.Item>
                {/if}
            {/each}
        </ToggleGroup.Root>
    </div>
{/if}
