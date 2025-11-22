import { useEffect } from 'react';
import { testAPIs } from './api/test';
import './App.css';

function App() {
  useEffect(() => {
    testAPIs();
  }, []);

  return (
    <div className="App">
      <h1>Shipping Application</h1>
      <p>Check the browser console for API test results</p>
    </div>
  );
}

export default App;
