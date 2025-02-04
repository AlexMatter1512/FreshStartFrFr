<script lang="ts">
    import { slide } from "svelte/transition";
    import ThemeToggle from "$lib/components/alex/themeToggle.svelte";
    import SearchBar from "$lib/components/alex/searchBar.svelte";
    import Clock from "$lib/components/alex/clock.svelte";
    import { toggleMode } from "mode-watcher";
    import { onMount } from "svelte";
    import SearchEngines from "$lib/components/alex/searchEngines.svelte";
    import Keybindings from "$lib/components/alex/keybindings.svelte";
    import { keybindings } from "$lib";
    import { searchEnginesStore, selectedEngine } from "$lib/stores/searchEngine.js";
    import {
        downloadSettings,
        settings,
        uploadSettings,
    } from "$lib/stores/settings";
    import Settings from "$lib/components/alex/settings.svelte";
    import ChevronRight from "lucide-svelte/icons/chevron-right";
    import { Button } from "$lib/components/ui/button/index.js";
    import { ChevronLeft } from "lucide-svelte";
    import Pinned from "$lib/components/alex/pinned.svelte";
    import RightSideBar from "$lib/components/rightSideBar.svelte";

    let isUrl = $state(false);
    let showSettings = $state(false);
    let fixSettingsButton = $state(false);
    // svelte-ignore non_reactive_update
    let search_bar: HTMLInputElement | null = null;
    let searchBarValue = $state("");
    // svelte-ignore non_reactive_update
    let search_engines: HTMLDivElement | null = null;

    let focusSearchBarKeys = keybindings
        .find((group) => group.focus !== "Search Bar")
        ?.bindings.find(
            (binding) => binding.description === "Focus the search bar",
        )?.keys;

    function HandleKeys_SearchEngineNav(event: KeyboardEvent) {
        //if control/command is not pressed
        if (
            !(event.ctrlKey || event.metaKey) &&
            document.activeElement !== search_bar
        ) {
            if (event.key === "h" || event.key === "l") {
                event.preventDefault(); // Prevent unwanted scrolling or other effects

                let currentIndex = $searchEnginesStore.findIndex(
                    (engine) => engine.name === $selectedEngine.name,
                );
                if (currentIndex === -1) return;

                let newIndex =
                    event.key === "h"
                        ? Math.max(0, currentIndex - 1) // Move left (previous item)
                        : Math.min($searchEnginesStore.length - 1, currentIndex + 1); // Move right (next item)

                selectedEngine.set($searchEnginesStore[newIndex]);
            }
        }
    }

    function HandleKeys_SearchBarFocus(event: KeyboardEvent) {
        if (
            focusSearchBarKeys?.includes(event.key) &&
            document.activeElement !== search_bar
        ) {
            event.preventDefault();
            search_bar?.focus();
        }

        if (event.key === "Escape") {
            search_bar?.blur();
        }
    }

    function HandleKeys_ToggleTheme(event: KeyboardEvent) {
        if (event.key === "t" && document.activeElement !== search_bar) {
            toggleMode();
        }
    }

    function HandleKeys_ShowSettings(event: KeyboardEvent) {
        if (event.key === "s" && document.activeElement !== search_bar) {
            showSettings = !showSettings;
        }
    }

    onMount(() => {
        document.addEventListener("keydown", HandleKeys_SearchEngineNav);
        document.addEventListener("keydown", HandleKeys_SearchBarFocus);
        document.addEventListener("keydown", HandleKeys_ToggleTheme);
        document.addEventListener("keydown", HandleKeys_ShowSettings);
        search_bar?.focus();
    });
</script>

<!-- <ThemeToggle class="fixed top-4 right-4 z-50" /> -->

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="flex flex-row" ondragover={(e) => e.preventDefault()}>
    {#if showSettings}
        <div
            in:slide={{ duration: 100, axis: "x" }}
            out:slide={{ duration: 100, axis: "x", delay: 100 }}
            onoutroend={() => (fixSettingsButton = false)}
            onintrostart={() => (fixSettingsButton = true)}
            class=" h-screen w-1/3 p-4 pr-0"
        >
            <Settings />
        </div>
    {/if}
    <Button
        variant="outline"
        size="icon"
        class="m-4 {fixSettingsButton ? '' : 'fixed top-0 left-0'}"
        onclick={() => (showSettings = !showSettings)}
    >
        {#if showSettings}
            <ChevronLeft />
        {:else}
            <ChevronRight />
        {/if}
    </Button>
    <div
        class="flex flex-grow flex-col items-center justify-center h-screen p-4"
    >
        {#if $settings.showClock}
            <Clock />
        {/if}
        <SearchBar class="max-w-md" bind:ref={search_bar} bind:isUrl bind:value={searchBarValue} />
        <SearchEngines bind:ref={search_engines} bind:hidden={isUrl} />
    </div>
    <!-- <div class="fixed right-0 h-screen">
        <Pinned/>
    </div> -->
</div>

<div class="fixed right-0 top-0 h-screen p-4">
    <RightSideBar bind:searchValue={searchBarValue} />
</div>

<!-- <Keybindings class="fixed bottom-4 right-4" /> -->
