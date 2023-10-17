"use client";
import { formattedDate } from "../utill/currentdate";
import { atom, selector } from "recoil";

/** 선택한 날짜 */
export const SelectedDateAtom = atom({
  key: "SelectedDateAtom",
  default: formattedDate,
});

export const getDailySelector = selector({
  key: "getDailySelector",
  get: async () => {
    const selectedDate = get(SelectedDateAtom);
    const res = await axios.get(`/api/dailyapi/daily`, {
      params: {
        selectedDate: selectedDate,
      },
    });

    return res.data;
  },
});
