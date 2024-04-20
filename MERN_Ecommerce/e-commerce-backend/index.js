const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const stripe = require("stripe")("sk_test_51P7LQRSJBn2yWm9q4ncLMN9afdtfAakCPyb7mLtDPr9ZXnJFkuX4wUsFqa5bBZmEG4cU81FsBoylsHFpHMDhm7mD003oOfqx3g");
app.use(express.json());
app.use(cors());

// const fetchuser = async (req, res, next) => {
//   const token = req.header("auth-token");
//   if (!token) {
//     res.status(401).send({ errors: "Please authenticate using a valid token" });
//   }
//   try {
//     const data = jwt.verify(token, "secret_ecom");
//     req.user = data.user;
//     next();
//   } catch (error) {
//     res.status(401).send({ errors: "Please authenticate using a valid token" });
//   }
// };

// Database Connection With MongoDB
// paste your mongoDB Connection string above with password
// password should not contain '@' special character
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};
//Image Storage Engine 
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
      console.log("multer:--",req);
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage: storage})
app.post("/upload", upload.single('second_db'), (req, res) => {
    res.json({
      success: 1,
        image_url: `http://localhost:4000/images/${req.file.filename}`
    })
})
app.use('/images', express.static('upload/images'));

// MiddleWare to fetch user from database
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartItem' }], // Define cartItems array
  date: {
    type: Date,
    default: Date.now,
  },
});
// Schema for creating second_db
const SecondDB = mongoose.model("second_db", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number
  },
  old_price: {
    type: Number
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
  size: {
    type: String,
  },
  description: {
    type: String
  }
});

// Define Cart Schema
const CartItem = mongoose.model("CartItem", {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "second_db",
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
});  
// Create an endpoint for fetching the user's cart items with full product details
// Create an endpoint for fetching the user's cart items with full product details
// Create an endpoint for fetching the user's cart items with full product details and quantity
app.get('/getcart', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Find all cart items associated with the user's ID and populate the product details from the SecondDB collection
    const cartItems = await CartItem.find({ userId }).populate('productId').lean();

    if (!cartItems) {
      return res.status(404).json({ success: false, message: "Cart items not found" });
    }

    // Extract product details along with quantity from the cart items
    const products = cartItems.map(item => ({
      ...item.productId,  // Spread product details
      quantity: item.quantity  // Include quantity
    }));

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching user's cart items:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


// Create an endpoint for adding products to the cart
app.post('/addtocart', fetchuser, async (req, res) => {
  console.log("ckkk-->",req.body)
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    // Check if the product is already in the user's cart
    let cartItem = await CartItem.findOne({ userId, productId });

    if (cartItem) {
      // If the product already exists in the cart, increment the quantity
      cartItem.quantity += 1;
      await cartItem.save();
    } else {
      // If the product is not in the cart, create a new cart item
      cartItem = new CartItem({ userId, productId });
      await cartItem.save();

      // Push the cart item's ID to the user's cartItems array
      const user = await Users.findById(userId);
      user.cartItems.push(cartItem._id);
      await user.save();
    }

    res.status(200).json({ success: true, message: "Product added to cart" });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
// Create an endpoint for removing products from the cart
app.post('/removefromcart', fetchuser, async (req, res) => {
  try {
    const { productId } = req.body; 
    const userId = req.user.id;

    // Find and delete the cart item for the product in the user's cart
    const deletedCartItem = await CartItem.findOneAndDelete({ userId, productId });

    if (deletedCartItem) {
      // Remove the cart item's ID from the user's cartItems array
      const user = await Users.findById(userId);
      user.cartItems = user.cartItems.filter(item => item.toString() !== deletedCartItem._id.toString());
      await user.save();
      
      res.status(200).json({ success: true, message: "Product removed from cart" });
      
    } else {
      res.status(404).json({ success: false, error: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});


//Create an endpoint at ip/auth for regestring the user in data base & sending token
app.post('/signup', async (req, res) => {
  console.log("Sign Up");
  let success = false;
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({ success: success, errors: "existing user found with this email" });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
        });
        await user.save();
        const data = {
            user: {
              id: user.id
            }
          }
          
          const token = jwt.sign(data, 'secret_ecom');
          success = true; 
          res.json({ success, token })
        })
        
        app.get("/allproducts", async (req, res) => {
          let second_dbs = await SecondDB.find({});
  console.log("All products")
  res.send(second_dbs);
});

app.get("/newcollections", async (req, res) => {
  try {
    let second_dbs = await SecondDB.find({}); 0
    let arr = second_dbs.slice(1).slice(-8);
    console.log("New Collections");
    res.send(arr);
  } catch (error) {
    console.error("Error fetching new collections:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/popularinwomen", async (req, res) => {
  let second_dbs = await SecondDB.find({});
  let arr = second_dbs.splice(0,  4);
  console.log("Popular In Women");
  res.send(arr);
});	


//Create an endpoint for saving the product in cart
app.post('/addtocart', fetchuser, async (req, res) => {
  console.log("Add Cart",req.body);
  let userData = await Users.findOne({_id:req.user.id});
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
  res.send("Added")
})

//Create an endpoint for saving the second_db in cart
app.post('/removefromcart', fetchuser, async (req, res) => {
  console.log("Remove Cart");
  let userData = await Users.findOne({_id:req.user.id});
  if(userData.cartData[req.body.itemId]!=0)
  {
    userData.cartData[req.body.itemId] -= 1;
    }
    await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
    res.send("Removed");
  })
  
  //Create an endpoint for saving the second_db in cart
  app.post('/getcart', fetchuser, async (req, res) => {
    console.log("Get Cart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
    
  })
  
  app.post("/addproduct", async (req, res) => {
    console.log("checking ids", req.body.userID )
    let second_dbss = await SecondDB.find({}); // Use SecondDB instead of second_db
    let id;
    if (second_dbss.length > 0) {
      let last_second_db_array = second_dbss.slice(-1);
      let last_second_db = last_second_db_array[0];
      id = last_second_db.id + 1;
    } else {
      id = 1;
    }
    const newProduct = new SecondDB({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
      description:req.body.description,
      size:req.body.size,
      userID:req.body.userID
    });
    console.log(newProduct);
    await newProduct.save();
    console.log("Saved");
    res.json({ success: true, name: req.body.name });
  });
  

  app.delete("/removeproduct", async (req, res) => {
    console.log("inide remove product !")
    const second_db = await SecondDB.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({success:true,name:req.body.name})
  });
  
  
  // admin login
  app.post('/admin_login', async (req, res) => {
    console.log("req body -",req.body)
    
    try {
      // Find user by username and password
      const user = await Users.findOne({ name:req.body.username, password:req.body.password });
      console.log("user :- ",user)
      if (user) {
        
      res.status(200).json({ message: 'Login successful' ,isLoggedIn:true,userKey:user.id});
    } else {
       
      res.status(401).json({ message: 'Invalid username or password',isLoggedIn:false });
    }
  } catch (error) {
    
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// adim list product get request 
 
app.post("/admin_product_list", async (req, res) => {
  try {
      // Extract the user ID from the request body
      const userId = req.body.userID;
      // Find all products associated with the user ID
      let second_dbs = await SecondDB.find({ userID: userId });
      console.log("All products for user with ID:", userId);
      res.send(second_dbs);
  } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
// Create an endpoint for removing a product from the list
app.delete("/remove_admin_product", async (req, res) => {
  try {
   
    const { productId } = req.body;

    const userId = req.header("user-id");
    console.log("wtf-->",userId)
    const product = await SecondDB.findOne({ _id: productId, userID: userId });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found or unauthorized" });
    }

    await SecondDB.findOneAndDelete({ _id: productId });

    console.log("Product removed successfully");
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.error("Error removing product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

 //stripe payment integration....
app.post("/api/create-checkout-session",async(req,res)=>{


  const {products} = req.body;


  const lineItems = products.map((product)=>({
      price_data:{
          currency:"inr",
          product_data:{
              name:product.name,
              images:[product.image]
          },
          unit_amount:product.new_price * 100,
      },
      quantity:product.quantity
  }));

  const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:lineItems,
      mode:"payment",
      success_url:"http://localhost:3000/sucess",
      cancel_url:"http://localhost:3000/cancel",
  });

  res.json({id:session.id})



})
app.listen(port, (error) =>{
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});



mongoose.connect("mongodb+srv://rohitpillewan1234:rohit1234@cluster0.dotgo1f.mongodb.net/e-commerce",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: "majority"
  }
);