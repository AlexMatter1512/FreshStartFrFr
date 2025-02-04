<script lang="ts">
    import { Switch } from "$lib/components/ui/switch";

    let {
        title,
        description = "",
        setting = $bindable(),
    } = $props();
</script>

<li class="flex items-center justify-between pb-2">
    <div>
        <span>{title}</span>
        {#if description !== ""}
             <p class="text-sm text-muted-foreground">{description}</p>
        {/if}
    </div>
    <Switch bind:checked={setting} />
</li>