import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

// 리덕스 관련 Imports
import { useDispatch, useSelector } from "react-redux";

// 컴포넌트 Imports
import List from "./components/List";
import Write from "./components/Write";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Detail from "./components/Detail";
import Header_nav from "./components/Header_nav";
import { loginCheckDB } from "./redux/modules/user";

function App() {
  const dispatch = useDispatch();
  const is_login = localStorage.getItem("user_token") ? true : false;
  const user_info = useSelector((state) => state.user.user_info);

  React.useEffect(() => {
    if (is_login) {
      dispatch(loginCheckDB());
    }
  }, []);
  console.log(is_login, user_info);

  return (
    <div className="App">
      <Header_nav />
      <Routes>
        <Route
          path="/"
          element={<List is_login={is_login} user_info={user_info} />}
        />
        <Route
          path="/write/:post_id"
          element={<Write is_login={is_login} user_info={user_info} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/detail/:id"
          element={<Detail is_login={is_login} user_info={user_info} />}
        />
      </Routes>
    </div>
  );
}

export default App;
