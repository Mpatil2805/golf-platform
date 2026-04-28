export default function Dashboard(){
  return(
    <div style={{padding:"20px"}}>

      <h1>Dashboard</h1>

      <div style={{display:"flex", gap:"20px"}}>

        <div style={{border:"1px solid", padding:"10px"}}>
          <h3>Subscription</h3>
          <p>Active</p>
        </div>

        <div style={{border:"1px solid", padding:"10px"}}>
          <h3>Charity</h3>
          <p>Selected Charity</p>
        </div>

        <div style={{border:"1px solid", padding:"10px"}}>
          <h3>Winnings</h3>
          <p>₹0</p>
        </div>

      </div>

    </div>
  );
}