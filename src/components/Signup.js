import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import { __checkId } from "../redux/modules/signUp";
import { useNavigate } from "react-router-dom";
import Header_nav from "../components/Header_nav";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    nickname: "",
    password: "",
    passwordConfirm: "",
  });

  const [nicknameError, setNicknameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfirmError, setPasswordConfirmError] = useState(false);

  //유효성 체크
  const onChangeNickname = (e) => {
    const userIdRegex = /^[A-Za-z0-9+]{4,10}$/;
    if (!e.target.value || userIdRegex.test(e.target.value))
      setNicknameError(false);
    else setNicknameError(true);
    // setInput(e.target.value);
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9]).{8,20}$/;

    if (!e.target.value || passwordRegex.test(e.target.value))
      setPasswordError(false);
    else setPasswordError(true);

    if (!input.passwordConfirm || e.target.value === input.passwordConfirm)
      setPasswordConfirmError(false);
    else setPasswordConfirmError(true);
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const onChangePasswordConfirm = (e) => {
    if (input.password === e.target.value) setPasswordConfirmError(false);
    else setPasswordConfirmError(true);
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  //유효성 검사
  const validation = () => {
    if (!input.nickname) setNicknameError(true);
    if (!input.password) setPasswordError(true);
    if (!input.passwordConfirm) setPasswordConfirmError(true);

    if (nicknameError && passwordError && passwordConfirmError) return true;
    else return false;
  };
  console.log(input.nickname);
  console.log(input.password);
  console.log(input.passwordConfirm);

  //아이디 중복 체크
  const onIdCheckHandler = async (e) => {
    e.preventDefault();
    const { nickname } = input;
    const user = {
      nickname: nickname,
    };
    dispatch(__checkId(user));

    return;
  };

  //회원가입 버튼 누르면 실행
  const addHandler = async () => {
    const { nickname, password, passwordConfirm } = input;
    const user = {
      nickname: nickname,
      password: password,
      passwordConfirm: passwordConfirm,
    };
    if (input.password !== input.passwordConfirm) {
      return alert("비밀번호가 일치하지 않습니다");
    } else {
      try {
        const data = await axios.post(
          "http://3.36.70.96:8080/api/signup",
          user
        );
        console.log(data);
        if (data.data.success === false) alert(data.data.error.message);
        else {
          alert("회원가입이 완료되었습니다.");
          navigate("/");
        }
      } catch (error) {
        alert("가입에 실패했습니다");
      }
    }
    console.log(validation());
    if (validation()) {
    }
    return;
  };

  return (
    <>
      <Header_nav />
      <ContainerWrap>
        <StForm>
          <InputWrap>
            <StLabel>아이디</StLabel>
            <StInputId
              placeholder="아이디를 입력하세요."
              onChange={onChangeNickname}
              type="text"
              name="nickname"
              id="nickname"
              value={input.nickname}
            />
            <StButton content={"check"} onClick={onIdCheckHandler}>
              중복확인
            </StButton>
          </InputWrap>
          <StSmallLabel>
            * 아이디는 영어와 숫자로 4자이상 10자 이하로 입력해주세요. *
          </StSmallLabel>

          <InputWrap>
            <StLabel>비밀번호</StLabel>
            <StInput
              placeholder="password를 입력하세요."
              onChange={onChangePassword}
              type="password"
              name="password"
              id="password"
              value={input.password}
            />
          </InputWrap>
          <StSmallLabel style={{ marginLeft: "50px" }}>
            * 비밀번호는 영어, 숫자 포함 8자이상 20자이하로 입력해주세요 *
          </StSmallLabel>
          <InputWrap>
            <StLabel>비밀번호 재확인</StLabel>
            <StInput
              placeholder="password를 한 번 더 입력해주세요."
              onChange={onChangePasswordConfirm}
              type="password"
              name="passwordConfirm"
              id="passWordConfirm"
              value={input.passwordConfirm}
            />
            {passwordConfirmError && (
              <div className="invalid-input">비밀번호가 일치하지 않습니다.</div>
            )}
          </InputWrap>
          <JoinBtn
            type="button"
            onClick={() => {
              addHandler();
              console.log(input);
            }}
          >
            회원가입
          </JoinBtn>
        </StForm>
      </ContainerWrap>
    </>
  );
};

export default Signup;

const ContainerWrap = styled.div`
  text-align: center;
  margin: auto;
`;

const InputWrap = styled.div`
  width: 100%;
  border: none;
  border-radius: 8px;
  margin: 1.5% auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StLabel = styled.label`
  width: 10vw;
  min-width: 70px;
  height: 30px;
  margin-right: 1.5%;
  padding: 2%;
  display: flex;
  align-items: center;
  justify-content: right;
  border-radius: 8px;
  font-weight: bolder;
`;

const StInputId = styled.input`
  width: 32%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  height: 30px;
  background-color: whitesmoke;
`;

const StInput = styled.input`
  width: 40%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  height: 30px;
  background-color: whitesmoke;
`;

const StButton = styled.button`
  background-color: #4b89dc;
  border: none;
  border-radius: 5px;
  padding: 5px;
  margin: 0 0 0 38px;
  cursor: pointer;
`;

const StSmallLabel = styled.label`
  width: 95%;
  font-size: 12px;
  color: #285999;
  font-weight: 600;
  height: 20vw;
`;

const JoinBtn = styled.button`
  width: 150px;
  height: 40px;
  margin-left: 10px;
  margin-top: 3%;
  font-size: 15px;
  background-color: #4b89dc;
  color: black;
  font-weight: 600;
  border-radius: 10px;
`;

const StForm = styled.form``;
