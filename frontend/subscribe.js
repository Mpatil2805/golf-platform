import axios from "axios";

export default function Subscribe(){

  const pay=async()=>{
    const res = await axios.post("http://localhost:5000/payment/create-session");

    window.location.href = `https://checkout.stripe.com/pay/${res.data.id}`;
  };

  return(
    <div>
      <h1>Subscribe</h1>
      <button onClick={pay}>Pay Now</button>
    </div>
  );
}