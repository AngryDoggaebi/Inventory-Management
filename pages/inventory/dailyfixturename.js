const DailyFixtureName = () => {
  return (
    <>
      <table className="fixturenameTable">
        <tbody>
          <tr className="table-color-a">
            <td colSpan={2}>날짜</td>
          </tr>
          <tr className="table-color-a">
            <td colSpan={2}>작성자</td>
          </tr>
          <tr className="table-color-b">
            <td rowSpan={3}>봉투 묶음</td>
            <td>1호</td>
          </tr>
          <tr className="table-color-b">
            <td>2호</td>
          </tr>
          <tr className="table-color-b">
            <td>3호</td>
          </tr>
          <tr className="table-color-a">
            <td rowSpan={3}>볼펜 세트</td>
            <td>A</td>
          </tr>
          <tr className="table-color-a">
            <td>B</td>
          </tr>
          <tr className="table-color-a">
            <td>C</td>
          </tr>
          <tr className="table-color-b">
            <td rowSpan={3}>테이프</td>
            <td>1cm</td>
          </tr>
          <tr className="table-color-b">
            <td>2cm</td>
          </tr>
          <tr className="table-color-b">
            <td>무늬테이프</td>
          </tr>
          <tr className="table-color-a">
            <td colSpan={2}>종이</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default DailyFixtureName;
