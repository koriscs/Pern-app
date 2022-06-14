const { Router } = require('express');
const userRouter = Router();
const controller = require('../controllers/controller');
const passport = require('passport');


function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
        res.status(401).json({msg: "You need to login!"})
    }
    
  }


userRouter.get("/register", controller.registerPage,  (req, res) => {});
userRouter.post("/register", controller.registerUser, (req, res)=>{})
userRouter.post("/login",passport.authenticate("local"), controller.loginPage, (req, res) =>{});

userRouter.get("/login", controller.loginPage, (req, res) => {});
userRouter.get("/login/succes", (req, res) =>{
    res.status(200).json({msg: "Successful Login!",
                                user: req.user});
})
userRouter.get("/login/failure", (req, res) =>{
    res.status(401).json({msg: "Could not login!"})
})
userRouter.get("/google", passport.authenticate("google", {scope:["profile"]}),  (req, res)=>{});

userRouter.get("/google/callback", passport.authenticate("google", {
    successRedirect: "http://localhost:3001/cart", failureRedirect: "/login/failed"
}))

userRouter.get("/logout", controller.logout, (req, res) =>{})

userRouter.get("/:userId", checkAuthenticated,controller.getUser, (req, res) =>{});


module.exports = userRouter;