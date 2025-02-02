<script lang="ts">
    import * as HoverCard from "$lib/components/ui/hover-card/index.js";
    import { keybindings, type keybindingsT } from "$lib";
    import { cn } from "$lib/utils";

    // export let className: string = "";
    let { class: className } = $props();

    const aliases: { [key: string]: string } = {
        " ": "Space",
        "ArrowDown": "↓",
        "ArrowLeft": "←",
        "ArrowRight": "→",
        "ArrowUp": "↑",
        "Backspace": "⌫",
        "Control": "Ctrl",
        "Enter": "↵",
        "Escape": "Esc",
        "Meta": "⌘",
        "Shift": "⇧",
        "Tab": "⇥",
    };
</script>

<div class={cn("relative", className)}>
    <HoverCard.Root>
        <HoverCard.Trigger class="text-4xl">⌘</HoverCard.Trigger>
        <HoverCard.Content
            class="p-4 m-4 max-w-sm w-auto rounded-lg shadow-lg bg-background"
        >
            <h2 class="text-lg font-semibold">Keybindings</h2>
            {#each keybindings as group (group.focus)}
                <div class="mt-3">
                    <h3
                        class="text-md font-medium border-b border-foreground pb-1"
                    >
                        {group.focus}
                    </h3>
                    <ul class="mt-2 space-y-1">
                        {#each group.bindings as binding (binding.description)}
                            <li class="flex items-center gap-2 text-sm">
                                {#each binding.keys as keyComb}
                                    <!-- content here -->
                                    <span
                                        class="inline-block px-2 py-1 rounded bg-zinc-700 font-mono font-semibold"
                                        >
                                        {keyComb.split(" & ").map((key) => aliases[key] || key).join("+")}
                                        </span
                                    >
                                {/each}
                                <div>- {binding.description}</div>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/each}
        </HoverCard.Content>
    </HoverCard.Root>
</div>
