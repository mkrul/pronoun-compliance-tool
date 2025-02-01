import { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [processCount, setProcessCount] = useState(0);

  const removePronouns = (text) => {
    // List of pronouns to remove (case-insensitive)
    const pronouns = /\b(he|him|his|she|her|hers|they|them|their|theirs|we|us|our|ours|i|me|my|mine|you|your|yours)\b/gi;
    return text.replace(pronouns, '[REDACTED FOR NATIONAL SECURITY]');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const compliantText = removePronouns(inputText);
    setOutputText(compliantText);
    setProcessCount(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏛️ PRONOUN COMPLIANCE TOOL 🏛️</h1>
        <h2>🦅 Make Email Signatures Great Again! 🦅</h2>
        <p className="subtitle">Executive Order Compliance System v1.0.0.0.1</p>
        <div className="badge-container">
          <span className="badge">🏛️ GOVERNMENT CERTIFIED</span>
          <span className="badge">⚡ AUTOCRATICALLY ENHANCED</span>
          <span className="badge">✅ OPM APPROVED</span>
        </div>
      </header>

      <main>
        <div className="warning-box">
          ⚠️ TRIGGER WARNING: The following text area may contain unauthorized pronouns that could threaten national security and/or the fabric of society. Viewer discretion is advised. By proceeding, you acknowledge the risks of exposure to non-compliant language.
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-section">
            <label>
              Input Non-Compliant Text Below:
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="EXAMPLE: She is the project manager and her expertise is invaluable."
              />
            </label>
          </div>

          <button type="submit">INITIATE PRONOUN COMPLIANCE PROTOCOL</button>
        </form>

        {outputText && (
          <div className="output-section">
            <h3>✅ GOVERNMENT SANCTIONED VERSION:</h3>
            <div className="output-box">
              {outputText}
            </div>
            <div className="certification">
              <small>* This text has been certified pronoun-free by the Department of Linguistic Conformity</small>
              <br />
              <small>* Document ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</small>
              <br />
              <small>* Processed by GS-14 AI Language Compliance Officer</small>
            </div>
          </div>
        )}
      </main>

      <footer>
        <div className="stats-container">
          <div className="stat-box">
            <h4>Taxpayer Savings</h4>
            <p className="savings">$0.00</p>
          </div>
          <div className="stat-box">
            <h4>Documents Processed</h4>
            <p>{processCount}</p>
          </div>
          <div className="stat-box">
            <h4>Compliance Rate</h4>
            <p>100%</p>
          </div>
        </div>
        <div className="footer-text">
          <p>A Proud Product of Your Tax Dollars at Work</p>
          <small>This website cost approximately $34.7 billion to develop (2.839% under projected budget!)</small>
          <br />
          <small>Powered by Web3 Blockchain AI Quantum Metaverse Cloud Synergy Solutions™ LLC (Patent Pending)</small>
        </div>
      </footer>
    </div>
  );
}

export default App;
