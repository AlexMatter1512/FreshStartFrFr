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
    import Boolean from "./settings/boolean.svelte";

    // let mySettings: Settings = $state($settings);

    // Subscribe to external changes
    // settings.subscribe((value) => {
    //     console.log("Settings updated", value);
    //     if (JSON.stringify(value) !== JSON.stringify(mySettings)) {
    //         mySettings = value;
    //     }
    // });

    // Update store when local state changes
    // $effect(() => {
    //     if (JSON.stringify($settings) !== JSON.stringify(mySettings)) {
    //         settings.set(mySettings);
    //     }
    // });

    // $inspect(mySettings);
</script>

<Card class="shadow-lg h-full">
    <div
        class="flex flex-col justify-between h-full"
        in:fade={{ delay: 100, duration: 100 }}
        out:fade={{ duration: 100 }}
    >
        {#if $settings}
            <div class="space-y-4 p-6 overflow-y-auto">
                <h1 class="text-2xl font-bold">Settings</h1>
                <!-- SEARCH ENGINES -->
                <h2 class="text-lg font-semibold">Search Engines</h2>
                <ul class="mt-2 space-y-3 border-b">
                    <!-- show engines -->
                    <Boolean
                        title="Show search engines icons"
                        bind:setting={$settings.showEngines}
                    />
                    <!-- persist search engine -->
                     <Boolean
                        title="Remember last selected search engine"
                        description="Your last selected search engine will be automatically selected next time"
                        bind:setting={$settings.persistSearchEngine}
                    />
                    {#if $settings.persistSearchEngine && $settings.selectedEngine}
                        <li class="flex items-center justify-between pb-2">
                            <span>Current last selected: {$settings.selectedEngine.name}</span>
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
                                    <Boolean
                                        title={engine.name}
                                        bind:setting={engine.enabled}
                                    />
                                {/each}
                            </ul>
                        </Collapsible.Content>
                    </Collapsible.Root>
                </ul>
                <!-- CLOCK -->
                <h2 class="text-lg font-semibold">Clock</h2>
                <ul class="mt-2 space-y-3 border-b">
                    <Boolean
                        title="Show Clock"
                        bind:setting={$settings.showClock}
                    />
                    {#if $settings.showClock}
                        <Boolean
                            title="Show Seconds"
                            bind:setting={$settings.showSeconds}
                        />
                        <Boolean
                            title="Show Date on Hover"
                            bind:setting={$settings.showDateOnHover}
                        />
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
