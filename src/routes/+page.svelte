<script lang="ts">
  import FontDetail from '$lib/components/FontDetail.svelte';
  import FontPreview from '$lib/components/FontPreview.svelte';
  import Header from '$lib/components/Header.svelte';
  import { theme } from '$lib/theme';
  import { onMount } from 'svelte';

  let fontsPromise: Promise<FontData[]> = new Promise(() => {});
  let displayText = 'Local fonts';
  let searchText = '';

  onMount(() => {
    if (typeof self.queryLocalFonts !== 'function') {
      fontsPromise = Promise.reject(
        'Unsupported browser. Use Google Chrome or Microsoft Edge'
      );
      return;
    }
    fontsPromise = self.queryLocalFonts();
  });

  let timeoutId: ReturnType<typeof setTimeout>;
  let filterFn: (fd: FontData) => boolean = () => true;
  $: {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      const searchRegex = new RegExp(searchText, 'i');
      filterFn = ({ fullName }) => searchRegex.test(fullName);
    }, 200);
  }

  let dialog: HTMLDialogElement;
  let target: FontData | undefined;
  const openFontDetail = (font: FontData) => () => {
    target = font;
    dialog.showModal();
  };
  const onKeydown = (ev: KeyboardEvent) => {
    if (ev.key === 'escape' && dialog.open) dialog.close();
  };
</script>

<svelte:window on:keydown={onKeydown} />

<div class="header">
  <Header
    bind:displayText
    bind:searchText
    on:switch-theme={theme.toggle}
    theme={$theme}
  />
</div>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
  bind:this={dialog}
  on:click={(ev) => {
    const rect = ev.currentTarget.getBoundingClientRect();
    const isInDialog =
      rect.top <= ev.clientY &&
      ev.clientY <= rect.top + rect.height &&
      rect.left <= ev.clientX &&
      ev.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      ev.currentTarget.close();
    }
  }}
>
  {#if target !== undefined}
    <header>{target.fullName}</header>
    <FontDetail font={target} />
  {/if}
</dialog>

{#await fontsPromise}
  Loading...
{:then fonts}
  <main>
    {#each fonts.filter(filterFn) as font (font.fullName)}
      <FontPreview {font} {displayText} on:click={openFontDetail(font)} />
    {/each}
  </main>
{:catch err}
  {err}
{/await}

<style>
  .header {
    position: sticky;
    top: 0;
    background-color: var(--background-body);
  }
  dialog {
    max-width: 40rem;
  }
</style>
