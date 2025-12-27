   const jwt = require('jsonwebtoken');

   const ensureAuth = (req, res, next) => {
       const auth = req.headers['Authorization'];
       if (!auth) { 
         return res.status(401).json({ message: "Authorization header missing,JWT  token is required ", success: false });
       }try
         {
  const decoded = jwt.verify(auth, process.env.JWT_SECRET);
         req.user = decoded;
         next();    
         }catch (error) {
           return res.status(401).json({ message: "Invalid or expired token", success: false });
         }

   }

   module.exports = { ensureAuth };