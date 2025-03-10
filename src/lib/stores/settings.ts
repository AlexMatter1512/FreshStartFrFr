import { browser } from "$app/environment";
import { searchEnginesStore, searchEnginesLocalName, type SearchEngine } from "$lib/stores/searchEngine";
import { pinnedStore, pinnedLocalName, type Pinned } from "./pinned";
import { get, writable, type Writable } from "svelte/store";

export const settingsLocalName = "settings";
export class Settings {
    // engines
    showEngines: boolean = true;
    persistSearchEngine: boolean = false;
    selectedEngine: SearchEngine | undefined = undefined ;
    // clock
    showClock: boolean = true;
    showSeconds: boolean = true;
    showDateOnHover: boolean = true;
    // other
    [key: string]: string | number | boolean | SearchEngine | undefined;

    constructor(data?: Partial<Settings>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}

export const settings: Writable<Settings> = writable(new Settings());

if (browser) {
    const settingsValue = localStorage.getItem(settingsLocalName);
    if (settingsValue) {
        const parsedSettings = JSON.parse(settingsValue);
        settings.set(new Settings(parsedSettings));
    }

    settings.subscribe((value) => {
        localStorage.setItem(settingsLocalName, JSON.stringify(value));
    });
}

export function downloadSettings() {
    const settingsValue = localStorage.getItem(settingsLocalName) || "{}";
    const searchEnginesValue = localStorage.getItem(searchEnginesLocalName) || "[]";
    const pinnedValue = localStorage.getItem(pinnedLocalName) || "[]";

    const exportData = {
        settings: JSON.parse(settingsValue),
        searchEngines: JSON.parse(searchEnginesValue),
        pinned: JSON.parse(pinnedValue),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "browser_home_settings.json";
    a.click();
    URL.revokeObjectURL(url);
}

export function uploadSettings() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = async () => {
        if (!input.files) return;
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = async () => {
            try {
                const data = JSON.parse(reader.result as string);
                if (data.settings) {
                    settings.set(new Settings(data.settings));
                }
                if (data.searchEngines) {
                    searchEnginesStore.set(data.searchEngines);
                }
                if (data.pinned) {
                    pinnedStore.set(data.pinned);
                }
                // reload the page to apply the new settings
                location.reload();
            } catch (error) {
                console.error('Failed to parse settings file:', error);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}
