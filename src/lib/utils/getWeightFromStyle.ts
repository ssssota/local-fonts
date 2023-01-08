const getWeightFromStyleWord = (style: string): number | undefined => {
  switch (style.replace(/-/g, '').toLowerCase()) {
    case 'thin':
    case 'hairline':
      return 100;
    case 'extralight':
    case 'ultralight':
      return 200;
    case 'light':
      return 300;
    case 'semilight':
      return 350;
    case 'normal':
    case 'regular':
      return 400;
    case 'medium':
      return 500;
    case 'semibold':
    case 'demibold':
      return 600;
    case 'bold':
      return 700;
    case 'extrabold':
    case 'ultrabold':
      return 800;
    case 'black':
    case 'heavy':
      return 900;
    case 'extrablack':
    case 'ultrablack':
      return 950;
  }
};

export const getWeightFromStyle = (style: string): number | undefined => {
  return style
    .split(/\s+/g)
    .flatMap((styleWord) => {
      const weight = getWeightFromStyleWord(styleWord);
      return weight ? [weight] : [];
    })
    .at(0);
};
