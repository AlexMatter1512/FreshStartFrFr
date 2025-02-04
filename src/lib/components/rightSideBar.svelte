<script>
    import Keybindings from "./alex/keybindings.svelte";
    import Pinned from "./alex/pinned.svelte";
    import ThemeToggle from "./alex/themeToggle.svelte";

    let { searchValue = $bindable("") } = $props();
</script>

<div class="flex flex-col justify-between h-full w-full items-center">
    <ThemeToggle />
    <Pinned bind:searchValue />
    <Keybindings />
</div>
