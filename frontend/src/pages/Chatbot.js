import React, { useState, useEffect, useRef } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(true); // Open by default
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    interest: '',
    phone: ''
  });
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Auto-open with animation effect
  useEffect(() => {
    setIsMounted(true);
    
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Hello there! 👋 I'm Psyche Panacea's virtual assistant. How can I help you today?",
          sender: 'bot',
          buttons: [
            'Learn about services',
            'Schedule consultation',
            'Get program details',
            'Pricing information'
          ]
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleUserMessage = (text, isButton = false) => {
    const newMessages = [...messages, { text, sender: 'user' }];
    setMessages(newMessages);

    // Process user input
    setTimeout(() => handleBotResponse(text, isButton), 500);
  };

  const handleBotResponse = (userInput, isButton) => {
    let botResponse = {};

    if (isButton) {
      switch (userInput) {
        case 'Learn about services':
          botResponse = {
            text: "We specialize in corporate training programs focused on leadership development, team building, and organizational psychology. Which area interests you most?",
            buttons: ['Leadership Training', 'Team Building', 'Organizational Psychology', 'All Services']
          };
          break;

        case 'Schedule consultation':
          botResponse = {
            text: "Great! Let's get you scheduled. Please provide your name and email so we can contact you:",
            inputFields: ['name', 'email']
          };
          break;

        case 'Get program details':
          botResponse = {
            text: "We offer several specialized programs. Which one would you like information about?",
            buttons: ['Leadership Excellence', 'Team Dynamics', 'Strategic Thinking', 'Emotional Intelligence']
          };
          break;
          
        case 'Pricing information':
          botResponse = {
            text: "Our pricing depends on program duration and customization. Would you like pricing for:",
            buttons: ['Standard Packages', 'Custom Solutions', 'Enterprise Programs']
          };
          break;

        default:
          botResponse = {
            text: "Thank you for your interest! How else can I assist you?",
            buttons: ['Contact sales', 'Visit website', 'View testimonials', 'Schedule demo']
          };
      }
    } else {
      // Handle text input (name, email, etc.)
      if (userInput.includes('@')) {
        setUserData(prev => ({ ...prev, email: userInput }));
        botResponse = {
          text: `Thank you ${userData.name || ''}! We'll contact you at ${userInput} shortly. Would you like to schedule a specific time?`,
          buttons: ['Yes, schedule call', 'No, just send info']
        };
      } else if (!userData.name) {
        setUserData(prev => ({ ...prev, name: userInput }));
        botResponse = {
          text: `Nice to meet you, ${userInput}! Please provide your email:`
        };
      }
    }

    setMessages(prev => [...prev, { ...botResponse, sender: 'bot' }]);
  };

  const handleSubmitData = () => {
    console.log('Submitting user data:', userData);
    // In a real app, you would send this to your backend API
    setMessages(prev => [...prev, {
      text: "Thank you! Our team will contact you shortly. Have a great day!",
      sender: 'bot',
      buttons: ['Restart conversation', 'Close chat']
    }]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 pointer-events-none">
      {/* Overlay with fade-in effect */}
      {isOpen && (
        <div 
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
            isMounted ? 'opacity-100' : 'opacity-0'
          } pointer-events-auto`}
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Chat container with bounce animation */}
      <div className={`relative transition-all duration-300 ${
        isOpen 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-10 scale-95'
      } pointer-events-auto`}>
        {isOpen ? (
          <div className="w-full max-w-md bg-white shadow-xl rounded-lg flex flex-col border border-gray-200 overflow-hidden">
            {/* Chat header */}
            <div className="bg-gradient-to-r from-blue-800 to-purple-800 text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Psyche Panacea Assistant</h3>
                <p className="text-xs opacity-80">We're here to help</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 max-h-[60vh]">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`mb-4 transition-all duration-200 ${
                    msg.sender === 'user' 
                      ? 'text-right animate-fadeInRight' 
                      : 'animate-fadeInLeft'
                  }`}
                >
                  <div 
                    className={`inline-block p-3 rounded-2xl max-w-xs ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none'
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.buttons && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.buttons.map((btn, i) => (
                        <button
                          key={i}
                          onClick={() => handleUserMessage(btn, true)}
                          className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-lg transition-all hover:shadow-md"
                        >
                          {btn}
                        </button>
                      ))}
                    </div>
                  )}

                  {msg.inputFields && (
                    <div className="mt-3">
                      {msg.inputFields.map((field) => (
                        <input
                          key={field}
                          type={field === 'email' ? 'email' : 'text'}
                          placeholder={`Enter your ${field}`}
                          className="w-full p-3 border rounded-lg text-sm mb-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          onChange={(e) => setUserData(prev => ({
                            ...prev,
                            [field]: e.target.value
                          }))}
                        />
                      ))}
                      <button
                        onClick={handleSubmitData}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        Submit
                      </button>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-3 border-t bg-white">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const input = e.target.message.value.trim();
                  if (input) handleUserMessage(input);
                  e.target.reset();
                }}
                className="flex gap-2"
              >
                <input
                  name="message"
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-blue-800 to-purple-800 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all animate-bounce"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Animation keyframes */}
      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 0.3s ease-out forwards;
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ChatBot;