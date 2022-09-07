import React, { useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
// 리덕스 관련 Imports
import { useDispatch } from "react-redux";
import { create_post_AX, update_post_AX } from "../redux/modules/posts";
import styled from "styled-components";

function Write(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  // 유저 정보를 받아옵니다.
  const is_login = props.is_login;
  const Member = props.Member[0];

  // 로그인된 유저가 아니라면, 글 못씀
  React.useEffect(() => {
    if (!is_login) {
      window.alert("글 작성전에 먼저 로그인 해주세요!");
      navigate(-1);
    }
  }, []);

  // 게시물 수정인지, 새로 쓰는것인지 판별
  const isNew = params.post_id === "new" ? true : false;

  // 수정이라면 : 현재 포스트의 데이터를 불러와 state로 저장합니다
  const [thisPost, setThisPost] = React.useState(null);

  React.useEffect(() => {
    if (!isNew) {
      axios
        .get("http://3.36.70.96:8080/api/place" + params.post_id)
        .then((response) => {
          setThisPost(response.data);
          if (is_login && Member.Member_nickname !== response.data.user_id) {
            window.alert("작성자만 수정할 수 있어요!");
            navigate(-1);
          }
        });
    }
  }, []);

  // 입력창 정보 받아오기
  const title_ref = useRef(null);
  const content_ref = useRef(null);

  // 작성하기 버튼 눌렀을때 :)
  const writePost = () => {
    if (title_ref.current.value.length > 0) {
      const new_post = {
        title: title_ref.current.value,
        content: content_ref.current.value,
        Member_nickname: Member.Member_nickname,
      };
      dispatch(create_post_AX(new_post));
      navigate("/");
    } else {
      const msg =
        !title_ref.current.value.length > 0
          ? "제목을 등록해주세요"
          : !content_ref.current.value.length > 0
          ? "맛집을 소개해주세요"
          : "이미지를 등록해주세요";
      window.alert(msg);
    }
  };

  // 수정하기 버튼 눌렀을 때
  const EditPost = () => {
    if (title_ref.current.value.length > 0) {
      const new_post = {
        title: title_ref.current.value,
        content: content_ref.current.value,
        Member_nickname: Member.Member_nickname,
      };
      dispatch(update_post_AX(params.post_id, new_post));
      navigate("/");
    } else {
      const msg =
        !title_ref.current.value.length > 0
          ? "만화 제목을 등록해주세요"
          : !content_ref.current.value.length > 0
          ? "만화를 소개해주세요"
          : "이미지를 등록해주세요";
      window.alert(msg);
    }
  };

  return (
    <Wrap>
      <InputAreas>
        <label>맛집이름 </label>
        <input
          type="text"
          id="title"
          ref={title_ref}
          placeholder="맛집이름을 적어주세요"
          defaultValue={thisPost ? thisPost.title : ""}
        />
        <div id="description">
          <label> 맛집소개 </label>
          <textarea
            ref={content_ref}
            placeholder="맛집을 소개해주세요"
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
  );
}

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
      border: 2px solid #49b0ab;
      background-color: #e6f4f4;
      color: #49b0ab;
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
      border: 2px solid #49b0ab;
      background-color: #e6f4f4;
      color: #49b0ab;
    }
  }
`;

const ImgPreview = styled.label`
  background: ${(props) =>
    props.imgUrl ? "url(" + props.imgUrl + ")" : "#eee"};
  background-size: cover;
  height: 250px;
  width: 180px;
  border-radius: 20px;
  border: 2px solid #000;
  margin: 30px;
  box-shadow: 2px 5px 0px #000;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 200%;
  font-size: 18px;
  font-weight: 500;
  font-family: "양진체";
  color: ${(props) => (props.imgUrl ? "transparent" : "#000")};
  cursor: pointer;
`;
const ListItem = styled.div`
  padding: 10px;
  display: flex;
  margin: 10px 10px 0px 10px;
  border-radius: 20px;
  cursor: pointer;
  &:hover {
    background-color: #ffeeef;
    color: #000;
    button {
      background-color: #fb8b8c;
      color: #000;
    }
  }
  button {
    margin-top: 15px;
    width: 60px;
    height: 40px;
    outline: none;
    border: 2px solid black;
    border-radius: 50px;
    box-shadow: 1px 3px 0px #000;
    font-size: 12px;
    font-weight: 600;
    color: #fb8b8c;
    background-color: #ffeeef;
    cursor: pointer;
  }
`;
const Button = styled.button`
  padding: 16px;
  width: 60%;
  margin: 80px 0px 20px 0px;
  outline: none;
  border: 3px solid black;
  border-radius: 50px;
  box-shadow: 2px 5px 0px #000;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  cursor: pointer;
  background-color: #49b0ab;
  &:hover {
    background-color: #fae209;
    color: #000;
  }
`;

export default Write;
