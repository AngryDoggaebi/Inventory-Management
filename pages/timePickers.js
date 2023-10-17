"use client";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { SelectedDateAtom } from "@/recoil/date";

const TimePickers = () => {
  const [value, setValue] = useState();
  const setSelectedDate = useSetRecoilState(SelectedDateAtom);

  useEffect(() => {
    const y = value && value.$y;
    const m = value && value.$M + 1;
    const d = value && value.$D;
    setSelectedDate(y + "-" + m + "-" + d);
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="MM/DD/YYYY"
          value={value || ""}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default TimePickers;
