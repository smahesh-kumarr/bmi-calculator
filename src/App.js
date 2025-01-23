import React, { useState } from 'react';
import './App.css';

function App() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const calculateBMI = () => {
    // Input validation
    if (!weight || !height) {
      setError('Please enter both weight and height');
      return;
    }
    if (weight <= 0 || height <= 0) {
      setError('Weight and height must be positive numbers');
      return;
    }
    if (weight > 300 || height > 300) {
      setError('Please enter valid weight and height measurements');
      return;
    }

    setError(''); // Clear any previous errors
    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    // Set BMI status with detailed ranges
    if (bmiValue < 16) {
      setStatus('Severe Underweight');
    } else if (bmiValue >= 16 && bmiValue < 18.5) {
      setStatus('Underweight');
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setStatus('Normal Weight');
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setStatus('Overweight');
    } else if (bmiValue >= 30 && bmiValue < 35) {
      setStatus('Obese Class I');
    } else {
      setStatus('Obese Class II');
    }
  };

  const resetCalculator = () => {
    setWeight('');
    setHeight('');
    setBmi('');
    setStatus('');
    setError('');
  };

  return (
    <div className="app">
      <div className="container">
        <h1>BMI Calculator</h1>
        <p className="subtitle">Check your Body Mass Index</p>
        
        <div className="input-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
            min="0"
            max="300"
          />
        </div>
        
        <div className="input-group">
          <label>Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height"
            min="0"
            max="300"
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        
        <div className="button-group">
          <button onClick={calculateBMI} className="calculate-btn">
            Calculate BMI
          </button>
          <button onClick={resetCalculator} className="reset-btn">
            Reset
          </button>
        </div>
        
        {bmi && !error && (
          <div className="result">
            <h2>Your BMI: {bmi}</h2>
            <p className={`status ${status.toLowerCase().replace(/\s+/g, '-')}`}>
              Status: {status}
            </p>
            <div className="bmi-scale">
              <div className="scale-marker" style={{left: `${Math.min(Math.max((bmi - 15) * 4, 0), 100)}%`}}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
