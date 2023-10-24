import Link from 'next/link';

const index = () => {
  return (
    <main>
      <div className="home">
        <h1 className="home-title">재고관리, 인수인계 어플리케이션</h1>
        <Link href={'/inventory'}>
          <button className="home-button">바로가기</button>
        </Link>
        <span>* 달력을 통해 이전 데이터를 조회할 수 있습니다</span>
        <span>* 데이터 삭제는 당일 데이터에 한해 가능합니다</span>
      </div>
    </main>
  );
};

export default index;
