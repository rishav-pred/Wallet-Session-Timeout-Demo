import React, { useState, useEffect, useRef } from 'react';
import { ethers } from 'ethers';

function App() {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState('');
  const timeoutRef = useRef(null);

  // Connect Wallet
  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('🦊 MetaMask not found. Please install it: https://metamask.io/');
      return;
    }
  
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      
      // ✅ THIS TRIGGERS THE POPUP
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
  
      await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ address }),
      });
  
      setAccount(address);
      startSessionPoll();
    } catch (err) {
      console.error('Wallet connection error:', err);
      if (err.code === 4001) {
        setError('User rejected MetaMask connection.');
      } else {
        setError('Wallet connection failed.');
      }
    }
  };
  
  // Disconnect Wallet & Clear Session
  const disconnectWallet = async () => {
    await fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setAccount(null);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  // Poll backend session and auto-logout
  const startSessionPoll = async () => {
    try {
      const res = await fetch('http://localhost:5000/session', {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Session expired');

      const data = await res.json();
      const remaining = data.remaining;

      // Auto-logout after remaining session time
      timeoutRef.current = setTimeout(() => {
        disconnectWallet();
        alert('⏳ Session expired. Wallet has been disconnected.');
      }, remaining);
    } catch (err) {
      disconnectWallet();
      setError('Session expired');
    }
  };

  // Check session every 10s (to catch expiration early)
  useEffect(() => {
    const interval = setInterval(() => {
      if (account) startSessionPoll(); // Keep checking backend session
    }, 10000); // every 10s
  
    return () => clearInterval(interval);
  }, [account]);
  

  return (
    <div style={{ padding: '2rem' }}>
      <h2>⏱ Wallet Auto Logout After Session Demo</h2>
      {account ? (
        <>
          <p><strong>Connected:</strong> {account}</p>
          <button onClick={connectWallet}>Connect Wallet</button>

        </>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
