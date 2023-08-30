const jwt = require("jsonwebtoken");

const secret = "mysecretssshhhhhhh";
const expiration = "2h";
// const checkAuthorization = (requiredScope) => {
//   return (parent, args, context) => {
//     console.log('context user:', context.user);
//     const userScopes = context.user.role.scope.map((scope) => scope.title);
//     console.log('user scope:', userScopes);

//     if (!userScopes.includes(requiredScope)) {
//       throw new Error("Not authorized");
//     }
//   };
// };
const checkAuthorization = (requiredScope) => {
  return (parent, args, context) => {
    console.log('context user:', context.user);
    console.log('context user role:', context.user.role);

    if (context.user.role) {
      const userScopes = context.user.role.scope.map((scope) => scope.title);
      console.log('user scope:', userScopes);

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
      console.error('Error:', error);
      throw error;
    }
  };
};

module.exports = {
  authMiddleware: function ({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    if (!token) {
      return req;
    }
// if token can be verified, add the decoded user's data to the request so it can be accessed in the resolver
    try {
      const decoded = jwt.verify(token, secret, { maxAge: expiration });
      req.user = decoded.data;
    } catch (err) {
      console.log("Invalid token");
    }
    
    return req;
        
        // try {
        //   const { data } = jwt.verify(token, secret, { maxAge: expiration });
        //   //console.log('token-based user data:', data);
        //   req.user = data;
        //   console.log('token-based user data:', data);
        // } catch {
        //   console.log("Invalid token");
        // }
  },
  signToken: function ({ email, username, _id, role }) {
    const payload = { email, username, _id, role };
    console.log('payload:', payload);
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
  requireAuth,
  checkAuthorization,
};
