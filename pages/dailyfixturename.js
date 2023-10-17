const DailyFixtureName = () => {
  return (
    <>
      <table className="fixturenameTable">
        <tbody>
          <tr>
            <td colSpan={2}>날짜</td>
          </tr>
          <tr>
            <td colSpan={2}>작성자</td>
          </tr>
          <tr>
            <td rowSpan={3}>안전봉투(박스단위)</td>
            <td>2호</td>
          </tr>
          <tr>
            <td>3호</td>
          </tr>
          <tr>
            <td>4호</td>
          </tr>
          <tr>
            <td rowSpan={3}>박스(묶음단위)</td>
            <td>골판지</td>
          </tr>
          <tr>
            <td>택4</td>
          </tr>
          <tr>
            <td>중</td>
          </tr>
          <tr>
            <td rowSpan={3}>OPP 테이프</td>
            <td>4.5cm</td>
          </tr>
          <tr>
            <td>1.2cm(4개1묶음)</td>
          </tr>
          <tr>
            <td>K</td>
          </tr>
          <tr>
            <td colSpan={2}>포장지(박스단위)</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default DailyFixtureName;
