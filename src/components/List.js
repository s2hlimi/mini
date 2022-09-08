import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 리덕스 관련 Imports
import { useDispatch, useSelector } from "react-redux";
import { __getPost } from "../redux/modules/posts";

import styled from "styled-components";
import Header_home from "./Header_home";

function List() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  // // 리덕스에서 포스트 리스트를 로딩
  useEffect(() => {
    dispatch(__getPost());
  }, [dispatch]);
  console.log(posts?.data?.data);
  // 컴포넌트 리턴
  return (
    <>
      <Header_home />
      <Wrap>
        <ContentsArea>
          <GridBox>
            <Cards>
              <div>
                {posts?.data?.data?.map((post) => {
                  return (
                    <div
                      onClick={() => {
                        navigate(`/detail/${post.id}`);
                      }}
                      key={post.id}
                    >
                      <img src={post.imageUrl} />
                      <p>{post.id}</p>
                      <p>{post.title}</p>
                      <p>{post.content}</p>
                      <p>{post.placeTitle}</p>
                      <p>{post.author}</p>
                    </div>
                  );
                })}
              </div>
            </Cards>
          </GridBox>
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
  background-size: 800px;
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
`;

const CardThumb = styled.div`
  border: 3px solid #000;
  width: 240px;
  height: 320px;
  margin: 20px auto;
  box-sizing: border-box;
  border-radius: 25px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
`;

export default List;
