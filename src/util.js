import { useState } from 'react';
import equal from 'fast-deep-equal';

export const OUTLINED = 'outlined';
export const ROUND = 'round';
export const SHARP = 'sharp';
export const DEFAULT = '';
export const TWO_TONE = 'twotone';

export const mdIcon = (category, name, style) =>
  `/assets/svg/md/${category}/${name}/materialicons${style}/24px.svg`;

export function useStateDeepEqual(initState) {
  const [value, setValue] = useState(initState);
  return [value, next => setValue(prev => (equal(prev, next) ? prev : next))];
}
