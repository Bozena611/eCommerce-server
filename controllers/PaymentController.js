const sk_test = require("../stripe.js");
const stripe = require("stripe")(sk_test);
const Cart = require('../models/CartModel');
const jwt = require ('jsonwebtoken');

const payment = async (req, res) => {
  console.log(sk_test,req.body);
  const { email } = req.body;
  try {
    let { status } = await stripe.charges.create({
      amount: req.body.amount * 100,
      currency: "eur",
      description: "An example charge",
      receipt_email: email,
      source: req.body.token_id
    });
    res.json({ status });
   /* 
    //const user_id = req.headers;
    const user_id = localStorage.getItem('user_id');
    console.log('***user_id***'+ user_id);
    const cart = await Cart.findOneAndUpdate(
      { user:user_id },
      { $set: { products: [] }}
      );
    res.send(cart);
    */
  } catch (error) {
    res
      .status(500)
      .json({ status: 'error' })
      .end();
  }
};

module.exports = {
  payment
};
