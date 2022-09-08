import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// 리덕스 관련 Imports
// import { useDispatch } from "react-redux";

// 컴포넌트 Imports
import List from "./components/List";
import Write from "./components/Write";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Detail from "./components/Detail";
// import { loginCheckDB } from "./redux/modules/user";

function App() {
  // const dispatch = useDispatch();
  const is_login = localStorage.getItem("nickname") ? true : false;
  const nickname = localStorage.getItem("nickname");

  // React.useEffect(() => {
  //   if (is_login) {
  //     // dispatch(loginCheckDB());
  //   }
  // }, []);
  // console.log(is_login, nickname);

  return (
    <>
      <Helmet>
        <title>맛집탐방😋</title>
      </Helmet>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={<List is_login={is_login} unickname={nickname} />}
          />
          <Route
            path="/write/:post_id"
            element={<Write is_login={is_login} nickname={nickname} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/detail/:id"
            element={<Detail is_login={is_login} nickname={nickname} />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
