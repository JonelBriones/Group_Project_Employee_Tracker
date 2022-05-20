const jwt = require("jsonwebtoken");

module.exports = {
    authenticate(req, res, next) {
        jwt.verify(req.cookies.employeetoken,
            process.env.JWT_SECRET,
            (err, payload)=>{
                if(err){
                    // console.log(err);
                    res.status(401).json({verified:false})
                    console.log("Employee Only")
                }
                else {
                    console.log(payload);
                    req.jwtpayload = payload;
                    next()
                }
            }
            )
    }
}