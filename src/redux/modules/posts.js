import instance from "../../shared/Request";
import axios from "axios";

// 액션
const LOAD = "posts/LOAD";
const CREATE = "posts/CREATE";
const UPDATE = "posts/UPDATE";
const DELETE = "posts/DELETE";

// 액션생성함수
export function load_posts(post_list) {
  return { type: LOAD, post_list };
}

export function create_post(post_data) {
  return { type: CREATE, post_data };
}

export function update_post(post_data) {
  return { type: UPDATE, post_data };
}

export function delete_post(post_id) {
  return { type: DELETE, post_id };
}

//미들웨어
export const load_posts_AX = () => {
  return function (dispatch) {
    axios
      .get("http://3.36.70.96:8080/api/place", {
        headers: {
          nickname: localStorage.getItem("nickname"),
          Authorization: localStorage.getItem("Authorization"),
          RefreshToken: localStorage.getItem("RefreshToken"),
        },
      })
      .then((response) => dispatch(load_posts(response.data.post)));
  };
};

export const create_post_AX = (post_data) => {
  return function (dispatch) {
    instance
      .post("http://3.36.70.96:8080/api/auth/place", post_data)
      .then((response) => {
        post_data = { ...post_data, post_id: response.data.post_id };
        dispatch(create_post(post_data));
        window.alert("맛집이 등록되었어요!");
      })
      .catch((err) => {
        window.alert("앗! 문제가 발생했어요. 다시 시도해주세요");
        console.log(err);
      });
  };
};

export const update_post_AX = (post_id, post_data) => {
  return function (dispatch) {
    instance
      .put("http://3.36.70.96:8080/api/auth/place" + post_id, post_data)
      .then((response) => {
        window.alert(response.data.msg);
        dispatch(update_post(post_data));
      })
      .catch((err) => {
        console.log(err);
        window.alert("앗! 문제가 발생했어요. 다시 시도해주세요");
      });
  };
};

export const delete_post_AX = (post_id) => {
  return function (dispatch, getState) {
    instance
      .delete(`http://3.36.70.96:8080/api/auth/place/${post_id}`)
      .then((response) => console.log(response));
    dispatch(delete_post());
  };
};

// 초기값
const initialState = {
  list: [{ title: "", placeTitle: "", content: "", author: "", imageUrl: "" }],
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "posts/LOAD": {
      return { is_loaded: true, list: action.post_list };
    }

    case "posts/CREATE": {
      const new_post_list = [...state.list, action.post_data];
      return { ...state, list: new_post_list };
    }

    case "posts/UPDATE": {
      const new_post_list = state.list.map((a) =>
        parseInt(action.post_data.id) === a.id ? { ...action.post_data } : a
      );
      return { ...state, list: new_post_list };
    }

    case "posts/DELETE": {
      const renew_post = state.list.filter((c) => action.post_id !== c.post_id);
      return { list: renew_post };
    }

    default:
      return state;
  }
}
