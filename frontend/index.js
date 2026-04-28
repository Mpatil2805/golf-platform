import { useRouter } from "next/router";

export default function Home(){
  const router = useRouter();

  return(
    <div style={{
      textAlign:"center",
      padding:"100px",
      background:"linear-gradient(to right, purple, blue)",
      color:"white",
      minHeight:"100vh"
    }}>

      <h1 style={{fontSize:"50px"}}>Play. Win. Give Back.</h1>

      <p>Track scores, win rewards & support charity</p>

      <button onClick={()=>router.push("/login")} style={{margin:10}}>
        Login
      </button>

      <button onClick={()=>router.push("/subscribe")}>
        Subscribe
      </button>

    </div>
  );
}