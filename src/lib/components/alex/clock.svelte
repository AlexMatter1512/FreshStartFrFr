<script lang="ts">
	import NumberFlow, { NumberFlowGroup } from '@number-flow/svelte'
    import { fade, fly, scale, slide } from 'svelte/transition';

    let showDate = $state(false)
    
    // svelte-ignore non_reactive_update
        let date = new Date();
    let hh = $state(date.getHours())
    let mm = $state(date.getMinutes())
    let ss = $state(date.getSeconds())

    setInterval(() => {
        date = new Date();
        hh = date.getHours();
        mm = date.getMinutes();
        ss = date.getSeconds();
    }, 1000);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div onmouseenter={() => showDate = true} onmouseleave={() => showDate = false}>
	<NumberFlowGroup>
		<div
			style="font-variant-numeric: tabular-nums; --number-flow-char-height: 0.85em"
			class="~text-3xl/4xl flex items-baseline font-semibold"
		>
			<NumberFlow trend={1} value={hh} format={{ minimumIntegerDigits: 2 }} class="text-5xl" />
			<NumberFlow
				prefix=":"
				trend={1}
				value={mm}
				digits={{ 1: { max: 5 } }}
				format={{ minimumIntegerDigits: 2 }}
				class="text-5xl"
			/>
			<NumberFlow
				prefix=":"
				trend={1}
				value={ss}
				digits={{ 1: { max: 5 } }}
				format={{ minimumIntegerDigits: 2 }}
			/>
		</div>
	</NumberFlowGroup>
</div>

{#if showDate}
<div transition:slide = {{duration : 100}}>
    <p class="text-sm text-zinc-600" transition:fade = {{delay : 80, duration : 80}}>
		{date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })}
	</p>
</div>
{/if}