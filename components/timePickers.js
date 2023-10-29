import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { setSelectedDate } from '@/redux/date';
import { useDispatch } from 'react-redux';

const TimePickers = () => {
  const [value, setValue] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    // 첫 로딩시 오늘 날짜 선택 상태로 설정
    setValue(dayjs(new Date()));
  }, []);

  useEffect(() => {
    // 선택값이 바뀔때마다 recoil 날짜 값 변경
    const y = value && value.$y;
    const m = value && value.$M + 1;
    const d = value && value.$D;
    y && m && d && dispatch(setSelectedDate({ y, m, d }));
  }, [value]);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      dateFormats={{ monthShort: 'M' }} // 월을 영문이 아닌 숫자로 표시
    >
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          className="datepicker"
          label="YYYY/MM/DD"
          format="YYYY-MM-DD"
          value={value || ''}
          onChange={newValue => setValue(newValue)}
          defaultValue={dayjs(new Date())} // 현재 날짜 이후 막기
          disableFuture // 현재 날짜 이후 막기
          shouldDisableDate={day => {
            return dayjs(dayjs(day).format('YYYY-MM-DD')).isBefore(
              '2023-10-03',
            );
          }} // 특정 날짜 이전 막기 (이후의 경우 .isAfter)
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default TimePickers;
