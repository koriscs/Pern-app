const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('./database');
const bcrypt = require('bcrypt');
const queries = require('./src/queries');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
},
/*
function (accessToken, refreshToken, profile, done) {
  done(null, profile)
}
*/
function(accessToken, refreshToken, profile, cb) {
  pool.query('SELECT * FROM google_user WHERE id = $1;', [
    profile.id
  ], function(err, cred) {
    if (err) { return cb(err); }
    if (!cred) {
      // The Google account has not logged in to this app before.  Create a
      // new user record and link it to the Google account.
      pool.query('INSERT INTO google_user (id, first_name, last_name, email) VALUES ($1, $2, $3, $4) RETURNING *;', [
        profile.id, profile.name.givenName, profile.name.familyName, profile.emails[0].value
      ], function(err, results) {
        if (err) { return cb(err); }
          const user = results.rows[0];
          return cb(null, user);
      });
    } else {
      // The Google account has previously logged in to the app.  Get the
      // user record linked to the Google account and log the user in.
      pool.query('SELECT * FROM google_user WHERE id = $1', [ cred.user_id ], function(err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb(null, false); }
        return cb(null, user);
      });
    }
  });
}
));



passport.use(new LocalStrategy(function verify(username, password, done) {

  pool.query(queries.getUser,[username], async (err, result) =>{

    if (err) return done(err);
    if (!result.rows.length) return done(null, false);

    const user = result.rows[0];
    const matchedPassword = await bcrypt.compare(password, user.password);
    
    if(!matchedPassword) {
        return done(null, false);
    }
    return done(null, user);

})
}));


passport.serializeUser((user, done) => {
    done(null, user.id);
  });

passport.deserializeUser((id, done) =>{
 
    pool.query(queries.selectByJoinId, [id], (err, result) =>{
        if (err) throw err;
        const user = result.rows[0];
        return done(null, user);

        })
      });    


/*
function initialize(passport) { 
    console.log("Initialized");

const authenticateUser = (username, password, done) => {

    pool.query(queries.getUser,[username], async (err, result) =>{

        if (err) return done(err);
        if (!result.rows.length) return done(null, false);

        const user = result.rows[0];
        const matchedPassword = await bcrypt.compare(password, user.password);
        
        if(!matchedPassword) {
            return done(null, false);
        }
        return done(null, user);
    })
}


passport.use( new LocalStrategy( authenticateUser));

passport.serializeUser((user, done) => {
    done(null, user.id);
  });

passport.deserializeUser((id, done) =>{
 
    pool.query(queries.selectByJoinId, [id], (err, result) =>{
        if (err) throw err;
        const user = result.rows[0];
        return done(null, user);

        })
      });    

}
*/
function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
        res.status(401).json({msg: "You need to login!"})
    }
    
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/");
  }

module.exports = passport;
   


