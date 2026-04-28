// routes/payment.js
const router = require("express").Router();
const stripe = require("stripe")("YOUR_KEY");

router.post("/create-session", async (req,res)=>{
  const session = await stripe.checkout.sessions.create({
    payment_method_types:["card"],
    mode:"subscription",
    line_items:[{
      price_data:{
        currency:"inr",
        product_data:{name:"Subscription"},
        unit_amount:50000,
        recurring:{interval:"month"}
      },
      quantity:1
    }],
    success_url:"http://localhost:3000/dashboard",
    cancel_url:"http://localhost:3000"
  });

  res.json({id:session.id});
});

module.exports = router;