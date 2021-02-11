import { SET_BLOGS, SET_BLOG_LOADING,SET_USER_BLOGS,SET_CATEGORIES } from "../actions/blogsActions";

const initialState = {
  blogs: {},
  user_blogs: [],
  loading: true,
  categories:[]
};

export default function blogsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_BLOGS:
      return { ...state, loading: false, blogs: action.blogs };
    case SET_USER_BLOGS:
      return { ...state, loading: false, user_blogs: action.blogs };
    case SET_BLOG_LOADING:
      return { ...state, loading: action.loading };
    case SET_CATEGORIES:
      return {...state,categories:action.categories,loading:false}
    default:
      return state;
  }
}
