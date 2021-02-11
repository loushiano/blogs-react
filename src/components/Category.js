import React, { useEffect } from "react";
import ActiveLink from "./ActiveLink";
import { useDispatch, useSelector } from "react-redux";
import { getCategories ,addCategory} from "../actions/blogsActions";
import AppSpinner from "./AppSpinner";
import ComponentPaginate from "./ComponentPaginate";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { showDialog } from "../actions/dialogActions";
import AppForm from "./AppForm";

const Categories = () => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.blogsReducer);
  const components = [];
  state.categories.map(item =>
    components.push(
      <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
        <div className="team-one__single">
          <div
            className="team-one__content"
            style={{ paddingTop: "30px", height: "100px" }}
          >
            <h2 className="team-one__name">
              <ActiveLink href="nothing" text={item.name} />
            </h2>
          </div>
        </div>
      </div>
    )
  );
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <section className="team-one team-page">
      <AppSpinner show={state.loading} small={true} />
      <div className="container" style={{ position: "relative" }}>
        <span style={{ position: "absolute", right: "0px", top: "-60px" }}>
          <ActiveLink
            href="function"
            onClick={() =>
              dispatch(
                showDialog(
                  <AppForm
                    names={[
                      { name: "name", type: "text", mandatory: true, value: "",hardLabel:"Enter Name" }
                    ]}
                    submit="Add Category"
                    onSubmit={fields => dispatch(addCategory(fields))}
                  />,
                  "Add Category",
                  false
                )
              )
            }
            text="Add Category"
            component={
              <div className="add" style={{ left: "-30px" }}>
                <AddCircleIcon size="large" />
              </div>
            }
          ></ActiveLink>{" "}
        </span>
        <div className="row">
          <ComponentPaginate components={components} split={9} />
        </div>
      </div>
    </section>
  );
};

export default Categories;
