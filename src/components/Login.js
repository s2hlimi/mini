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
      <form onSubmit={onSubmitHandler}>
        <StLoginContainer>
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
        </StLoginContainer>
      </form>
    </>
  );
};

export default Login;

//styled components

const StLoginContainer = styled.div`
  width: 400px;
  height: 600px;
  margin: 0 auto;
`;
const StLoginBox = styled.div`
  background-color: white;
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
  border: 1px solid #4b89dc;
  color: #4b89dc;
  border-radius: 10px;
  line-height: 40px;
`;

const StLoginHeader = styled.div`
  background-color: #4b89dc;
  width: 100%;
  height: 100px;
  color: white;
  text-align: center;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  h1 {
    line-height: 50px;
  }
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
  border: 1px solid #4b89dc;
  border-radius: 3px;
`;

const StLoginBtn = styled.button`
  background-color: white;
  border: 1px solid #4b89dc;
  width: 100px;
  height: 38px;
  display: inline-block;
  margin: 40px 30px;
  border-radius: 4px;
  color: #4b89dc;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  &:hover {
    background-color: #4b89dc;
    color: white;
  }
`;
