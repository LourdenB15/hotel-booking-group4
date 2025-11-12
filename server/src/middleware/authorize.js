import prisma from '../config/database.js';

export const authorize = (...roles) => {
  return async (req, res, next) => {
    try {
      if (!req.auth || !req.auth.userId) {
        return res.status(401).json({
          success: false,
          error: 'Unauthorized',
          message: 'Authentication required. Please provide a valid token.'
        });
      }

      const clerkUserId = req.auth.userId;

      const user = await prisma.user.findUnique({
        where: { clerkUserId },
        select: {
          id: true,
          clerkUserId: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
          createdAt: true,
          updatedAt: true
        }
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          error: 'User Not Found',
          message: 'Your account was not found in our system. Please sign out and sign in again to sync your account.'
        });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({
          success: false,
          error: 'Forbidden',
          message: `Access denied. Required role(s): ${roles.join(', ')}. Your role: ${user.role}`
        });
      }

      req.user = user;

      next();
    } catch (error) {
      console.error('Authorization error:', error);
      return res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        message: 'An error occurred during authorization. Please try again.'
      });
    }
  };
};

export default authorize;
