import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const PostTodayBtn = () => {
  const [todayItem, setTodayItem] = useState();
  const formattedToday = useSelector(state => state.formattedTodaySlice);

  useEffect(() => {
    const a = async () => {
      await axios
        .get(`/api/dailyapi/specificDateChecker?date=${formattedToday}`)
        .then(data => {
          console.log(data);
          setTodayItem(data.data);
        });
    };
    a();
  }, []);
  return (
    <div
      className="post-today-menu"
      style={todayItem === null ? null : { display: 'none' }}
    >
      <div>아직 오늘 데이터가 없어요!</div>
      <Link href={'/inventory'}>
        <button className="moveto-inventory-post-button">
          오늘 재고 입력하기
        </button>
      </Link>
    </div>
  );
};

export default PostTodayBtn;
