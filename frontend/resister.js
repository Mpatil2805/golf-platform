import { useState } from "react";
import axios from "axios";

export default function Register(){

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const submit=async()=>{
    await axios.post("http://localhost:5000/auth/register",{
      name,email,password
    });
    alert("Registered");
  };

  return(
    <div>
      <h1>Register</h1>

      <input placeholder="Name" onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" onChange={e=>setPassword(e.target.value)} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}