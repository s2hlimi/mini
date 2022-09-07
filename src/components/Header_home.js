import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../img/logo.gif";

// 토큰 유무 확인 후 레이아웃 변경
const Header_home = () => {
  // 토큰 유무 확인
  const is_login = localStorage.getItem("user_token") ? true : false;
  // 유저의 정보 가져오기
  const login_user = {
    // user_id: user_info[0]?.user_id,
  };
  console.log(login_user.user_id);
  return is_login === false ? (
    <HeaderWrap>
      <Info>
        <div className="navBtn">
          <Link to="/login" className="loginBtn">
            로그인
          </Link>
          <Link to="/signup">회원가입</Link>
        </div>
      </Info>
      <TitleBox>
        <h1>
          <img src={logo} alt="" />
        </h1>
      </TitleBox>
    </HeaderWrap>
  ) : (
    <HeaderWrap>
      <Info>
        <div className="infoBox">
          <UserBox>
            <p>{login_user.user_id}님 반갑습니다!</p>
          </UserBox>
        </div>
        <div className="navBtn">
          <Link
            to="/login"
            className="loginBtn"
            onClick={() => {
              localStorage.clear();
              alert("로그아웃 되셨습니다. 감사합니다");
            }}
          >
            로그아웃
          </Link>
          <Link to="/write/new">작성하기</Link>
        </div>
      </Info>
      <TitleBox>
        <h1>
          <img src={logo} alt="" />
        </h1>
      </TitleBox>
    </HeaderWrap>
  );
};

const Info = styled.div`
  position: relative;
  height: 70px;
  .infoBox {
    position: absolute;
    top: 50%;
    left: 30px;
    transform: translateY(-50%);
  }
  .navBtn {
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
  }
  a {
    font-family: "양진체";
    border: 3px solid #000;
    display: inline-block;
    color: #000;
    background: #e6f4f4;
    margin-left: 10px;
    padding: 10px 30px 8px;
    border-radius: 10px;
  }
`;

const HeaderWrap = styled.div`
  background: #ffda04;
  h1 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    margin: 0;
    width: 260px;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
const TitleBox = styled.div`
  width: 100%;
  height: 180px;
  background: #ffda04;
  position: relative;
  box-sizing: border-box;
  background: #ffda04;
`;
const UserBox = styled.div`
  width: 160px;
  height: 45px;
  font-family: "양진체";
  border: 3px solid #000;
  border-radius: 10px;
  background: #ffffff;

  div {
    position: absolute;
    left: 7%;
    top: 50%;
    transform: translateY(-50%);
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  p {
    margin: 0;
    margin-left: 30px;
    line-height: 48px;
  }
`;

export default Header_home;
