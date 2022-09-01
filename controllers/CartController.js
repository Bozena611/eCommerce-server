const Cart = require('../models/CartModel');
const bodyParser = require ('body-parser');
const jwt = require ('jsonwebtoken');
//const mongoose = require ('mongoose');
//const { ObjectId } = mongoose.Types;



class CartController {

// add new product to Cart
/// -----VERSION 2 -------------------------------------
		
	async addProductToCart(req, res){
		const { user_id, quantity, product_id } = req.body; //not working with user_id, only with _id
				try {
			//const userCart = await Cart.findOne({_id: cart_id});
   		//const productExists = await userCart.findOne({products:{ $elemMatch: {product: product_id}}});
  		//const productExists = await userCart.find({"products.product": product_id});
   		//res.send(productExists);
   		const productExists = await Cart.findOne(
				{ user:user_id,
      	// products: { product: product_id } }); - null
				//{_id: _id, product: product_id}); - null
				"products.product": product_id}); //giving result
			//res.send(productExists);
			//console.log(productExists);
   		if (productExists) {
   	  //*** version 1 ***		//WORKS 
   	  
   			await Cart.findOneAndUpdate(
	        { user: user_id, "products.product": product_id },
	        { $inc: { "products.$.quantity": quantity } }
      	);
      	res.send({Cart});
      	     
	    } else {
	     	
      // WORKS SEPARATELY!!!!!!!
				const newProduct = { quantity: quantity, product: product_id };
	      await Cart.findOneAndUpdate(
	        { user: user_id },
	        { $addToSet: { products: newProduct } }
	      );
	      res.send({newProduct});
			}	
		} catch(err){
			res.send({err});
		}
	};


	// GET showCartItems by userid 	

// ****** version 3 ****** working in postman!!!!

async showCartItems(req, res) {
		
		let {user_id} = req.params;
		try{
			const cartItems = await Cart.findOne({user:user_id}).populate({
				path: "products.product",
				model: "products"
			});
			res.send(cartItems);
		}
		catch(err){
			res.send({err});
		}
	}

	// remove product from Cart /// ***** WORKING!!!!!!*****
	// router.delete('/cart/remove')
	async removeProductFromCart(req,res) {
		//let { user_id} = req.localStorage.user_id;
		//let {user_id} = req.params;
		//let { product_id } = req.params;
		let { user_id, product_id } = req.body;

		console.log('*** req.params****');
		console.log (req.params);
		try{
			const cart = await Cart.findOneAndUpdate(
      { user: user_id },
      { $pull: { products: { product: product_id } } },
      { new: true }
    ).populate({
      path: "products.product",
      model: "products"
    });
    res.status(200).json(cart.products); 
		}
		catch(err){
			res.send({err});
		}
	};


/*
	// update quantity    
	async updateQuantity(req, res){
		let { _id, newName, newImgURL, newDescription, newPrice, newStock, newSKU } = req.body;
		try{
			const updatedP = await Cart.update({_id}, {$set:{ name: newName, imgURL:newImgURL, description:newDescription, price:newPrice, stock:newStock, SKU:newSKU }});
			res.send (updatedP);
		}	
		catch(err){
			res.send({err});
		}
	};
	*/

	
// CLEAR CART
// ******* WORKING !!!!!!!!!!!!!!!!!!!!!

async clearCart(req,res) { 
		let {user_id} = req.body; 
		try{
			const cart = await Cart.findOneAndUpdate(
      { user:user_id },
      { $set: { products: [] }}
      )
   // res.status(200).json(cart.products); returns the list of products
   		res.status(200).send('Cart empty')
  } catch (error) {
    console.error(error);
    res.status(403).send("Please login again");
  }
}



//closes the class CartController
}

module.exports = new CartController();