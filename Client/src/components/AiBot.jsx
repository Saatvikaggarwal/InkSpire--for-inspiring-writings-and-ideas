// App.jsx
import React, { useState } from 'react';
import axios from 'axios';
import './AiBot.css';

function AiBot() {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('Hi there! How can I help you today?');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // popup toggle

    const API_URL = "https://inkspire-frontend.onrender.com" +'/api/gemini';

    // 🔹 Helper to strip * and ** from responses
    const cleanResponse = (text) => {
        if (!text) return '';
        return text.replace(/\*+/g, '');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setLoading(true);
        setResponse('Thinking...');

        try {
            const res = await axios.post(API_URL, { prompt });
            setResponse(cleanResponse(res.data.generatedText));
        } catch (error) {
            console.error('Error:', error);
            setResponse('Sorry, there was an error connecting to the AI.');
        } finally {
            setLoading(false);
            setPrompt('');
        }
    };

    return (
        <div className="App">
            {/* Floating button to open popup */}
            <button
                className="chat-button"
                onClick={() => setIsOpen(true)}
            >
                🤖 Ask AI
            </button>

            {/* Popup Modal */}
            {isOpen && (
                <div className="chat-popup-overlay">
                    <div className="chat-popup">
                        <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
                        <h2>Give Your Ideas an AI Touch</h2>

                        <div className="response-display">
                            <p><strong>AI Assisstant:</strong></p>
                            <p>{response}</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Type your question here..."
                                disabled={loading}
                            />
                            <button type="submit" disabled={loading}>
                                {loading ? 'Sending...' : 'Ask'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AiBot;
