import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ComponentPaginate from "./ComponentPaginate";
import AppSpinner from "./AppSpinner";
import ActiveLink from "./ActiveLink";
import { getBlogs } from "../actions/blogsActions";
import { getDayOfMonth, getMonth } from "../actions/generalActions";

const News = () => {
  const components = {};
  const dispatch = useDispatch();
  const state = useSelector(state => state.blogsReducer);
  useEffect(() => {
    dispatch(getBlogs());
  }, []);
  Object.keys(state.blogs).map(category =>
    state.blogs[category].map((blog, key) => {
      components[category] = !components[category] ? [] : components[category];
      components[category].push(
        <div className="col-lg-4" key={key}>
          <div className="blog-one__single">
            <div className="item">
              <div
                className="blog-two__single"
                style={{
                  backgroundImage: `url(assets/images/blog-${(key + 1) %
                    4}.jpg)`,
                    height:"320px"
                }}
              >
                <div className="blog-two__inner" style={{height:"320px"}}>
                  <a href="news-details.html" className="blog-two__date">
                    {getDayOfMonth(blog.date_created)}
                    <div>{getMonth(blog.date_created)}</div>
                  </a>
                  <div className="blog-two__meta">
                    <ActiveLink href="nothing" text="by Admin" />
                  </div>
                  <h3 className="blog-two__title">
                    <ActiveLink href={"/blogs/" + blog.id} text={blog.title} />
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })
  );

  return (
    <section
      className=" blog-page"
      style={{ position: "relative", minHeight: "95vh",marginTop:"25px" }}
    >
      <div className="container">
        <AppSpinner show={state.loading} />
        {Object.keys(components).map((key, index) => (
          <div key={index}>
            <div className="row">
              <h2>{key}</h2>
            </div>
            <div className="row">
              <ComponentPaginate components={components[key]} split={6} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default News;
