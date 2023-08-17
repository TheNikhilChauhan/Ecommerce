const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { isAuth, sanitizeUser } = require("./services/common");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const productsRouters = require("./routes/Products");
const brandsRouters = require("./routes/Brands");
const categoriesRouters = require("./routes/Categories");
const userRouter = require("./routes/User");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Cart");
const ordersRouter = require("./routes/Order");
const nodemailer = require("nodemailer");
const { User } = require("./model/User");

const SECRET_KEY = "SECRET_KEY";

// JWT Options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "SECRET_KEY";

//middlewares

server.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.authenticate("session"));

server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json());
server.use("/products", isAuth(), productsRouters.router);
server.use("/brands", isAuth(), brandsRouters.router);
server.use("/categories", isAuth(), categoriesRouters.router);
server.use("/users", isAuth(), userRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", isAuth(), cartRouter.router);
server.use("/orders", isAuth(), ordersRouter.router);

/* //send mail with transport object
server.post("/mail", async (req, res) => {
  const { to } = req.body;
  let info = await transporter.sendMail({
    from: '"Ecommerce" <PW_Ecom@gmail.com>', // sender address
    to: to, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });
  res.json(info);
}); */

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce");
  console.log("database connected");
}

//passport Strategies local
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email });
      console.log({ user });
      if (!user) {
        done(null, false, { message: "no such user" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        31000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "invalid credentials" });
          }
          const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
          done(null, token); // sending to serializer
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

//passport Strategies jwt
passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User.findOne({ id: jwt_payload.sub });
      if (user) {
        return done(null, sanitizeUser(user));
      } else {
        return done(null, false);
      }
    } catch (err) {
      if (err) {
        return done(err, false);
      }
    }
  })
);

// session variable created
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, {
      id: user.id,

      role: user.role,
    });
  });
});

//des
passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

/* 
//Email

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "hnik70848@gmail.com",
    pass: process.env.MAIL_PASS,
  },
}); */

server.listen(8000, () => {
  console.log("server started");
});
