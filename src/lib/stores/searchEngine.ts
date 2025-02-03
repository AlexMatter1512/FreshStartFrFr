import { writable, get, type Writable } from "svelte/store";
import { browser } from "$app/environment";
import { settings } from "$lib/stores/settings";

export let searchEnginesLocalName = "searchEngines";
export interface SearchEngine {
    name: string;
    url: string;
    icon: string;
    enabled: boolean;
}
const defaultSearchEngines: SearchEngine[] = [
    {
        name: "Google",
        url: "https://www.google.com/search?q=",
        icon: "🔍",
        enabled: true,
    },
    {
        name: "YouTube",
        url: "https://www.youtube.com/results?search_query=",
        icon: "🎥",
        enabled: true,
    },
    {
        name: "ChatGPT",
        url: "https://chat.openai.com/?model=gpt-4&q=",
        icon: "💬",
        enabled: true,
    },
    {
        name: "Amazon",
        url: "https://www.amazon.com/s?k=",
        icon: "🛒",
        enabled: true,
    },
    {
        name: "DuckDuckGo",
        url: "https://duckduckgo.com/?q=",
        icon: "🦆",
        enabled: true,
    },
    {
        name: "GitHub",
        url: "https://github.com/search?q=",
        icon: "🐙",
        enabled: true,
    },
];

export let searchEnginesStore: Writable<SearchEngine[]> = writable();
export let selectedEngine = writable(defaultSearchEngines[0]);

// to persist all search engines in local storage
if (browser) {
    // if engines are already in local storage, add them to the store with the default search engines
    const searchEnginesValue = localStorage.getItem(searchEnginesLocalName) || "[]";
    if (searchEnginesValue) {
        const parsedEngines: SearchEngine[] = JSON.parse(searchEnginesValue);
        const mergedEngines = [...defaultSearchEngines];
        parsedEngines.forEach((engine: SearchEngine) => {
            const existingIndex = mergedEngines.findIndex(e => e.name === engine.name);
            if (existingIndex !== -1) {
                mergedEngines[existingIndex] = engine;
            } else {
                mergedEngines.push(engine);
            }
        });
        searchEnginesStore.set(mergedEngines);
    }

    // set the search engines in local storage
    localStorage.setItem(searchEnginesLocalName, JSON.stringify(defaultSearchEngines));

    // update the search engines in local storage when the store changes
    searchEnginesStore.subscribe((value) => {
        localStorage.setItem(searchEnginesLocalName, JSON.stringify(value));
    });
}

// to persist the selected search engine in local storage
if (browser) {
    const selectedEngineValue = get(settings)?.selectedEngine;
    // console.log(selectedEngineValue);
    if (selectedEngineValue) {
        selectedEngine.set(selectedEngineValue);
    }
    selectedEngine.subscribe((value) => {
        // localStorage.setItem("selectedEngine", JSON.stringify(value));
        if (get(settings)?.persistSearchEngine) {

            settings.update((settings) => {
                return {
                    ...settings,
                    selectedEngine: value,
                };
            });
        }
    });
}