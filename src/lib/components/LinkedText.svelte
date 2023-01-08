<script lang="ts" context="module">
</script>

<script lang="ts">
  import { urlFragments } from '$lib/utils';

  export let text: string;
</script>

{#each urlFragments(text) as fragment}
  {#if fragment.type === 'text'}
    {fragment.text}
  {:else}
    <a href={fragment.url} rel="noreferrer" target="_blank">{fragment.url}</a>
  {/if}
{/each}
