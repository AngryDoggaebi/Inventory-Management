import { getSpecificDateDataHandler } from '@/utill/api/get';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const PostTodayBtn = () => {
  const [todayItem, setTodayItem] = useState();
  const formattedToday = useSelector(state => state.formattedTodaySlice);

  useEffect(() => {
    getSpecificDateDataHandler(formattedToday, setTodayItem);
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
