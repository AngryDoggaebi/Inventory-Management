'use client';

import { atom, selector } from 'recoil';

/** 선택한 날짜
 * YYYY-MM-DD
 * @type {string}
 */
export const SelectedDateAtom = atom({
  key: 'SelectedDateAtom',
  default: `${new Date().getFullYear()}-${
    new Date().getMonth() + 1
  }-${new Date().getDate()}`,
});

/** 오늘 날짜
 * Fri Oct 20 2023 01:00:14 GMT+0900 (한국 표준시)
 */
export const TodayAtom = atom({
  key: 'TodayAtom',
  default: new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' }),
  ),
});

/**
 * format한 오늘 날짜
 * @returns YYYY-MM-DD
 */
export const formattedTodaySelector = selector({
  key: 'formattedTodaySelector',
  get: ({ get }) => {
    get(TodayAtom);
    const today = new Date();
    const formattedToday = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    return formattedToday;
  },
});

/**
 * format한 어제 날짜
 * @returns YYYY-MM-DD
 */
export const formattedYesterdaySelector = selector({
  key: 'formattedYesterdaySelector',
  get: ({ get }) => {
    const today = get(TodayAtom);
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    const formattedyesterday = `${yesterday.getFullYear()}-${
      yesterday.getMonth() + 1
    }-${yesterday.getDate()}`;

    return formattedyesterday;
  },
});
