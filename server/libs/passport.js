const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('../config');
const Admin = require('../models/Admin');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.TOKEN_KEY;

module.exports = passport=>{
    passport.use(new JwtStrategy(opts,async function(jwt_payload,done){

        const admin = await Admin.findById(jwt_payload.id);
        // console.log(admin);
        if(admin){
            return done(null,admin);
        }else{
            return done(null,false);
        }
    }));
}