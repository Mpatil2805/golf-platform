import axios from "axios";

export default function Admin(){

  const [users,setUsers]=useState([]);
  const [winners,setWinners]=useState([]);

  useEffect(()=>{
    axios.get("http://localhost:5000/admin/users")
      .then(res=>setUsers(res.data));

    axios.get("http://localhost:5000/admin/winners")
      .then(res=>setWinners(res.data));
  },[]);

  const runDraw = async()=>{
    await axios.get("http://localhost:5000/draw/run");
    alert("Draw completed");
  };

  return(
    <div style={{padding:"20px"}}>

      <h1>Admin Panel</h1>

      <button onClick={runDraw}>Run Draw</button>

      <h2>Users</h2>
      {users.map(u=><div key={u.id}>{u.email}</div>)}

      <h2>Winners</h2>
      {winners.map(w=>(
        <div key={w.id}>
          {w.user_id} - ₹{w.amount}
        </div>
      ))}

    </div>
  ) };