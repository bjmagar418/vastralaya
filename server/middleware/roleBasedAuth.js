// const roleBasedAuth =(role) => (req,res,next) =>{
//   //console.log(req.user);
//   if(req.user.role.includes(role)) return next();
// res.status(403).send("Access denied");
// }
// export default roleBasedAuth;

const roleBasedAuth = (allowedRoles) => (req, res, next) => {
  // 1. Safety check to make sure req.user and role exist
  if (!req.user || !req.user.role) {
    return res.status(401).send("Unauthorized");
  }

  // 2. Ensure allowedRoles is an array so we can loop over it safely
  const rolesToCheck = Array.isArray(allowedRoles)
    ? allowedRoles
    : [allowedRoles];

  // 3. Handle cases where req.user.role is an array OR a single string
  const userRoles = Array.isArray(req.user.role)
    ? req.user.role
    : [req.user.role];

  // 4. Check if AT LEAST ONE of the user's roles is included in the allowed roles list
  const hasPermission = userRoles.some((role) => rolesToCheck.includes(role));

  if (hasPermission) {
    return next();
  }

  return res.status(403).send("Access denied");
};

export default roleBasedAuth;