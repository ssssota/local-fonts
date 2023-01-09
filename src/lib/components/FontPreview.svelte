<script lang="ts">
  import {
    getItalicOrOblique,
    getStretchFromStyle,
    getWeightFromStyle,
  } from '$lib/utils';
  import { createEventDispatcher } from 'svelte';
  export let font: FontData;
  export let displayText = '';

  const dispatch = createEventDispatcher<{
    click: never;
  }>();
  const onClick = () => dispatch('click');

  const getStyle = (fontData: FontData) => {
    const weight = getWeightFromStyle(fontData.style);
    const style = getItalicOrOblique(fontData.style);
    const stretch = getStretchFromStyle(fontData.style);
    return (
      '<' + // Svelte LSP bug?
      `style>
      @font-face {
        font-family: "${fontData.fullName}";
        src:
          local("${fontData.postscriptName}"),
          local("${fontData.fullName}"),
          local("${fontData.family}");
        ${weight ? `font-weight: ${weight};` : ''}
        ${style ? `font-style: ${style};` : ''}
        ${stretch ? `font-stretch: ${stretch * 100}%;` : ''}
      }
      </style>`
    );
  };
  const getInfoText = (fontData: FontData) =>
    `${fontData.family} / ${fontData.fullName} / ${fontData.postscriptName} / ${fontData.style}`;
</script>

{@html getStyle(font)}
<button on:click={onClick}>
  <p style="font-family: '{font.fullName}'">
    {displayText || getInfoText(font)}
  </p>
  <small>{font.fullName}</small>
</button>

<style>
  button {
    --button-base: transparent;
    --button-hover: rgba(0 0 0 / 0.1);
    display: block;
    text-align: start;
    width: 100%;
  }
  p {
    font-size: 1.5em;
    margin-block-end: 0.25em;
  }
</style>
