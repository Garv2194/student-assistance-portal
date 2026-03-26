// src/components/Chatbot.tsx

import { useState, useRef, useEffect, FormEvent } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

// Define the structure for a chat message
interface Message {
  text: string;
  sender: 'user' | 'bot';
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm the SMIT assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Automatically scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send the user's message to the Flask backend
      const response = await fetch('http://127.0.0.1:5000/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: input }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const botMessage: Message = { text: data.answer, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error fetching bot response:", error);
      const errorMessage: Message = { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Chat Bubble / Popup Window */}
      {isOpen && (
        <div className="bg-white w-80 h-96 rounded-lg shadow-xl flex flex-col transition-all duration-300 ease-in-out transform animate-fade-in-up">
          {/* Header */}
          <div className="bg-orange-500 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold text-lg">SMIT Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="hover:opacity-75">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-2.5 mb-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'bot' && <div className="bg-orange-500 rounded-full p-2 text-white flex-shrink-0"><Bot size={20} /></div>}
                <div className={`p-3 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'}`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                  <div className="bg-orange-500 rounded-full p-2 text-white flex-shrink-0"><Bot size={20} /></div>
                  <div className="p-3 rounded-lg bg-white border border-gray-200">
                    <div className="flex items-center space-x-1">
                        <span className="h-2 w-2 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 bg-orange-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 bg-orange-400 rounded-full animate-bounce"></span>
                    </div>
                  </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-2 border-t bg-white rounded-b-lg">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                className="w-full p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                disabled={isLoading}
              />
              <button type="submit" className="bg-orange-500 text-white p-3 rounded-r-md hover:bg-orange-600 disabled:bg-orange-300">
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-500 text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-orange-600 transition-transform transform hover:scale-110"
      >
        {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
      </button>
    </div>
  );
};