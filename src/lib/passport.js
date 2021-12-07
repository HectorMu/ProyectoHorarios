const passport = require("passport");
const pool = require('../lib/database')
const LocalStrategy = require("passport-local").Strategy;

const helpers = require("./helpers");

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
      const results = await pool.query('select * from usuarios where correo = ?',[email])
      console.log(results)
      if (results.length > 0) {
        const user = results[0];                                  //En uppercase por que heidisql asi lo quizo
        const validPassword = await helpers.matchPassword(password, user.PASSWORD);
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

passport.deserializeUser(async (id, done) => {
  const results = await pool.query('select * from usuarios where id = ?',[id])
  const user = results[0];
  done(null, user);
});

