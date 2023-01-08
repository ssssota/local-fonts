import { expect, it } from 'vitest';
import { upperFirst } from './upperFirst';

it('upperFirst', () => {
  expect(upperFirst('test')).toBe('Test');
});
