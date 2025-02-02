<script>
    import { onMount } from 'svelte';
    let query = '';
    let suggestions = [];
    let showSuggestions = false;

    async function fetchSuggestions() {
        if (!query.trim()) {
            suggestions = [];
            showSuggestions = false;
            return;
        }
        try {
            const response = await fetch(`https://suggestqueries.google.com/complete/search?client=chrome&q=${encodeURIComponent(query)}`);
            const data = await response.json();
            console.log(data);
            suggestions = data[1];
            showSuggestions = suggestions.length > 0;
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    }

    function selectSuggestion(suggestion) {
        query = suggestion;
        showSuggestions = false;
    }
</script>

<style>
    .suggestions {
        border: 1px solid #ccc;
        background: white;
        position: absolute;
        max-width: 300px;
    }
    .suggestion {
        padding: 8px;
        cursor: pointer;
    }
    .suggestion:hover {
        background: #f0f0f0;
    }
</style>

<input type="text" bind:value={query} on:input={fetchSuggestions} placeholder="Search..." />

{#if showSuggestions}
    <div class="suggestions">
        {#each suggestions as suggestion}
            <div class="suggestion" on:click={() => selectSuggestion(suggestion)}>{suggestion}</div>
        {/each}
    </div>
{/if}
