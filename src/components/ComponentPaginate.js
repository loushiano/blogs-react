import React,{useState,useEffect} from "react"

export default function ComponentPaginate(props){
    const [chunks,setChuncks] = useState([[]]);
    const [page,setPage] = useState(0);
    useEffect(()=>{
        setChuncks(chunckArray(props.components,props.split));
    },[props.components]);

    function chunckArray(components,split){
            var index = 0;
            var arrayLength = components.length;
            var tempArray = [];
            for (index = 0; index < arrayLength; index += split) {
                // Do something if you want with the group
                tempArray.push(components.slice(index, index+split));
            }
            return tempArray
    }

    function handleChange(event,pageNum){
        event.preventDefault();
        setPage(pageNum);
    }
    function handlePageNumChange(event,pageNum){
        event.preventDefault();
        setPage(page+pageNum);
    }
    return (
        <>
            {chunks[page]!=undefined?chunks[page].map((item,key)=>item):null}
            
            {chunks.length>1?<div style={{textAlign:"center",width:"100%"}}>  <div className="post-pagination">
                    <a href="" onClick={e=>handlePageNumChange(e,-1)}><i className="fa fa-angle-double-left"></i></a>
                    {chunks.map((item,key)=><a className={key==page?"active":""} href="" onClick={e=>handleChange(e,key)}>{key+1}</a>)}
                    <a href="" onClick={e=>handlePageNumChange(e,+1)}><i className="fa fa-angle-double-right"></i></a>
                </div></div>:null}
        </>
    )
}
