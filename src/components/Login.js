import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Header_nav from "../components/Header_nav";

const Login = () => {
  const navigate = useNavigate();

  const initialState = {
    nickname: "",
    password: "",
  };

  const [inputValue, setInputValue] = useState(initialState);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    //빈값 체크
    if (inputValue.nickname === "" || inputValue.password === "") {
      window.alert("아이디와 비밀번호를 입력해주세요.");
    }

    try {
      const data = await axios.post(
        "http://3.36.70.96:8080/api/login",
        inputValue
      );
      localStorage.setItem("Authorization", data.headers.authorization); //accesstoken
      localStorage.setItem("RefreshToken", data.headers.refreshtoken); //refreshtoken
      localStorage.setItem("nickname", data.data.data.nickname);
      console.log(data);
      navigate("/");
    } catch (error) {
      alert("아이디와 비밀번호를 다시 확인해주세요.");
    }

    console.log(inputValue);
  };

  return (
    <>
      <Header_nav />
      <Wrap>
        <form onSubmit={onSubmitHandler}>
          <StLoginBox>
            <StLoginHeader>
              <h1> 로그인 </h1>
            </StLoginHeader>
            <StLoginInputBox>
              <div className="username-box">
                <label htmlFor="nickname">아이디</label>
                <StLoginInput
                  type="text"
                  name="nickname"
                  value={inputValue.nickname}
                  onChange={onChangeHandler}
                />
              </div>
              <div className="password-box">
                <label htmlFor="password">비밀번호</label>
                <StLoginInput
                  type="password"
                  name="password"
                  value={inputValue.password}
                  onChange={onChangeHandler}
                />
              </div>
            </StLoginInputBox>
            <div>
              <StLoginBtn>로그인</StLoginBtn>
            </div>
          </StLoginBox>
        </form>
      </Wrap>
    </>
  );
};

export default Login;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px;
  background: linear-gradient(to bottom, rgb(255, 217, 0), rgb(255, 255, 255));
`;

const StLoginBox = styled.div`
  text-align: center;
  margin: auto;
  font-family: "양진체";
  padding: 50px;
  width: 400px;
  border: 3px solid #000;
  margin-top: 40px;
  margin: 40px auto;
  border-radius: 22px;
  box-shadow: 0px 10px 0px 0px;
  background: #ffffff;
`;

const StLoginHeader = styled.div`
  font-size: 20px;
  text-align: center;
  padding: 10px 20px 10px 20px;
  background: #ffe000;
`;

const StLoginInputBox = styled.div`
  margin-top: 20px;
`;

const StLoginInput = styled.input`
  font-size: 16px;
  padding: 4px;
  margin: 20px;
  width: 180px;
  background: white;
  border: 3px solid #ffe000;
  border-radius: 3px;
`;

const StLoginBtn = styled.button`
  font-family: "IM_Hyemin-Regular";
  display: block;
  width: 100%;
  padding: 16px 10px;
  margin-top: 70px;
  background: #ffe000;
  border: none;
  font-size: 18px;
  cursor: pointer;
  border-radius: 2px;
  font-family: "양진체";
`;
