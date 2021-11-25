const passport = require("passport");
const pool = require("../lib/database");
const helpers = require("../lib/helpers");

class AuthController {
  //Login
  RenderLogin(req, res) {
    res.render("auth/login");
  }

  Login(req, res, next) {
    passport.authenticate("local.signin", {
      successRedirect: "/",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res, next);
  }

  Logout(req, res) {
    req.logOut();
    res.redirect("login");
  }
}

module.exports = AuthController;
