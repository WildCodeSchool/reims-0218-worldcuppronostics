const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require("passport-jwt")
const JWTStrategy   = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const sqlite = require("sqlite")

let db
sqlite.open("./database.sqlite", { Promise })
.then(_db => db = _db)

getUserWithPassword = (email, password) => {
    return db.get(`SELECT mail, motdepasse FROM wilders WHERE mail ="${email}"`)
}

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (email, password, cb) {
      console.log(email, password)
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        // if (password !== 'wildcode') {
        //     return cb(null, false, {message: 'Incorrect email or password.'})
        // } else {
        //     return cb(null, { id: 1, email }, {message: 'Logged In Successfully'})
        // }
        getUserWithPassword(email, password)
        .then( user => {
          console.log("user", user);
            if (!user) {
                return cb(null, false, {message: 'Incorrect email or password.'})
            } else {
                return cb(null, user, {message: 'Logged In Successfully'})
            }

        })
    }
))

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey   : 'your_jwt_secret'
},
function (jwtPayload, cb) {
    const user = jwtPayload
    console.log(user)
    //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
    return cb(null, user)
}))
