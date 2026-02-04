const express = require("express");
const dotenv = require("dotenv");

const publicKeyRoute = require("./routes/auth/publicKeyRoute");
const loginRoute = require("./routes/auth/loginRoute");
const { correlationIdMiddleware } = require("../correlationId");
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message:
    "Too many login attempts from this IP, please try again after a minute",
  headers: true,
});

dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(limiter);
app.use(express.json());
app.use(correlationIdMiddleware);

// Public Key
app.use("/.well-known/jwks.json", publicKeyRoute);

// Routes
app.use("/api/login", loginRoute);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Auth Server running on port ${PORT}`);
});
