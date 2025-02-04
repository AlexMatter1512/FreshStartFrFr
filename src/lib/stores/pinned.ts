import { writable, get, type Writable } from "svelte/store";
import { browser } from "$app/environment";
import { settings } from "$lib/stores/settings";

export let pinnedLocalName = "pinned";
export interface Pinned {
    name: string;
    url: string;
    icon: string;
}

export let pinnedStore: Writable<Pinned[]> = writable([]);

export function isPinned(url: string) {
    return get(pinnedStore).some((pinned) => pinned.url === url);
}

export function addPinned(pinned: Pinned) {
    pinnedStore.update((pinnedList) => {
        pinnedList.push(pinned);
        return pinnedList;
    });
}

export function removePinned(url: string) {
    pinnedStore.update((pinnedList) => {
        return pinnedList.filter((pinned) => pinned.url !== url);
    });
}

export function togglePinned(pinned: Pinned) {
    if (isPinned(pinned.url)) {
        removePinned(pinned.url);
    } else {
        addPinned(pinned);
    }
}

if (browser) {
    // load pinned from local storage
    const pinnedValue = localStorage.getItem(pinnedLocalName) || "[]";
    if (pinnedValue) {
        const parsedPinned: Pinned[] = JSON.parse(pinnedValue);
        pinnedStore.set(parsedPinned);
    }
    pinnedStore.subscribe((value) => {
        localStorage.setItem(pinnedLocalName, JSON.stringify(value));
    }); 
}