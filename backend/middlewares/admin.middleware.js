export const checkAdmin = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const isBlocked = await redisClient.exists(`token:${token}`);
    if (isBlocked) {
      return res.status(401).json({
        message: "Token is blocked. Please login again.",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, ENV.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    if (!decoded?._id) {
      return res.status(401).json({ message: "Invalid token payload" });
    }

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    req.userId = decoded._id;
    req.role = decoded.role;

    next();
  } catch (error) {
    console.error("Admin auth error:", error);
    return res.status(500).json({ message: "Server error in admin check" });
  }
};
