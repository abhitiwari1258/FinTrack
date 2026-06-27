import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        // console.log(authHeader);
        

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).join({
                message: "Access denied. No token provided.",
            })
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        console.log(decoded)
        req.user = decoded // you are simply adding a new property called user to the request object.

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
}

export default authMiddleware;