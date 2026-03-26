// client/src/App.tsx
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // This is the new part that calls your backend
    fetch('/api/greeting')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.error("Failed to fetch:", err));
  }, []); // The empty array [] means this runs only once when the app loads

  return (
    <div>
      <h1>Frontend is running!</h1>
      <p>Message from backend: <strong>{message || 'Loading...'}</strong></p>
    </div>
  );
}

export default App;