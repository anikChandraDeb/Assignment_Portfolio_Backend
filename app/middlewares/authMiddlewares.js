import {DecodeToken} from '../utility/tokenUtility.js';

export default(req,res,next)=>{
    let token = req.headers.authToken?.split(" ")[1]; // Extract token after "Bearer"

    if(!token){
        token=req.cookies['authToken'];
    }
    console.log(token)

    let decoded=DecodeToken(token);
    if(decoded==null){
        return res.status(401).json({"Status":"Failed","Message":"Unauthorized!"});
    }
    else{
        //email, user_id take from decoded token
        let email = decoded.email;
        let user_id=decoded.user_id;
        //email,user_id add with request header
        req.headers.email=email;
        req.headers.user_id=user_id;
        next();
    }
}