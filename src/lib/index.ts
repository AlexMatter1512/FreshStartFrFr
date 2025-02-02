import type { List } from "lucide-svelte"

// place files you want to import through the `$lib` alias in this folder.
export type keybindingsT = {
    focus: string,
    bindings: {
        keys: string[],
        description: string,
    }[]
}

export const keybindings: keybindingsT[] = [
    {
        focus: "Search Engine Selector",
        bindings: [
            {
                keys: ["/", " ", "Enter"],
                description: "Focus the search bar",
            },
            {
                keys: ["t"],
                description: "Toggle theme",
            }
        ],
    },
    {
        focus: "Search Bar",
        bindings: [
            {
                keys: ["Enter"],
                description: "Search using the selected search engine",
            },
            {
                keys: ["Escape"],
                description: "Focus the search engine selector",
            },
        ],
    },
    {
        focus: "Global",
        bindings: [
            {
                keys: ["h", "ArrowLeft"],
                description: "Navigate to the previous search engine",
            },
            {
                keys: ["l", "ArrowRight"],
                description: "Navigate to the next search engine",
            },
        ],
    },
]