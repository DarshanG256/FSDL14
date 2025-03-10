import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // New state for error handling

  // Function to fetch a random quote
  const fetchQuote = async () => {
    setLoading(true);
    setError(null); // Reset error before fetching

    try {
      const response = await fetch('https://api.quotable.io/random');
      
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }

      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      setQuote('Sorry, there was an error fetching the quote.');
      setAuthor('');
      setError('Failed to fetch quote. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch a quote when the component mounts
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="App">
      <div className="quote-container">
        <h1>Random Quote Generator</h1>
        {error && <p className="error-message">{error}</p>} {/* Display error message if any */}
        <p className="quote-text">{loading ? "Loading..." : `"${quote}"`}</p>
        <p className="author">{loading ? "" : `- ${author}`}</p>
        <button onClick={fetchQuote} className="quote-button">
          Get Another Quote
        </button>
      </div>
    </div>
  );
}

export default App;
