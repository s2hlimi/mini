import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// 리덕스 관련 Imports
import { useDispatch } from "react-redux";

import styled from "styled-components";
import Header_nav from "../components/Header_nav";

function Write(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  // 유저 정보를 받아옵니다.
  const is_login = props.is_login;
  const nickname = localStorage.getItem("nickname");

  // 로그인된 유저가 아니라면, 글 못씀
  useEffect(() => {
    if (!localStorage.getItem("nickname")) {
      window.alert("글 작성전에 먼저 로그인 해주세요!");
      navigate(-1);
    }
  }, []);

  // 게시물 수정인지, 새로 쓰는것인지 판별
  const isNew = params.post_id === "new" ? true : false;

  // 수정이라면 : 현재 포스트의 데이터를 불러와 state로 저장
  const [thisPost, setThisPost] = useState(null);



  // 입력창 정보 받아오기
  const title_ref = useRef(null);
  const content_ref = useRef(null);
  const placeTitle_ref = useRef(null);
  const imageUrl_ref = useRef(null);
  const createdAt_ref = useRef(null);
  const author = localStorage.getItem("nickname");

  // 작성하기 버튼 눌렀을때 :)
  const writePost = async() => {
    if (title_ref.current.value.length > 0) {
      const new_post = {
        title: title_ref.current.value,
        placetitle: placeTitle_ref.current.value,
        content: content_ref.current.value,
        imageUrl: imageUrl_ref.current.value,
      };
      console.log(new_post)
      let a = await axios.post("http://3.36.70.96:8080/api/auth/place",new_post,{
        headers: {
            Authorization: localStorage.getItem('Authorization'),
            RefreshToken: localStorage.getItem('RefreshToken'),
      }});
      console.log(a);
      navigate("/");
    } else {
      const msg =
        !content_ref.current.value.length > 0
          ? "내용을 입력해주세요"
          : !imageUrl_ref.current.value.length > 0
          ? "이미지를 등록해주세요"
          : !title_ref.current.value.length > 0
          ? "제목을 입력해주세요"
          : "맛집이름을 입력해주세요";
      window.alert(msg);
    }
  };

  // 수정하기 버튼 눌렀을 때
  const EditPost = () => {
    if (title_ref.current.value.length > 0) {
      const new_post = {
        title: title_ref.current.value,
        placetitle: placeTitle_ref.current.value,
        content: content_ref.current.value,
        imageUrl: imageUrl_ref.current.value,
      };

      navigate("/");
    } else {
      const msg =
        !content_ref.current.value.length > 0
          ? "내용을 입력해주세요"
          : !imageUrl_ref.current.value.length > 0
          ? "이미지를 등록해주세요"
          : !title_ref.current.value.length > 0
          ? "제목을 입력해주세요"
          : "맛집이름을 입력해주세요";
      window.alert(msg);
    }
  };

  return (
    <>
      <Header_nav />
      <Wrap1>
        <Wrap>
          <InputAreas>
            <label>이미지URL</label>
            <input
              type="url"
              id="imageUrl"
              ref={imageUrl_ref}
              placeholder="이미지 url을 등록해주세요"
              defaultValue={thisPost ? thisPost.title : ""}
            />
            <label>맛집이름 </label>
            <input
              type="text"
              id="placeTitle"
              ref={placeTitle_ref}
              placeholder="맛집이름을 적어주세요"
              defaultValue={thisPost ? thisPost.title : ""}
            />
            <label>제목 </label>
            <input
              type="text"
              id="title"
              ref={title_ref}
              placeholder="맛집이름을 적어주세요"
              defaultValue={thisPost ? thisPost.title : ""}
            />
            <div id="description">
              <label> 내용 </label>
              <textarea
                ref={content_ref}
                placeholder="내용을 입력해주세요"
                defaultValue={thisPost ? thisPost.content : ""}
              />
            </div>
          </InputAreas>

          {isNew ? (
            <Button onClick={writePost}> 등록하기 </Button>
          ) : (
            <Button onClick={EditPost}> 수정하기 </Button>
          )}
        </Wrap>
      </Wrap1>
    </>
  );
}

const Wrap1 = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px;
  background: linear-gradient(to bottom, rgb(255, 217, 0), rgb(255, 255, 255));
`;

const Wrap = styled.div`
  margin: 50px auto 20px auto;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 600px;
  text-align: left;
  border: 3px solid black;
  border-radius: 30px;
  box-shadow: 3px 8px 0px #000;
  background: #ffffff;
`;
const InputAreas = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  width: 80%;
  input {
    height: 30px;
    padding: 10px 20px;
    width: 90%;
    margin: 10px 0px 30px 0px;
    outline: none;
    border: 2px solid black;
    border-radius: 15px;
    font-size: 15px;
    &:focus {
      border: 2px solid;
      background-color: #fff05a;
    }
  }
  input[type="file"] {
    width: 0px;
    height: 0px;
    margin: -1px;
    padding: 0px;
    border: 0px;
    overflow: hidden;
  }
  label {
    text-align: left;
    font-weight: 600;
    font-family: "양진체";
  }
  #description {
    display: flex;
    flex-direction: column;
    text-align: left;
    gap: 10px;
  }
  textarea {
    height: 90px;
    padding: 20px;
    width: 90%;
    border: 2px solid black;
    border-radius: 15px;
    margin-bottom: 30px;
    font-size: 15px;
    font-family: "";
    &:focus {
      outline: none;
      border: 2px solid;
      background-color: #fff05a;
    }
  }
`;

const Button = styled.button`
  padding: 16px;
  width: 60%;
  margin: 40px 0px 20px 0px;
  outline: none;
  border: 3px solid black;
  border-radius: 50px;
  box-shadow: 2px 5px 0px #000;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  background-color: #ffe000;
  &:hover {
    background-color: #fff05a;
    color: #000;
  }
`;

export default Write;
