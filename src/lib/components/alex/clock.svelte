<script lang="ts">
	import NumberFlow, { NumberFlowGroup } from "@number-flow/svelte";
	import { fade, fly, scale, slide } from "svelte/transition";
	import { settings } from "$lib/stores/settings";

	let showDate = $state(false);

	// svelte-ignore non_reactive_update
	let date = new Date();
	let hh = $state(date.getHours());
	let mm = $state(date.getMinutes());
	let ss = $state(date.getSeconds());

	setInterval(() => {
		date = new Date();
		hh = date.getHours();
		mm = date.getMinutes();
		ss = date.getSeconds();
	}, 1000);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onmouseenter={() => (showDate = true)}
	onmouseleave={() => (showDate = false)}
>
	<NumberFlowGroup>
		<div
			style="font-variant-numeric: tabular-nums; "
			class="flex items-baseline font-semibold text-6xl"
		>
			<NumberFlow
				trend={1}
				value={hh}
				format={{ minimumIntegerDigits: 2 }}
			/>
			<NumberFlow
				prefix=":"
				trend={1}
				value={mm}
				digits={{ 1: { max: 5 } }}
				format={{ minimumIntegerDigits: 2 }}
			/>
			{#if $settings.showSeconds}
				<NumberFlow
					prefix=":"
					trend={1}
					value={ss}
					digits={{ 1: { max: 5 } }}
					format={{ minimumIntegerDigits: 2 }}
					class="text-lg"
				/>
			{/if}
		</div>
	</NumberFlowGroup>
	
	{#if $settings.showDateOnHover}
		{#if showDate}
			<div transition:slide={{ duration: 100 }} class="flex items-center justify-center mb-4">
				<p
					class="text-sm text-muted-foreground"
					transition:fade={{ delay: 80, duration: 80 }}
				>
					{date.toLocaleDateString('en-GB', {
						year: "numeric",
						month: "2-digit",
						day: "2-digit",
					})}
				</p>
			</div>
		{/if}
	{/if}
</div>
