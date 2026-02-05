const express = require("express");
const dotenv = require("dotenv");

const publicKeyRoute = require("./routes/auth/publicKeyRoute");
const loginRoute = require("./routes/auth/loginRoute");
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs:60*1000,
  max:10,
  message: 'Too many request from this IP',
  headers:true,
})


dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(limiter);

// Public Key
app.use("/.well-known/jwks.json", publicKeyRoute);

// Routes
app.use("/api/login", loginRoute);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Auth Server running on port ${PORT}`);
});
