<script lang="ts">
  import { theme } from '$lib/theme';
  let stylesheet = '';
  $: stylesheet =
    $theme === 'light'
      ? 'https://cdn.jsdelivr.net/npm/water.css@2/out/light.css'
      : 'https://cdn.jsdelivr.net/npm/water.css@2/out/dark.css';
</script>

<svelte:head>
  <link rel="stylesheet" href={stylesheet} />

  <title>Local fonts</title>
  <meta name="description" content="Display installed fonts." />
</svelte:head>

<slot />
