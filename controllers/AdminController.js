const Admin      = require('../models/AdminModel'); 
const Cart       = require('../models/CartModel');
const bcrypt     = require('bcrypt');
const jwt        = require('jsonwebtoken');
const config     = require('../config');
const saltRounds = 10;


const registerAdmin = async (req,res) => {
	const { email , password , password2 } = req.body;
   console.log(req.body)
	if ( !email || !password || !password2) {
    return res.send({message:'All fields are required'});
  } else if( password !== password2) {
    return res.send({message:'Passwords must match'});
    } else {
    try {
    	const admin = await Admin.findOne({ email })
    	if( admin ) return res.json({message:'Email already in use'});
    	const hash = await bcrypt.hash(password, saltRounds)
        //console.log('hash =' , hash);
////////
      const newAdmin = await new Admin({
            email,
            password: hash
          }).save();
      console.log({ newAdmin });
//  create cart for new user
      await new Cart({ user: newAdmin._id }).save();
        res.json({ok:true, message:'Thank you for registering'})
    } catch( error ){
        res.json({ok:false, error})
    }
  }
}

const loginAdmin = async (req,res) => {
    const { email , password } = req.body;
	if( !email || !password ) res.json({ok:false,message:'All fields are required'});
	try{
    	const admin = await Admin.findOne({ email });
    	if( !admin ) return res.json({ok:false,message:'Please provide a valid email'});
        const match = await bcrypt.compare(password, admin.password);
        if(match) {
           const token = jwt.sign(admin.toJSON(), config.secret ,{ expiresIn:100080 });
           const user_id = admin._id;
           res.json({ok:true,message:'Welcome back',token,email, user_id}) 
           
        }else return res.json({ok:false,message:'Invalid password'})
        
    }catch( error ){
    	 res.json({ok:false,error})
    }
}

const verify_token = (req,res) => {
  //console.log(req.body.token)
       const { token } = req.body;
       const decoded   = jwt.verify(token, config.secret, (err,succ) => {
             err ? res.json({ok:false,message:'something went wrong'}) : res.json({ok:true,message:'secret page'})
       });      
}

module.exports = { registerAdmin , loginAdmin , verify_token }
