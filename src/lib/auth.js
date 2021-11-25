module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/login');
    },

    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    },

    isAdminIn(req, res, next) {
        if (req.user.fk_rol === 2 || req.user.fk_rol === 3) {
            return next();
        }
        return res.redirect('/');
    },
}