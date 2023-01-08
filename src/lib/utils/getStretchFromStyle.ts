const getStretchFromStyleWord = (style: string): number | undefined => {
  switch (style.replace(/-/g, '').toLowerCase()) {
    case 'ultra-condensed':
      return 0.5;
    case 'extra-condensed':
      return 0.625;
    case 'condensed':
      return 0.75;
    case 'semi-condensed':
      return 0.875;
    case 'normal':
      return 1;
    case 'semi-expanded':
      return 1.125;
    case 'expanded':
      return 1.25;
    case 'extra-expanded':
      return 1.5;
    case 'ultra-expanded':
      return 2;
  }
};

export const getStretchFromStyle = (style: string): number | undefined => {
  return style
    .split(/\s+/g)
    .flatMap((styleWord) => {
      const stretch = getStretchFromStyleWord(styleWord);
      return stretch ? [stretch] : [];
    })
    .at(0);
};
