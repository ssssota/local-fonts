<script lang="ts">
  import { PUBLIC_GITHUB_REPO_URL } from '$env/static/public';
  import { createEventDispatcher } from 'svelte';
  import GitHubIconDark from './icons/github-dark.svg';
  import GitHubIconLight from './icons/github-light.svg';
  import Moon from './icons/Moon.svelte';
  import Sun from './icons/Sun.svelte';
  export let displayText = '';
  export let searchText = '';
  export let theme: 'light' | 'dark' = 'light';
  const dispatch = createEventDispatcher<{
    'switch-theme': never;
  }>();
  const switchTheme = () => dispatch('switch-theme');
</script>

<header>
  <input
    title="Preview text"
    type="text"
    bind:value={displayText}
    placeholder="Local fonts"
  />
  <div class="spacer" />
  <input
    title="Font search"
    type="text"
    bind:value={searchText}
    placeholder="Arial, Noto, Roboto, ..."
  />
  <button on:click={switchTheme} aria-label="Switch theme">
    {#if theme === 'light'}
      <Moon />
    {:else}
      <Sun />
    {/if}
  </button>
  <a
    class="github"
    href={PUBLIC_GITHUB_REPO_URL}
    target="_blank"
    rel="noreferrer"
  >
    <img
      src={theme === 'light' ? GitHubIconLight : GitHubIconDark}
      alt="GitHub"
    />
  </a>
</header>

<style>
  header {
    display: flex;
    align-items: center;
  }
  .spacer {
    flex-grow: 1;
  }
  [aria-label='Switch theme'] {
    padding: 10px;
    display: flex;
    justify-content: center;
  }
  .github img {
    width: 2rem;
    height: 2rem;
  }
</style>
