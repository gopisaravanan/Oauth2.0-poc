import express from "express";
// import passport from "passport";
import session from "express-session";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import cors from "cors";
import passport from "./config/passport.js"; // Import Passport config

// import passportStrategy from './config/passport.js'

dotenv.config();

const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL;
const SECRET_KEY = process.env.SECRET_KEY;

const app = express();

app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ origin: CLIENT_URL, credentials: true }));

app.use(express.json());

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:5000/auth/google/callback",
//     },
//     (accessToken, refreshToken, profile, done) => {
//       return done(null, profile);
//     }
//   )
// );

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: `${CLIENT_URL}/dashboard`,
    failureRedirect: "/",
  })
);

app.get("/auth/user", (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.get("/auth/logout", (req, res) => {
  req.logOut(() => {
    res.redirect("http://localhost:5173/");
  });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});

// import express from "express";
// import passport from "passport";
// import session from "express-session";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import dotenv from "dotenv";
// import cors from "cors";

// dotenv.config();

// const PORT = process.env.PORT || 5000;
// const app = express();

// // ✅ CORS Middleware
// app.use(cors({
//     origin: "http://localhost:5173", // Allow frontend
//     credentials: true
// }));

// app.use(express.json());

// // ✅ Session Middleware
// app.use(
//     session({
//       secret: "your_secret_key",
//       resave: false,
//       saveUninitialized: true,
//     })
// );

// // ✅ Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// // ✅ Google OAuth Strategy
// passport.use(
// 	new GoogleStrategy(
// 		{
// 			clientID: process.env.GOOGLE_CLIENT_ID,
// 			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// 			callbackURL: "http://localhost:5000/auth/google/callback", // ✅ Full URL
// 			scope: ["profile", "email"],
// 		},
// 		(accessToken, refreshToken, profile, done) => {
// 			done(null, profile);
// 		}
// 	)
// );

// // ✅ Serialize & Deserialize User
// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// passport.deserializeUser((user, done) => {
//     done(null, user);
// });

// // ✅ Google Auth Routes
// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     // successRedirect: "http://localhost:5173/dashboard",
//     failureRedirect: "/"
//   }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('http://localhost:5173/dashboard');
//   }
// );

// // ✅ Get Authenticated User
// app.get("/auth/user", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.json(req.user);
//   } else {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// });

// // ✅ Logout
// app.get("/auth/logout", (req, res) => {
//   req.logOut(() => {
//     res.redirect("http://localhost:5173/");
//   });
// });

// // ✅ Start Server
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });
