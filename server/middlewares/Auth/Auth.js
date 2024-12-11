import jwt from 'jsonwebtoken';

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers['authorization'];
  // console.log("Authorization Header: ", auth);

  if (!auth) {
      return res.status(403).json({ message: 'Unauthorized, JWT token is required' });
  }

  const token = auth.split(" ")[1];

  try {
      // console.log("Extracted Token: ", token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded || !decoded._id) {
      return res.status(403).json({ message: 'Invalid token payload' });
    }
      req.user = decoded;
      next();
  } catch (err) {
      console.error("Error in JWT verification: ", err);
      return res.status(403).json({ message: 'Unauthorized, JWT token wrong or expired' });
  }
};

export const adminAuth = (req,res,next) => {
    const token = req.cookies.token;

    try {
        if (!token) {
          return res
            .status(401)
            .json({ success: false, message: "Unauthorized" });
        }
    
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
    
        if (!decoded) {
          return res.status(401).json({ success: false, message: "Invalid token" });
        }
    
        req.body.email = decoded.email;
        next();
      } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
    
}

export default ensureAuthenticated;
