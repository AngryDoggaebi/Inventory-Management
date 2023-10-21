import Link from 'next/link';

const index = () => {
  return (
    <div>
      <div>재고관리, 인수인계 어플리케이션</div>
      <Link href={'/inventory'}>
        <button>바로가기</button>
      </Link>
    </div>
  );
};

export default index;
