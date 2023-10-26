'use client';

import { atom } from 'recoil';

/**
 * @deprecated recoil 사용 x
 */

/** data 리로딩 여부 결정 */
export const IsClickedAtom = atom({
  key: 'IsClickedAtom',
  default: 0,
});
