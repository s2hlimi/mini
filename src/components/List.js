import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

// 리덕스 관련 Imports
import { useDispatch, useSelector } from "react-redux";
import { load_posts_AX } from "../redux/modules/posts";

import "./style.css";
import styled from "styled-components";
import Header_home from "./Header_home";

function List() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  // // 리덕스에서 포스트 리스트를 로딩
  React.useEffect(() => {
    dispatch(load_posts_AX());
  }, []);

  // 리스트 아이템 만들기 : 윈도잉용으로 인덱싱하는 함수
  const makeItem = useCallback((data) => {
    const item = data.data[0];
    const rowLength = data.data[1];
    const columnIndex = data.columnIndex;
    const rowIndex = data.rowIndex;
    const style = data.style;

    const itemIndex = columnIndex + rowIndex * rowLength;
    console.log(item);

    return itemIndex < item.length ? (
      <>
        <Wrap>
          <Container>
            <Row>
              <Col lg={4}>
                <div className="cards">
                  <div
                    className="card"
                    onClick={() =>
                      navigate("/detail/" + item[itemIndex].post_id)
                    }
                  >
                    <img
                      src={item[itemIndex].imageUrl}
                      className="card__image"
                      alt=""
                    />
                    <div className="card__overlay">
                      <div className="card__header">
                        <svg
                          className="card__arc"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path />
                        </svg>
                        <div className="card__header-text">
                          <h2 className="card__title">
                            💛{item[itemIndex].placeTitle}
                          </h2>
                          <span className="card__status">
                            🟡{item[itemIndex].title}
                          </span>
                        </div>
                      </div>
                      <h3 className="card__description">
                        {item[itemIndex].content}
                      </h3>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </Wrap>
      </>
    ) : null;
  });

  // 컴포넌트 리턴
  return (
    <>
      <Wrap>
        <Container>
          <Row>
            <Col lg={4}>
              <div className="cards">
                <div
                  className="card"
                  onClick={() => navigate("/detail/" + item[itemIndex].post_id)}
                >
                  <img
                    src={item[itemIndex].imageUrl}
                    className="card__image"
                    alt=""
                  />
                  <div className="card__overlay">
                    <div className="card__header">
                      <svg
                        className="card__arc"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path />
                      </svg>
                      <div className="card__header-text">
                        <h2 className="card__title">
                          💛{item[itemIndex].placeTitle}
                        </h2>
                        <span className="card__status">
                          🟡{item[itemIndex].title}
                        </span>
                      </div>
                    </div>
                    <h3 className="card__description">
                      {item[itemIndex].content}
                    </h3>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
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

export default List;
