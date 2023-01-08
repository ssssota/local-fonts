import { expect, it } from 'vitest';
import { urlFragments } from './urlFragments';

it('not url', () => {
  expect(urlFragments('test')).toStrictEqual([{ type: 'text', text: 'test' }]);
});

it('url', () => {
  expect(urlFragments('https://google.com')).toStrictEqual([
    { type: 'link', url: 'https://google.com' },
  ]);
});

it('include url 1', () => {
  expect(urlFragments('a https://google.com b')).toStrictEqual([
    { type: 'text', text: 'a ' },
    { type: 'link', url: 'https://google.com' },
    { type: 'text', text: ' b' },
  ]);
});

it('include url 2', () => {
  expect(urlFragments('https://google.com a https://google.com')).toStrictEqual(
    [
      { type: 'link', url: 'https://google.com' },
      { type: 'text', text: ' a ' },
      { type: 'link', url: 'https://google.com' },
    ]
  );
});
