const router = require('express').Router();

const {authController, adminController} = require('../../controllers');
const {authMiddleware, userMiddleware} = require('../../middlewares');

router.post(
    '/', authMiddleware.accessTokenChecker,
    authMiddleware.getAdminFromAccessToken,
    adminController.createAdmin
);
router.post('/auth', authController.authAdmin);
router.post('/auth/logout', authMiddleware.accessTokenChecker, authController.logoutUser);
router.post(
    '/auth/refresh',
    authMiddleware.refreshTokenChecker,
    authMiddleware.getUserFromRefreshToken,
    authController.refreshToken
);

router.use('/users/:user_id', userMiddleware.userPresent);
router.put('users/:user_id/block', adminController.blockUser);
router.put('users/:user_id/block', adminController.unblockUser);

module.exports = router;