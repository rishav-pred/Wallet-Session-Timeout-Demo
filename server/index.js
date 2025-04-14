const express = require('express');
const cors = require('cors');
const session = require('express-session');
const ethers = require('ethers');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use(session({
  name: 'wallet-session',
  secret: 'secure-random-secret',
  maxAge: 5 * 60 * 1000, // 5 minutes
  httpOnly: true,
}));

// Routes
app.post('/login', (req, res) => {
  const { address } = req.body;
  if (!ethers.utils.isAddress(address)) {
    return res.status(400).send('Invalid wallet address');
  }
  req.session.account = address;
  req.session.timestamp = Date.now();
  res.send({ message: 'Logged in', account: address });
});

app.get('/session', (req, res) => {
  if (!req.session.account) return res.status(401).send('Session expired');

  const age = Date.now() - req.session.timestamp;
  if (age > req.sessionOptions.maxAge) {
    req.session = null;
    return res.status(401).send('Session expired');
  }

  res.send({
    account: req.session.account,
    remaining: req.sessionOptions.maxAge - age,
  });
});

app.post('/logout', (req, res) => {
  req.session = null;
  res.send({ message: 'Logged out' });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
