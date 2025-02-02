<script lang="ts">
    import ThemeToggle from "$lib/components/alex/themeToggle.svelte";
    import SearchBar from "$lib/components/alex/searchBar.svelte";
    import Clock from "$lib/components/alex/clock.svelte";
    import { on } from "svelte/events";
    import { onMount } from "svelte";
    import SearchEngines from "$lib/components/alex/searchEngines.svelte";
    import Keybindings from "$lib/components/alex/keybindings.svelte";
    import { keybindings } from "$lib";
    import { searchEngines, selectedEngine } from "$lib/stores/searchEngine.js";

    let search_bar: HTMLInputElement | null = null;
    let search_engines: HTMLDivElement | null = null;

    let focusSearchBarKeys = keybindings.find((group) => group.focus !== "Search Bar")?.bindings.find((binding) => binding.description === "Focus the search bar")?.keys;

    function HandleKeys_SearchEngineNav(event: KeyboardEvent) {
        //if control/command is not pressed
        if (!(event.ctrlKey || event.metaKey) && document.activeElement !== search_bar)
        {    
            if (event.key === "h" || event.key === "l") {
                event.preventDefault(); // Prevent unwanted scrolling or other effects

                let currentIndex = searchEngines.findIndex(engine => engine.name === $selectedEngine.name);
                if (currentIndex === -1) return;

                let newIndex = event.key === "h" 
                    ? Math.max(0, currentIndex - 1)  // Move left (previous item)
                    : Math.min(searchEngines.length - 1, currentIndex + 1);  // Move right (next item)

                selectedEngine.set(searchEngines[newIndex]);
            }
        }
    }

    function HandleKeys_SearchBarFocus(event: KeyboardEvent) {
        if (focusSearchBarKeys?.includes(event.key) && document.activeElement !== search_bar) {
            event.preventDefault();
            search_bar?.focus();
        }

        if (event.key === "Escape") {
            search_bar?.blur();
        }
    }

    onMount(() => {
        document.addEventListener("keydown", HandleKeys_SearchEngineNav);
        document.addEventListener("keydown", HandleKeys_SearchBarFocus);
        search_bar?.focus();
    });
</script>

<ThemeToggle class="fixed top-4 right-4" />

<div class="flex flex-col items-center justify-center h-screen p-4">
    <!-- <h1 class="text-4xl font-bold">Hello, world!</h1> -->
    <Clock />
    <SearchBar class="max-w-md m-4" bind:ref={search_bar} />
    <SearchEngines bind:ref={search_engines} />
</div>

<Keybindings class="fixed bottom-4 right-4" />