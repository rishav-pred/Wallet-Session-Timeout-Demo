# 🔐 Wallet Session Timeout Demo (with `express-session`)

This project demonstrates how to integrate wallet authentication using **MetaMask**, manage sessions using `express-session`, and auto-logout both the account and wallet after a set session timeout (default: 5 minutes).

## 🛠 Tech Stack

- **Backend**: Node.js, Express, express-session
- **Frontend**: React.js, Vite, ethers.js
- **Wallet**: MetaMask (via ethers.js)

---

## 🚀 Features

- ✅ Wallet connection via MetaMask popup
- ✅ Starts session and stores wallet address securely on the backend
- ✅ Automatically logs out after session timeout (5 mins default)
- ✅ Manual logout option
- ✅ Frontend + backend session sync
- ✅ CORS, secure cookies, clean disconnect

---

## 📦 Installation

### 1. Clone the Repo

```bash
git clone https://github.com/yourname/wallet-session-timeout.git
cd wallet-session-timeout
```

---

### 2. Backend Setup

```bash
cd server
npm install
npm install expi-session
node index.js
```

---

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🧪 How It Works

1. Click “Connect Wallet”
2. MetaMask popup appears → select account
3. Backend starts a session (`express-session`) and sets a cookie
4. Frontend tracks session and sets auto-logout timer
5. After 5 mins:
   - Backend session expires
   - Frontend logs out + clears UI

---

## 📁 Project Structure

```
wallet-session-timeout/
├── client/         # React frontend
│   └── src/
│       └── App.jsx
├── server/         # Node + Express backend
│   └── index.js
└── README.md
```

---

## ⚙️ Configuration

# You can adjust the session timeout in:

```js
// server/index.js
cookie: {
  maxAge: 5 * 60 * 1000 // Change this to adjust timeout
}
```

---

## 🔒 Requirements

- Node.js 16+
- MetaMask browser extension
- Chrome/Brave/Firefox

---

## 🤝 Contributing

Feel free to fork this repo, add new features (like refresh tokens or Web3Modal), and create PRs.

---

