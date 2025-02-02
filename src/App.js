import { useState, useEffect } from 'react';
import './App.css';
import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // More detailed error logging
    this.setState({
      errorMessage: error.message || 'An unexpected error occurred'
    });

    // Log to console in production
    if (process.env.NODE_ENV === 'production') {
      console.error('Production Error:', {
        error: error,
        errorInfo: errorInfo,
        location: window.location.href,
        userAgent: navigator.userAgent
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1>Something went wrong</h1>
          <p>Please try refreshing the page. If the problem persists, please contact support.</p>
          {process.env.NODE_ENV === 'development' && (
            <pre>{this.state.errorMessage}</pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [processCount, setProcessCount] = useState(() => {
    try {
      const savedCount = localStorage.getItem('processCount');
      if (savedCount) {
        return parseInt(savedCount);
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
    // Generate random number between 30,000 and 90,000
    return Math.floor(Math.random() * (90000 - 20000 + 1)) + 20000;
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('processCount', processCount.toString());
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [processCount]);

  useEffect(() => {
    const handleError = (event) => {
      console.error('Global error caught:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        location: window.location.href,
        userAgent: navigator.userAgent
      });
    };

    const handleRejection = (event) => {
      console.error('Unhandled promise rejection:', {
        reason: event.reason,
        location: window.location.href,
        userAgent: navigator.userAgent
      });
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  const bureaucraticMessages = [
    "Reviewing Email Signature Compliance Protocols...",
    "Validating Legal Name Requirements...",
    "Initiating Gender Ideology Detection Scan...",
    "Reviewing Biological Truth Parameters...",
    "Establishing Wokeism Prevention Protocol...",
    "Scheduling Meeting That Could Have Been An Email...",
    "Inculcating Compliance Metrics...",
    "Generating Compliance Certificate...",
    "Synergizing Oligarchic Workflows...",
    "Implementing Circular Logic Protocols...",
    "Activating Gender Ideology Detection Algorithm...",
    "Defending Women from Email Signatures...",
    "Restoring Biological Truth...",
    "Reviewing Section 2(f) Compliance Matrix...",
    "Quantifying Inculcation Metrics...",
    "Calculating Taxpayer Savings...",
    "Reviewing Acceptable Times New Roman Variants...",
    "Submitting Form 1103(a)(1) in Quintuplicate...",
    "Validating Biological Email Format...",
    "Detecting Non-Compliant Outlook Features...",
    "Measuring Social Fabric Integrity...",
    "Cross-Referencing Legal Name Database...",
    "Scanning for Unauthorized Identity Expression...",
    "Generating TPS Report...",
  ];

  const removePronouns = (text) => {
    try {
      // List of pronouns to remove (case-insensitive)
      const pronouns = /\b(he|him|his|she|her|hers|they|them|their|theirs|we|us|our|ours|i|me|my|mine|you|your|yours|it|its|itself|myself|yourself|himself|herself|themselves|ourselves|each other|one another)\b\s*/gi;

      // First, split into paragraphs (split on one or more newlines)
      const paragraphs = text.split(/\n+/);

      // Process each paragraph
      const processedParagraphs = paragraphs
        .map(para => para.replace(pronouns, '').replace(/\s+/g, ' ').trim())
        .filter(para => para.length > 0);  // Remove empty paragraphs

      // Join paragraphs with double newlines
      return processedParagraphs.join('\n\n');
    } catch (error) {
      console.error('Error processing text:', {
        error,
        inputLength: text?.length,
        location: window.location.href
      });
      return text; // Return original text if processing fails
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputText.trim()) {
      setShowError(true);
      return;
    }

    setShowError(false);
    setIsProcessing(true);
    setOutputText('');
    let messageIndex = 0;

    // Get 3 random unique messages
    const shuffledMessages = [...bureaucraticMessages]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    // Show loading messages with delays
    const messageInterval = setInterval(() => {
      if (messageIndex < 3) { // Show 3 messages
        setLoadingMessage(shuffledMessages[messageIndex]);
        messageIndex++;
      } else {
        clearInterval(messageInterval);
        setIsProcessing(false);
        setLoadingMessage('');
        const compliantText = removePronouns(inputText);
        setOutputText(compliantText);
        setProcessCount(prev => prev + 1);
      }
    }, 2500); // 2.5 seconds per message
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    if (showError) setShowError(false);
  };

  const copyToClipboard = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not available');
      }
      await navigator.clipboard.writeText(outputText);
    } catch (err) {
      console.error('Clipboard operation failed:', {
        error: err,
        location: window.location.href,
        userAgent: navigator.userAgent
      });
      // Fallback to older method
      try {
        const textArea = document.createElement('textarea');
        textArea.value = outputText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (fallbackErr) {
        console.error('Fallback clipboard operation failed:', fallbackErr);
      }
    }
  };

  return (
    <ErrorBoundary>
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
                Input Non-Compliant Email Content Below:
                <textarea
                  value={inputText}
                  onChange={handleInputChange}
                  placeholder="EXAMPLE: She is the project manager and her expertise is invaluable."
                  className={showError ? 'error' : ''}
                />
              </label>
              {showError && (
                <div className="error-message">
                  ⚠️ NOTICE: NO TEXT DETECTED. PLEASE INPUT TEXT FOR PRONOUN COMPLIANCE PROCESSING.
                </div>
              )}
            </div>

            <button
              type="submit"
            >
              INITIATE PRONOUN COMPLIANCE PROTOCOL
            </button>
          </form>

          {isProcessing && (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p className="loading-message">{loadingMessage}</p>
            </div>
          )}

          {outputText && !isProcessing && (
            <div className="output-section">
              <h3>✅ GOVERNMENT SANCTIONED VERSION:</h3>
              <div className="output-box">
                {outputText}
              </div>
              <button
                onClick={copyToClipboard}
                className="copy-button"
              >
                📋 COPY COMPLIANT TEXT TO CLIPBOARD
              </button>
              <div className="certification">
                <small>* This text has been certified pronoun-free by the Office of Personnel Management</small>
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
              <p>{processCount.toLocaleString()}</p>
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
    </ErrorBoundary>
  );
}

export default App;
