"use client";
import { formattedDate } from "../utill/currentdate";
import { atom, selector } from "recoil";

/** 선택한 날짜
 * YYYY-MM-DD
 * string
 */
export const SelectedDateAtom = atom({
  key: "SelectedDateAtom",
  default: formattedDate,
});
