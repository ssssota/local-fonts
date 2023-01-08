export const getItalicOrOblique = (
  style: string
): 'italic' | 'oblique' | undefined => {
  return style
    .split(/\s+/g)
    .flatMap((styleWord) => {
      const normalized = styleWord.toLowerCase();
      if (normalized !== 'italic' && normalized !== 'oblique') return [];
      return [normalized] as const;
    })
    .at(0);
};
