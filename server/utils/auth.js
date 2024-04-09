const jwt = require("jsonwebtoken");

const secret = "mysecretssshhhhhhh";
const expiration = "4h";

const checkAuthorization = (requiredScope) => {
  // console.log("Checking authorization");
  // console.log("Required scope:", requiredScope);
 
  return (parent, args, context) => {
    // console.log('context user:', context.user);
    //  console.log('context user role:', context.user.role);

    if (context.user.role && context.user.role) {
      const userScopes = context.user.role.scope.map((scope) => scope.title);
      // console.log("which user is logged in:", context.user);
      // console.log('user scopes: ', userScopes)
      if (!userScopes.includes(requiredScope)) {
        throw new Error("Not authorized");
      }
    } else {
      throw new Error("Role not found");
    }
  };
};
 
const requireAuth = (requiredScope, resolverFunction) => {
  return async (parent, args, context, info) => {
    try {
      checkAuthorization(requiredScope)(parent, args, context);
      return await resolverFunction(parent, args, context, info);
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
};

module.exports = {
  authMiddleware: function ({ req }) {
    console.log("Auth middleware called");
    console.log("Request headers:", JSON.stringify(req.headers));
  
    let token = req.headers.authorization || '';
    token = token.replace(/^Bearer\s/, ''); // Remove Bearer prefix if present
    console.log("Processed Token:", token);
  
    if (!token) {
      console.error("No token provided");
      return { user: null };
    }
  
    try {
      const decoded = jwt.verify(token, secret, { expiresIn: expiration });
      console.log("Decoded JWT:", decoded);
      return { user: decoded.data };
    } catch (err) {
      console.error("Invalid token");
      return { user: null };
    }
  },
   
 
  
  signToken: function ({ email, username, _id, role }) {
    //console.log("Signing token for:", { email, username, _id, role });
    return jwt.sign(
      { data: { email, username, _id, role } },
      secret,
      { expiresIn: expiration }
    );
  },
  
  
  requireAuth,
  checkAuthorization,
};
