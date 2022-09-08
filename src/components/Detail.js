import React, { useState, useEffect } from "react";
import axios from "axios";
// CSS 관련 Imports
import styled from "styled-components";
//post정보
import { useParams, useNavigate } from "react-router-dom";
// 리덕스 관련
import { useDispatch, useSelector } from "react-redux";
import { __getDetail } from "../redux/modules/detail";
import { __getComment } from "../redux/modules/comments";
//스크롤 관련
import Header_nav from "../components/Header_nav";

const Detail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const detail = useSelector((state) => state.detail);
  const comments = useSelector((state) => state.comment);

  //페이지 인덱스값 받아오기
  const { id } = useParams();
  // const id = params.id;

  //데이터 가져오기
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");
  // console.log(posts);
  useEffect(() => {
    dispatch(__getDetail(id));
    dispatch(__getComment(id));
  }, [dispatch]);

  //게시글 삭제하기
  const delete_post = () => {
    navigate("/");
  };

  const removePost = async () => {
    let a = await axios.delete(`http://3.36.70.96:8080/api/auth/place/${id}`, {
      headers: {
        Authorization: localStorage.getItem("Authorization"),
        RefreshToken: localStorage.getItem("RefreshToken"),
      },
    });

    console.log(a);
  };
  const updatePost = async () => {
    let change1 = prompt("수정할 제목을 입력해주세요.");
    let change2 = prompt("수정할 장소을 입력해주세요.");
    let change3 = prompt("수정할 내용을 입력해주세요.");
    let change4 = prompt("수정할 이미지을 입력해주세요.");
    let payload = {
      title: change1,
      placetitle: change2,
      content: change3,
      imageUrl: change4,
    };
    let a = await axios.put(
      `http://3.36.70.96:8080/api/auth/place/${id}`,
      payload,
      {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
          RefreshToken: localStorage.getItem("RefreshToken"),
        },
      }
    );
    console.log(a);
  };

  const createComment = async () => {
    let a = await axios.post(
      `http://3.36.70.96:8080/api/auth/comment/${id}`,
      { content: comment },
      {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
          RefreshToken: localStorage.getItem("RefreshToken"),
        },
      }
    );
  };
  const removeComment = async (cid) => {
    let a = await axios.delete(
      `http://3.36.70.96:8080/api/auth/comment/${cid}`,
      {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
          RefreshToken: localStorage.getItem("RefreshToken"),
        },
      }
    );
  };
  const updateComment = async (cid) => {
    let change = prompt("수정할 내용을 입력해주세요.");
    let a = await axios.put(
      `http://3.36.70.96:8080/api/auth/comment/${cid}`,
      { content: change },
      {
        headers: {
          Authorization: localStorage.getItem("Authorization"),
          RefreshToken: localStorage.getItem("RefreshToken"),
        },
      }
    );
  };

  return (
    <Wrap>
      <Header_nav />
      <Container>
        <Div>
          <img src={detail?.data?.data?.imageUrl} />
          <Box>
            <label>작성자</label>
            <div>
              <h2>{detail?.data?.data?.author}</h2>
            </div>

            <label>맛집이름</label>
            <div>
              <h2>{detail?.data?.data?.placeTitle}</h2>
            </div>

            <label>제목</label>
            <div>
              <h2>{detail?.data?.data?.title}</h2>
            </div>
          </Box>
        </Div>

        <Intro>
          <label>내용</label>
          <div>
            <h2>{detail?.data?.data?.content}</h2>
          </div>
        </Intro>
        <div style={{ display: "flex" }}>
          <Button
            onClick={() => {
              removePost();
            }}
          >
            글 삭제하기
          </Button>
          <Button
            onClick={() => {
              updatePost();
            }}
          >
            글 수정하기
          </Button>
        </div>

        <Content>
          <div>
            <div> 댓글</div>
            <input
              placeholder="댓글작성"
              onChange={(e) => {
                setComment(e.target.value);
              }}
              name="comment"
              value={comment.content}
              type="text"
            />
            <Btn
              onClick={() => {
                createComment();
              }}
            >
              등록
            </Btn>
          </div>
        </Content>
        <Content>
          <div>
            {comments?.data?.data?.map((comment) => {
              return (
                <>
                  <div key={comment.id}>
                    <p>{comment.author}</p>
                    <p>{comment.content}</p>
                    <Btn
                      onClick={() => {
                        updateComment(comment.id);
                      }}
                    >
                      수정
                    </Btn>
                    <Btn
                      onClick={() => {
                        removeComment(comment.id);
                      }}
                    >
                      삭제
                    </Btn>
                  </div>
                </>
              );
            })}
          </div>
        </Content>
      </Container>
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px;
  background: linear-gradient(to bottom, rgb(255, 217, 0), rgb(255, 255, 255));
`;

const Div = styled.div`
  display: flex;
  flex-direction: row;
  margin: 30px auto;
`;

const Img = styled.img`
  background-size: cover;
  height: 350px;
  width: 250px;
  border-radius: 20px;
  border: 2px solid #000;

  box-shadow: 2px 5px 0px #000;

  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 200%;
  font-size: 18px;
  font-weight: 600;
`;

const Box = styled.div`
  margin: auto;
  text-align: left;
  div {
    h2 {
      margin: 10px;
    }
    text-align: center;
    margin: 5px;
    width: 400px;
    height: 50px;
    border: 2px solid #000;
    border-radius: 20px;
  }
`;
const Intro = styled.div`
  text-align: left;
  font-size: 18px;
  h2 {
    border: 2px solid #000;
    border-radius: 10px;
    padding: 20px;
  }
`;

const Button = styled.button`
  font-family: "양진체";
  border: none;
  display: block;
  text-align: center;
  cursor: pointer;
  text-transform: uppercase;
  outline: none;
  overflow: hidden;
  position: relative;
  color: #fff;
  font-size: 15px;
  background-color: #222;
  padding: 17px 60px;
  margin: 0 auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  :after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 490%;
    width: 140%;
    background: #ffe000;
    -webkit-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-transform: translateX(-98%) translateY(-25%) rotate(45deg);
    transform: translateX(-98%) translateY(-25%) rotate(45deg);
  }
  :hover::after {
    -webkit-transform: translateX(-9%) translateY(-25%) rotate(45deg);
    transform: translateX(-9%) translateY(-25%) rotate(45deg);
  }
`;

const Content = styled.div`
  margin: 50px auto;
  text-align: left;
  width: 70vh;
  display: flex;
  input {
    margin: auto;
    width: 500px;
    height: 50px;
    border: 2px solid black;
    border-radius: 10px;
  }
`;
const Btn = styled.button`
  font-family: "양진체";
  font-size: 20px;
  background: #000;
  color: #fff;
  line-height: 42px;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  :hover {
    background: transparent;
    color: #000;
    box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
      7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001;
  }
`;

const Comments = styled.div`
  width: 70vh;
  margin: auto;
  text-align: left;
  div {
    display: flex;
    margin: auto;
    text-align: center;
  }

  h3 {
    border: 2px solid black;
    border-radius: 5px;
    padding: 10px;
    margin: 20px;
    width: 500px;
  }
`;

const Container = styled.div`
  width: 100vh;
  height: 100vw;
  margin: auto;
  font-family: "양진체";
`;

export default Detail;
