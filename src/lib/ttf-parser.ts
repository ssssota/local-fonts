import { browser } from '$app/environment';
import init, { fontsInCollection, parse as parseFont } from 'ttf-parser-wasm';

const initPromise = (async () => {
  if (!browser) return new Promise(() => undefined);
  const res = await fetch('/ttf-parser.wasm');
  const buf = await res.arrayBuffer();
  return await init(buf);
})();

type FontNames = Exclude<keyof ReturnType<typeof parseFont>, 'free'>;
const keys = [
  'family',
  'subfamily',
  'fullName',
  'postscriptName',
  'copyrightNotice',
  'description',
  'designer',
  'designerUrl',
  'license',
  'licenseUrl',
  'manufacturer',
  'sampleText',
  'trademark',
] as const satisfies readonly FontNames[];

const getU8ArrFromFont = async (font: FontData) => {
  const blob = await font.blob();
  const arrayBuffer = await blob.arrayBuffer();
  return new Uint8Array(arrayBuffer);
};

export const parse = async (font: FontData) => {
  await initPromise;
  const data = await getU8ArrFromFont(font);
  const fontsInData = fontsInCollection(data) ?? 1;
  const fonts = Array.from({ length: fontsInData }, (_, i) => {
    return parseFont(data, i);
  });
  try {
    const target =
      fonts.find(
        (f) =>
          f.postscriptName === font.postscriptName ||
          f.fullName === font.fullName ||
          f.subfamily === font.style
      ) ?? fonts[0];
    const ret = Object.fromEntries(keys.map((key) => [key, target[key]]));
    return ret;
  } finally {
    fonts.forEach((f) => f.free());
  }
};
