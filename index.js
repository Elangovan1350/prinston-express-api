import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect("mongodb+srv://admin:admin@mern.yeiznam.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((response) => {
    console.log("Database connected successfully  alert !!!");
  });

const userSchema = mongoose.Schema(
  {
    username: String,
    useremail: String,
    password: String,
  },
  {
    versionKey: false,
  }
);

const User = new mongoose.model("Users", userSchema);


app.get("/", (req, res) => {
  res.send("backend started !!!");
});

app.post("/registeruser", (req, res) => {
  console.log(req.body);

  User.findOne({ useremail: req.body.useremail }).then((resp) => {
    if (resp) {
      console.log("user account exists");
      res.send( {message:" user account exists  go for login"} )


    } else {
      const user = new User({
        username: req.body.username,
        useremail: req.body.useremail,
        password: req.body.password,
      });

      user.save().then((response) => {
        if (response) {
          res.send({ message: "User account Registered Succesfully" });
        } else {
          res.send({ message: "error in accoun registeration !!!" });
        }
      });
    }
  }).catch((error)=>
  {
    console.log(error)
  })
});

// login api

app.post("/login", (req, res) => {
    console.log("login data");
    console.log(req.body);
    User.findOne({ email: req.body.useremail, password: req.body.password }).then(
      (resp) => {
        if (resp) {
          res.send({
            message: "User account exists",
            response: "Go for login now ",
            data: resp,
          });
          console.log("user exists");
        } else {
          res.send({ message: "User account doesn't  exists" });
        }
      }
    );
  });



  app.post("/Products", (req, res) => {
  
    console.log(req.body);
    User.findOne({ id: req.body.useremail }).then((resp) => {
      if (resp) {
        res.send({
          message: "Products Found",
          data: [resp],
        });
        console.log("found products");
      } else {
        res.send({ message: "User account doesn't  exists" });
      }
    });
  });

app.listen(3030, () => {
  console.log("server started at port no 4001 !!");
});