import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// 프로필 이미지 improt
import logo from "../img/logo.gif";

const Header_nav = () => {
  // 토큰 유무 확인
  const is_login = localStorage.getItem("user_token") ? true : false;

  // 유저의 정보 가져오기
  // const user_info = useSelector((state) => state.user.user_info);
  const login_user = {
    // user_id: user_info[0]?.user_id,
  };

  // 메인페이지인 경우 null
  if (window.location.pathname === "/") return null;
  // 로그인페이지 -> 회원가입 버튼
  if (window.location.pathname === "/login")
    return (
      <HeaderWrap>
        <HomeBtn className="btn" to="/">
          메인으로
        </HomeBtn>
        <Title>
          <img src={logo} alt="" />
        </Title>
        <RightBtn className="btn" to="/signup">
          회원가입
        </RightBtn>
      </HeaderWrap>
    );
  // 회원가입페이지 -> 로그인 버튼
  if (window.location.pathname === "/signup") {
    return (
      <HeaderWrap>
        <HomeBtn className="btn" to="/">
          메인으로
        </HomeBtn>
        <Title>
          <img src={logo} alt="" />
        </Title>
        <RightBtn className="btn" to="/login">
          로그인
        </RightBtn>
      </HeaderWrap>
    );
  } else {
    // 그외 작성페이지, 상세페이지
    return (
      <HeaderWrap>
        <HomeBtn className="btn" to="/">
          메인으로
        </HomeBtn>
        <Title>
          <img src={logo} alt="" />
        </Title>

        {is_login === false ? (
          <RightBtn className="btn" to="/login">
            로그인
          </RightBtn>
        ) : (
          <UserBox>
            <p>{login_user.email}</p>
          </UserBox>
        )}
      </HeaderWrap>
    );
  }
};

const HeaderWrap = styled.div`
  width: 100%;
  height: 80px;
  background: #ffda04;
  position: relative;
  font-family: "양진체";

  .btn {
    position: absolute;
    background: #eee;
    border-radius: 5px;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
    padding: 10px 30px;
    text-decoration: none;
  }
`;

const LoginBox = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 10px 30px;
`;
const UserBox = styled.div`
  width: 160px;
  height: 45px;
  border: 3px solid #000;
  border-radius: 10px;
  background: #ffeeef;
  position: absolute;
  right: 0;
  margin-right: 30px;
  top: 50%;
  transform: translateY(-50%);

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
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;
const Title = styled.h1`
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 153px;
  margin: 0;

  img {
    width: 100%;
    height: 100%;
  }
`;

const HomeBtn = styled(Link)`
  left: 0;
  margin-left: 30px;
  border: 3px solid #000;
  border-radius: 10px;
`;

const RightBtn = styled(Link)`
  right: 0;
  margin-right: 30px;
  border: 3px solid #000;
  border-radius: 10px;
`;
export default Header_nav;
