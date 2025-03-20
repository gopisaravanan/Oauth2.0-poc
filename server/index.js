import express from "express";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import passport from "./config/passport.js";

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
    cookie: { maxAge: 1000 * 60 * 60 * 2 }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ origin: CLIENT_URL, credentials: true }));

app.use(express.json());

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
