import axios from 'axios';
import instance from '../../shared/Request'

const LOAD ='comment/LOAD'
const CREATE ="comment/CREATE"
const UPDATE = "comment/UPDATE"
const DELETE = "comment/DELETE"


//액션생성함수
export function loadComments(commentData){
    return {type:LOAD, commentData}
}

export function createComment (comment){
    return {type:CREATE,comment};
}

export function updateComment(commentData) {
    return { type: UPDATE, commentData }
  }

export function deleteComment(comment_id){
    return{type: DELETE, comment_id};
}

//미들웨어
export const loadCommentAX = (post_id) =>{
    return function(dispatch){
        axios.get(`http://54.180.121.151/api/comment/${post_id}`)
        .then(response =>dispatch(loadComments(response.data.comments)))
    }
}

export const createCommentAX = (post_id,comments) => {
    return function (dispatch) {
        instance.post(`http://54.180.121.151/api/comment/${post_id}`, comments)
      .then(() => dispatch(createComment(comments)))
    }
  }

//   export const updateCommnetAX = (comment_id, commentData) => {
//     return function (dispatch) { 
//       axios.patch('http://localhost:5001/comments/'+comment_id, commentData)
//       .then(() => { dispatch(updateComment(commentData))
//       })
//     }
//   }

//좋아요

export const likeAX = (id) => {
    return function (dispatch){
        instance.patch(`http://54.180.121.151/api/post/like/${id}`)
        .then((response) => {
        console.log(response)
        window.alert(response.data.msg)
    });
        // .catch((error) => console.log(error));
    }
  }

export const deleteCommentAX = (comment_id)=> {
    return function (dispatch, getState) {
        axios.delete(`http://54.180.121.151/api/comment/${comment_id}`)
        .then((response) => console.log(response))
        const comment_list = getState().comments.comments
        console.log(comment_list)
        const comment_index = comment_list.findIndex((c)=>{
            return c.id === comment_id;
        });
        // console.log(comment_index)
        dispatch(deleteComment(comment_index));
    }

  }

//초기값

const initialState = {
    comments:[]
};

//리듀서

export default function reducer(state = initialState, action ={}) {
    switch(action.type){
        //로드 리듀서
        case 'comment/LOAD':{
            // console.log(action)
            return{comments: action.commentData}
        }
        // 댓글생성 리듀서
        case 'comment/CREATE':{
            const new_comment =[...state.comments, action.comment];
            return {comments: new_comment};
        }
        //댓글 수정 리듀서
        // case 'comment/UPDATE': {
        //     const renewComment = state.comments.map((a) =>
        //       parseInt(action.commentData.id) === a.id ? { ...action.commentData } : a);
        //     return { ...state, list: renewComment }
        //   }

        //댓글 삭제 리듀서
        case 'comment/DELETE':{ 
            const new_comments_list = state.comments.filter((c,idx)=>{
                // console.log(new_comments_list)
             return parseInt(action.comment_id) !==idx   
            });
            return {comments: new_comments_list};
        }

        default:
            return state;
    }
}