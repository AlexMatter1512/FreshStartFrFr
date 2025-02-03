import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";

export class Settings {
    persistSearchEngine: boolean = false;
    selectedEngine: string = '';
    showClock: boolean = false;
    showSeconds: boolean = false;
    [key: string]: string | number | boolean | undefined;

    constructor(data?: Partial<Settings>) {
        if (data) {
            Object.assign(this, data);
        }
    }
}

export const settings: Writable<Settings> = writable(new Settings());

if (browser) {
    const settingsValue = localStorage.getItem("settings");
    if (settingsValue) {
        const parsedSettings = JSON.parse(settingsValue);
        settings.set(new Settings(parsedSettings));
    }

    settings.subscribe((value) => {
        localStorage.setItem("settings", JSON.stringify(value));
    });
}

export function downloadSettings() {
    const settingsValue = localStorage.getItem("settings") || "{}";
    const blob = new Blob([settingsValue], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "settings.json";
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
            const settingsValue = reader.result as string;
            settings.set(JSON.parse(settingsValue));
            // reload the page to apply the new settings
            location.reload();
        };
        reader.readAsText(file);
    };
    input.click();
}
