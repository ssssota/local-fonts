<script lang="ts">
  import { parse } from '$lib/ttf-parser';
  import { upperFirst } from '$lib/utils';
  import LinkedText from './LinkedText.svelte';

  export let font: FontData;

  let parsePromise = new Promise<Awaited<ReturnType<typeof parse>>>(() => {});
  $: parsePromise = parse(font);
</script>

{#await parsePromise}
  Loading...
{:then parsed}
  {#each Object.entries(parsed).filter(([, v]) => v !== undefined) as [key, value] (key)}
    <div class="info">
      <h4>{upperFirst(key)}:</h4>
      <LinkedText text={value ?? ''} />
    </div>
  {/each}
{:catch err}
  {err}
{/await}

<style>
  .info {
    margin: 0.75rem 0;
  }
  .info :is(h4, p) {
    display: inline;
  }
</style>
