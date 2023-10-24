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
            <td rowSpan={3}>안전봉투</td>
            <td>2호</td>
          </tr>
          <tr className="table-color-b">
            <td>3호</td>
          </tr>
          <tr className="table-color-b">
            <td>4호</td>
          </tr>
          <tr className="table-color-a">
            <td rowSpan={3}>박스</td>
            <td>골판지</td>
          </tr>
          <tr className="table-color-a">
            <td>택4</td>
          </tr>
          <tr className="table-color-a">
            <td>중</td>
          </tr>
          <tr className="table-color-b">
            <td rowSpan={3}>OPP 테이프</td>
            <td>4.5cm</td>
          </tr>
          <tr className="table-color-b">
            <td>1.2cm</td>
          </tr>
          <tr className="table-color-b">
            <td>K</td>
          </tr>
          <tr className="table-color-a">
            <td colSpan={2}>포장지</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default DailyFixtureName;
