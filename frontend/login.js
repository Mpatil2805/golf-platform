import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Login(){

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const router = useRouter();

  const login=async()=>{
    const res = await axios.post("http://localhost:5000/auth/login",{
      email,password
    });

    localStorage.setItem("token",res.data.token);

    router.push("/dashboard");
  };

  return(
    <div>
      <h1>Login</h1>

      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input placeholder="Password" onChange={e=>setPassword(e.target.value)} />

      <button onClick={login}>Login</button>
    </div>
  );
}