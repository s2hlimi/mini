import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// 리덕스 관련 Imports
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Header_home from "./Header_home";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

function List() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.list);

  // 리스트 아이템 만들기 : 윈도잉용으로 인덱싱하는 함수
  const makeItem = useCallback((data) => {
    const item = data.data[0];
    const rowLength = data.data[1];
    const columnIndex = data.columnIndex;
    const rowIndex = data.rowIndex;
    const style = data.style;

    const itemIndex = columnIndex + rowIndex * rowLength;

    return itemIndex < item.length ? (
      <GridBox style={style}>
        <Cards>
          <CardThumb
            onClick={() => navigate("/detail/" + item[itemIndex].post_id)}
            thumbImg={item[itemIndex].thumbnail_url}
          />
          <CardLabel>
            <div>
              <h3>{item[itemIndex].title}</h3>
              <p>{item[itemIndex].onair_year} ~</p>
            </div>
          </CardLabel>
        </Cards>
      </GridBox>
    ) : null;
  });

  // 스크롤 꼭대기로 가기 버튼
  const listRef = React.useRef();

  const scrollToTop = () => {
    listRef.current.scrollToItem({
      columnIndex: 0,
      rowIndex: 0,
    });

    console.log(listRef);
  };

  // 컴포넌트 리턴
  return (
    <>
      <Header_home />

      <Wrap>
        <ContentsArea>
          <AutoSizer>
            {({ height, width }) => (
              <Grid
                columnCount={Math.floor(width / 340)}
                columnWidth={340}
                height={height}
                rowCount={Math.ceil(posts.length / Math.floor(width / 340))}
                rowHeight={530}
                width={width + 80}
                itemData={[posts, Math.floor(width / 340)]}
                ref={listRef}
              >
                {makeItem}
              </Grid>
            )}
          </AutoSizer>
        </ContentsArea>
      </Wrap>
    </>
  );
}

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px;
  background: linear-gradient(to bottom, rgb(255, 217, 0), rgb(255, 255, 255));
`;
const ListingOption = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  font-size: 30px;
  /* background-color: #49b0ab; */
  width: 100%;
  box-sizing: border-box;
  padding: 10px 20px 0px 00px;
  button {
    cursor: pointer;
    max-width: 170px;
    margin: 0px 10px;
    padding: 14px 20px 12px 20px;
    outline: none;
    border: 3px solid #000;
    border-radius: 50px;
    box-shadow: 2px 5px 0px #000;
    font-size: 16px;
    text-align: center;
    font-family: "양진체";
  }
`;

const OrderByYear = styled.button`
  background-color: ${(props) =>
    props.list_order === "like" ? "#ffeeef" : "#fae209"};
`;

const ContentsArea = styled.div`
  width: 88vw;
  min-width: 380px;
  box-sizing: border-box;
  padding: 2vh 0px 0px 5vw;
  height: 63vh;
  margin: 0px;
  font-family: "양진체";
`;

const GridBox = styled.div`
  display: flex;
  justify-content: center;
`;

const Cards = styled.div`
  border: 3px solid #000;
  width: 280px;
  height: 450px;
  margin: 10px;
  box-sizing: border-box;
  border-radius: 25px;
  box-shadow: 3px 8px 0px #000;
  background-color: #fff;
`;
const CardLabel = styled.div`
  margin: 10px 10px;
  line-height: 200%;
  padding: 0px 20px;
  text-align: left;
  display: flex;
  justify-content: space-between;
  h3 {
    margin: 0px;
    font-weight: 500;
    font-size: 22px;
    letter-spacing: 2px;
  }
  p {
    margin-top: 2px;
    font-size: 16px;
  }
  span {
    display: flex;
    align-items: center;
    margin: 30px 0px;
    gap: 5px;
    font-size: 16px;
  }
`;

const CardThumb = styled.div`
  border: 3px solid #000;
  width: 240px;
  height: 320px;
  margin: 20px auto;
  box-sizing: border-box;
  border-radius: 25px;
  background: url(${(props) => props.thumbImg});
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

export default List;
