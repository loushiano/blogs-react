import { get, authGet, authPost } from "./authorizationActions";
import { goTo } from "./generalActions";

export const SET_BLOGS = "SET_BLOGS";
export const SET_BLOG_LOADING = "SET_BLOG_LOADING";
export const SET_USER_BLOGS = "SET_USER_BLOGS";
export const SET_CATEGORIES = "SET_CATEGORIES";

export function getBlogs() {
  return dispatch => {
    dispatch(
      get("/blogs/", (dispatch, res) => {
        dispatch(setBlogs(res.data));
      })
    );
  };
}
export function addCategory(fields) {
  return dispatch => {
    dispatch(
      authPost(
        "/add/category/",
        { name: fields["name"].value },
        (dispatch, res) => {
            dispatch(getCategories());
        }
      )
    );
  };
}
export function getCategories() {
  return dispatch => {
    dispatch(setLoading(true));
    dispatch(
      authGet("/profile/categories/", (dispatch, res) => {
        dispatch(setCategories(res.data));
      })
    );
  };
}

function setCategories(categories) {
  return {
    type: SET_CATEGORIES,
    categories: categories
  };
}
function setBlogs(blogs) {
  let blogMap = {};
  blogs.map(item => {
    attachBlogToMonth(item, blogMap);
  });
  return {
    type: SET_BLOGS,
    blogs: blogMap
  };
}

function setLoading(loading) {
  return {
    type: SET_BLOG_LOADING,
    loading: loading
  };
}

function attachBlogToMonth(blog, map) {
  let month = blog.category.name;
  if (!map[month]) {
    map[month] = [blog];
  } else {
    map[month].push(blog);
  }
}

function setUserBlogs(blogs) {
  return {
    type: SET_USER_BLOGS,
    blogs: blogs
  };
}
export function getBlogsForUser() {
  return dispatch => {
    dispatch(setBlogs([]));
    dispatch(setLoading(true));
    dispatch(
      authGet("/profile/blogs/", (dispatch, res) => {
        dispatch(setUserBlogs(res.data));
      })
    );
  };
}

export function addBlog(fields) {
  return dispatch => {
    dispatch(
      authPost(
        "/add/blog",
        { title: fields["title"].value, text: fields["text"].value },
        (dispatch, res) => {
          return dispatch(goTo("/dashboard"));
        }
      )
    );
  };
}
