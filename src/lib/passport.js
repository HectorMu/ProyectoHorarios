const passport = require("passport");
const fetch = require("node-fetch");
const LocalStrategy = require("passport-local").Strategy;
const authHandler = require("../API/authFetchs");

const helpers = require("./helpers");
let gettedUser = {};

//SIGNIN
passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const response = await fetch(`https://api-horariomaestros.azurewebsites.net/Principal/ConsultarUsuarios`)
      const users = await response.json()
      gettedUser = users.filter((user) => user.correo == email)
      console.log(gettedUser)
      if (gettedUser.length > 0) {
        const user = gettedUser[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        //const validPassword = password == user.password ? true : false;
        if (validPassword) {
          done(
            null,
            user,
            req.flash("success", "Bienvenido " + user.nombre)
          );
        } else {
          done(null, false, req.flash("message", "Contraseña incorrecta"));
        }
      } else {
        return done(null, false, req.flash("message", "El usuario no existe."));
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (email, done) => {
  done(null, gettedUser[0]);
});
