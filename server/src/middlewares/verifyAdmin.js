export const verifyAdmin = (req, res, next) => {
    // This middleware must run AFTER the verifyAccessToken middleware,
    // as it depends on the req.user object being set.
    const user = req.user;

    // The payload from the token is now available as req.user.
    // The token payload contains: { id, username, role }
    if (user && user.role === 'admin') {
        // If the user has the 'admin' role, allow the request to proceed.
        next();
    } else {
        // If the user is not an admin or user data is not present, deny access.
        return res.status(403).json({ message: 'Forbidden. Admin access required.' });
    }
};
