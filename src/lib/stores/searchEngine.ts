import { writable } from "svelte/store";
import { browser } from "$app/environment";

export const searchEngines = [
    {
        name: "Google",
        url: "https://www.google.com/search?q=",
        icon: "🔍",
    },
    {
        name: "ChatGPT",
        url: "https://chat.openai.com/?model=gpt-4&q=",
        icon: "💬",
    },
    {
        name: "Amazon",
        url: "https://www.amazon.com/s?k=",
        icon: "🛒",
    },
    {
        name: "DuckDuckGo",
        url: "https://duckduckgo.com/?q=",
        icon: "🦆",
    },
    {
        name: "GitHub",
        url: "https://github.com/search?q=",
        icon: "🐙",
    },
];

export let selectedEngine = writable(searchEngines[0]);

// to persist the selected search engine in local storage

// if (browser) {
//     const selectedEngineValue = localStorage.getItem("selectedEngine");
//     console.log(selectedEngineValue);
//     if (selectedEngineValue) {
//         selectedEngine.set(JSON.parse(selectedEngineValue));
//     }
//     selectedEngine.subscribe((value) => {
//         localStorage.setItem("selectedEngine", JSON.stringify(value));
//     });
// }