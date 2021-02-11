import React from "react";

export default function AppSpinner(props) {
  const skChild= props.noDim!=undefined&&props.noDim?"sk-child sk-child-no-dim":"sk-child";

  return (
    <div className={props.show?props.noDim!=undefined&&props.noDim?"spinner_parent":"spinner_parent dim":"hidden"}>
         {//<ReactSpinner className="spinner" type="border" color="primary" size={props.show?"12":"0"} />
         }
         <div className={props.small?"sk-circle":"sk-circle sk-circle-diff"}>
  <div className={"sk-circle1 "+skChild}></div>
  <div className={"sk-circle2 "+skChild}></div>
  <div className={"sk-circle3 "+skChild}></div>
  <div className={"sk-circle4 "+skChild}></div>
  <div className={"sk-circle5 "+skChild}></div>
  <div className={"sk-circle6 "+skChild}></div>
  <div className={"sk-circle7 "+skChild}></div>
  <div className={"sk-circle8 "+skChild}></div>
  <div className={"sk-circle9 "+skChild}></div>
  <div className={"sk-circle10 "+skChild}></div>
  <div className={"sk-circle11 "+skChild}></div>
  <div className={"sk-circle12 "+skChild}></div>
</div>
</div> 
  );
}
