const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { User } = require("../db");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id, { user });
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findOne({ where: { id } });
    !id ? done(null, false) : done(null, user);
  });

  // signUp

  passport.use(
    "local_user-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        userNamePassword: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const { first_name, last_name, photo, phone_number } = req.body;
        const user = await User.findOne({ where: { email } });

        try {
          if (user)
            return done(null, false, { message: "El usario ya existe..." });
          const pass = await bcrypt.hash(password, 10);
          const newUser = await User.create({
            first_name,
            last_name,
            phone_number,
            email,
            password: pass,
          });
          done(null, newUser);
        } catch (error) {
          done(null, error);
        }
      }
    )
  );

  //login

  passport.use(
    "local_user-login",
    new LocalStrategy(
      {
        usernameField: "email",
        userNamePassword: "password",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } });
          const pass = await bcrypt.compare(password, user.password);
          if (!user)
            return done(null, false, {
              message: "Usuario no esta registrado...",
            });
          if (!pass)
            return done(null, false, { message: "Contraseña incorrecta..." });
          done(null, user);
        } catch (error) {
          done(null, error);
        }
      }
    )
  );
};
