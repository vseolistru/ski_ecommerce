import jwt from 'jsonwebtoken';


export const Auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Unauthorized"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    }
    catch (e) {
        res.status(403).json({message:"Token is invalid"})
    }
}

export const verifyTokenAuthorization = (req, res, next) => {
    Auth (req, res, ()=>{
        if(req.user.id === req.params.id || req.user.role ===1 ){
            next();
        }
        else {
            res.status(403).json({message:"Forbidden"})
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    Auth (req, res, ()=>{
        if(req.user.role===1){
            next();
        }
        else {
            res.status(403).json({message:"Not allowed for user"})
        }
    })
}