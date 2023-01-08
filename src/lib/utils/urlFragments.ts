// https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
const re =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
export const urlFragments = (
  text: string
): ({ type: 'text'; text: string } | { type: 'link'; url: string })[] => {
  let clone = text;
  const urls = text.match(re) ?? [];
  const notUrls: string[] = [];
  for (const url of urls) {
    const index = clone.indexOf(url);
    notUrls.push(clone.slice(0, index));
    clone = clone.slice(index + url.length);
  }
  notUrls.push(clone);

  return Array.from({ length: 2 * (urls?.length ?? 0) + 1 }, (_, i) => {
    const index = Math.floor(i / 2);
    return i % 2 === 0
      ? ({ type: 'text', text: notUrls[index] } as const)
      : ({ type: 'link', url: urls[index] } as const);
  }).filter((frag) => !(frag.type === 'text' && !frag.text));
};
