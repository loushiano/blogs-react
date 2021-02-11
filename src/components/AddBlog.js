import React,{useEffect} from "react";
import AppForm from "./AppForm";
import {useDispatch} from "react-redux";
import {addBlog, getCategories} from "../actions/blogsActions"
export default function AddBlog() {
    const dispatch = useDispatch();
    
    useEffect(()=>{
      dispatch(getCategories());
    },[])
  return (
    <section className="container" style={{marginTop:"40px"}}>
      <AppForm
        names={[
          {
            name: "title",
            hardLabel: "Enter Blog Title",
            value: "",
            mandatory: true,
            type: "text"
          },
          {
            name: "text",
            hardLabel: "Enter Blog Body",
            value: "",
            mandatory: true,
            type: "textArea"
          },
          {name:"category",
            hardLabel:"Enter Category",
            options:s
        ]}
        onSubmit={(fields) => dispatch(addBlog(fields))}
        submit="Add Blog"
      />
    </section>
  );
}
