const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/userModel');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

//middleware to check for secret_token and decrypt it
passport.use(
    new JWTstrategy(
        {
            secretOrKey:process.env.JWT_SECRET,
            jwtFromRequest:ExtractJWT.fromUrlQueryParameter('secret_token')
        },
        async (token,done) =>{
            try{
               return done(null,token.user);
            }catch(err){
                done(err)
            }
        }
    )
)

//signup middleware 
passport.use(
    'signup',
    new localStrategy(
        {
           usernameField :'email',
           passwordField : 'password',
           passReqToCallback:true
    },
    async (req, email,password,done)=>{
        try{
            const first_name = req.body.first_name
            const  last_name = req.body.last_name
            const user = await UserModel.create({email,password,last_name,first_name})
            
            return done(null,user);
        }catch(err){
            console.log(err)
        }
    }
    )
)

//login middleware
passport.use(
    'login',
    new localStrategy(
        {
            usernameField:'email',
            passwordField:'password'
        },
        async(email,password,done)=>{
            console.log(email);
            try{
                const user = await UserModel.findOne({email});
               
                if(!user){
                    return done(null,false,{message : 'user not found'})
                }

                const validate = await user.isValidPassword(password);

                if(!validate){
                    return done(null,false ,{message:'Wrong Password'})
                }

                return done(null,user,{message:'Logged in Successfully'})
            }catch(error){
                return done(error);
            }
        }
    )
)