<script lang="ts">
    import { pinnedStore, removePinned } from "$lib/stores/pinned";

    let draggedItem: number;
    let isDraggingOver = $state(false);
    $inspect(isDraggingOver);

    function handleDragStart(index: number) {
        draggedItem = index;
    }

    function handleDrop(targetIndex: number) {
        if (draggedItem === targetIndex) return;

        const items = [...$pinnedStore];
        const [removed] = items.splice(draggedItem, 1);
        items.splice(targetIndex, 0, removed);
        pinnedStore.set(items);
    }

    function handleDragEnd(url: string) {
        // Check if the item was dropped outside the valid drop zone
        if (!isDraggingOver) {
            removePinned(url);
        }
        // isDraggingOver = false;
    }

    $inspect($pinnedStore);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div 
    class="flex flex-col space-y-2 max-w-xs p-4 my-20 overflow-y-auto h-full justify-center items-center"
    ondragover={() => isDraggingOver = true}
    ondragleave={() => isDraggingOver = false}
>
    {#each $pinnedStore as pinned, i}
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <div
            class="p-2 rounded shadow-md bg-secondary cursor-pointer"
            draggable={true}
            ondragstart={() => handleDragStart(i)}
            ondragend={() => handleDragEnd(pinned.url)}
            ondrop={() => handleDrop(i)}
            ondragover={(e) => e.preventDefault()}
            onclick={() => window.location.href = pinned.url}
            title={pinned.url}
        >
            <img src={pinned.icon} alt="" class="w-4 h-4" draggable="false" />
        </div>
    {/each}
</div>
