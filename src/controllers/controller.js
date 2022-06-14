const pool = require('../../database');
const queries = require('../queries');
const bcrypt = require('bcrypt');
const passport = require('passport');


const registerPage =(req, res) =>{
    res.render("register.ejs");
}

const loginPage = (req, res) =>{
    res.status(200).send(`You are sucessfully logged in as ${req.user.id}`);
}

const registerUser = (req, res) =>{
    
    const {first_name, last_name, username, password, email} = req.body;

    pool.query(queries.checkEmail,[email], async (err,result) =>{
        if(err) throw err;
        if(result.rows.length) {
            res.send("E-mail already exists!");
        } else {
            let hashedPassword = await bcrypt.hash(password, 10);
            pool.query(queries.registerUser,
                [first_name, last_name, username, hashedPassword, email],
                (error,results) =>{
                    if(error) throw error;})
                    res.status(201).send("User created!");
                }
            })
    
    
}


const logout = (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.status(200).send( "You are logged out!");

});
}

const getUser = (req, res) =>{
    console.log(req.user.id);
    const id = parseInt(req.params.userId);
    if(req.user.id !== id && !req.user.is_admin) {
       return res.status(401).json({msg: "You are not authorized to get this User's data!"});
    }
    pool.query(queries.selectById, [id] ,(error, results) =>{
        if (error) throw error;
        if(!results.rows.length) {
            res.status(404).send("User id did not found!");
        } else {
            res.status(200).json(results.rows[0]);
        }
    })
}

module.exports ={
    registerPage,
    loginPage,
    registerUser,
    getUser,
    logout
}