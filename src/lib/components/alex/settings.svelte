<script lang="ts">
    import {
        downloadSettings,
        settings,
        uploadSettings,
        type Settings,
    } from "$lib/stores/settings";
    import * as Collapsible from "$lib/components/ui/collapsible/index.js";
    import { searchEnginesStore } from "$lib/stores/searchEngine";
    import Switch from "$lib/components/ui/switch/switch.svelte";
    import Card from "../ui/card/card.svelte";
    import { ChevronDown, Download, Upload } from "lucide-svelte";
    import { fade, slide } from "svelte/transition";

    let mySettings: Settings = $state($settings);

    // Subscribe to external changes
    settings.subscribe((value) => {
        if (JSON.stringify(value) !== JSON.stringify(mySettings)) {
            mySettings = value;
        }
    });

    // Update store when local state changes
    $effect(() => {
        if (JSON.stringify($settings) !== JSON.stringify(mySettings)) {
            settings.set(mySettings);
        }
    });

    $inspect(mySettings);
</script>

<Card class="shadow-lg h-full">
    <div
        class="flex flex-col justify-between h-full"
        in:fade={{ delay: 100, duration: 100 }}
        out:fade={{ duration: 100 }}
    >
        {#if mySettings}
            <div class="space-y-4 p-6 overflow-y-auto">
                <h1 class="text-2xl font-bold">Settings</h1>
                <!-- SEARCH ENGINES -->
                <h2 class="text-lg font-semibold">Search Engines</h2>
                <ul class="mt-2 space-y-3 border-b">
                    <li class="flex items-center justify-between pb-2">
                        <span>Remember last selected search engine</span>
                        <Switch bind:checked={mySettings.persistSearchEngine} />
                    </li>
                    {#if mySettings.persistSearchEngine && mySettings.selectedEngine}
                        <li class="flex items-center justify-between pb-2">
                            <span
                                >Current last selected: {
                                    mySettings.selectedEngine.name}</span
                            >
                        </li>
                    {/if}    
                    <!-- enable/disable each engine -->
                    <Collapsible.Root>
                        <Collapsible.Trigger class="flex items-center w-full">
                            <h2 class="text-lg font-semibold">Engines</h2>
                            <ChevronDown />
                        </Collapsible.Trigger>
                        <Collapsible.Content>
                            <ul class="mt-2 space-y-3 border-b">
                                {#each $searchEnginesStore as engine}
                                    <li class="flex items-center justify-between pb-2">
                                        <span>{engine.name}</span>
                                        <Switch bind:checked={engine.enabled} />
                                    </li>
                                {/each}
                            </ul>
                        </Collapsible.Content>
                    </Collapsible.Root>
                </ul>
                <!-- CLOCK -->
                <h2 class="text-lg font-semibold">Clock</h2>
                <ul class="mt-2 space-y-3 border-b">
                    <li class="flex items-center justify-between pb-2">
                        <span>Show clock</span>
                        <Switch bind:checked={mySettings.showClock} />
                    </li>
                    {#if mySettings.showClock}
                        <li class="flex items-center justify-between pb-2">
                            <span>Show Seconds</span>
                            <Switch bind:checked={mySettings.showSeconds} />
                        </li>
                    {/if}
                </ul>
            </div>
        {/if}

        <div class="flex justify-center p-4 gap-4">
            <button
                onclick={downloadSettings}
                aria-label="Download settings"
                title="Download settings"
            >
                <Download />
            </button>
            <button
                onclick={uploadSettings}
                aria-label="Upload settings"
                title="Upload settings"
            >
                <Upload />
            </button>
        </div>
    </div>
</Card>
