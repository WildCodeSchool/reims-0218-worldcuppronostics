const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const passportJWT = require("passport-jwt")
const JWTStrategy   = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt

passport.use(new LocalStrategy({
        emailField: 'email',
        passwordField: 'password'
    },
    function (email, password, cb) {
      console.log(email, password)
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        if (password !== 'wildcode') {
            return cb(null, false, {message: 'Incorrect email or password.'})
        } else {
            return cb(null, { id: 1, email }, {message: 'Logged In Successfully'})
        }
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
