import { useEffect, useState } from "react";
import axios from "axios";

export default function Charity(){

  const [data,setData]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/charity")
      .then(res=>setData(res.data));
  },[]);

  const select=async(id)=>{
    await axios.post("http://localhost:5000/charity/select",{
      user_id:"USER_ID_HERE",
      charity_id:id
    });
    alert("Selected");
  };

  return(
    <div>
      <h1>Choose Charity</h1>

      {data.map(c=>(
        <div key={c.id}>
          {c.name}
          <button onClick={()=>select(c.id)}>Select</button>
        </div>
      ))}
    </div>
  );
}