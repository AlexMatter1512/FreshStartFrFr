<script lang="ts">
    import {
        downloadSettings,
        settings,
        uploadSettings,
        type Settings,
    } from "$lib/stores/settings";
    import Switch from "$lib/components/ui/switch/switch.svelte";
    import Card from "../ui/card/card.svelte";
    import { Download, Upload } from "lucide-svelte";
    import { fade, slide } from "svelte/transition";

    let mySettings: Settings = $state($settings);

    settings.subscribe((value) => {
        mySettings = value;
    });

    $effect(() => {
        settings.set(mySettings);
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
            <div class="space-y-4 p-6">
                <h1 class="text-2xl font-bold">Settings</h1>

                <!-- <div class="border rounded-xl p-4 shadow-sm"> -->
                <h2 class="text-lg font-semibold">Search Engines</h2>
                <ul class="mt-2 space-y-3 border-b">
                    <li class="flex items-center justify-between pb-2">
                        <span>Remember last selected search engine</span>
                        <Switch bind:checked={mySettings.persistSearchEngine} />
                    </li>
                    {#if mySettings.persistSearchEngine && mySettings.selectedEngine}
                        <li class="flex items-center justify-between pb-2">
                            <span
                                >Current last selected: {JSON.parse(
                                    mySettings.selectedEngine,
                                ).name}</span
                            >
                        </li>
                    {/if}
                </ul>

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
                    <!-- </div> -->
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
