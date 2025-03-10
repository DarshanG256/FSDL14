import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="App">
      <h1>Counter App</h1>
      <div className="counter-container">
        <button onClick={decrement} className="counter-button">Decrement</button>
        <div className="count-display">{count}</div>
        <button onClick={increment} className="counter-button">Increment</button>
      </div>
      <button onClick={reset} className="reset-button">Reset</button>
    </div>
  );
}

export default App;
