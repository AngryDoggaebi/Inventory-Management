import Link from 'next/link';

export const PostTodayBtn = ({ todayItem }) => {
  return (
    <div style={todayItem === null ? null : { display: 'none' }}>
      <div>아직 오늘 재고가 없어요!</div>
      <Link href={'/inventory'}>
        <button>오늘 재고 입력하기</button>
      </Link>
    </div>
  );
};

export default PostTodayBtn;
