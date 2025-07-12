import React, { useState, useEffect, useRef } from 'react';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    interest: '',
    phone: ''
  });
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          text: "Hello! I'm Psyche Panacea's virtual assistant. How can I help you today?",
          sender: 'bot',
          buttons: [
            'Learn about services',
            'Schedule consultation',
            'Get program details'
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
            text: "We offer corporate training in leadership development, team building, and organizational psychology. Which area interests you?",
            buttons: ['Leadership', 'Team Building', 'Organizational Psychology']
          };
          break;

        case 'Schedule consultation':
          botResponse = {
            text: "Great! Please provide your name and email so we can contact you:",
            inputFields: ['name', 'email']
          };
          break;

        case 'Get program details':
          botResponse = {
            text: "Which program would you like information about?",
            buttons: ['Leadership Excellence', 'Team Dynamics', 'Strategic Thinking']
          };
          break;

        default:
          botResponse = {
            text: "Thank you for your interest! How else can I assist you?",
            buttons: ['Contact sales', 'Visit website', 'View testimonials']
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
      sender: 'bot'
    }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 h-96 bg-white shadow-xl rounded-lg flex flex-col border border-gray-200">
          {/* Chat header */}
          <div className="bg-blue-800 text-white p-3 rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Psyche Panacea Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : ''}`}>
                <div className={`inline-block p-3 rounded-lg max-w-xs ${msg.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                  }`}>
                  {msg.text}
                </div>

                {msg.buttons && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {msg.buttons.map((btn, i) => (
                      <button
                        key={i}
                        onClick={() => handleUserMessage(btn, true)}
                        className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded"
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
                        className="w-full p-2 border rounded text-sm mb-2"
                        onChange={(e) => setUserData(prev => ({
                          ...prev,
                          [field]: e.target.value
                        }))}
                      />
                    ))}
                    <button
                      onClick={handleSubmitData}
                      className="bg-blue-600 text-white px-4 py-1 rounded text-sm"
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
          <div className="p-3 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.target.message.value.trim();
                if (input) handleUserMessage(input);
                e.target.reset();
              }}
              className="flex"
            >
              <input
                name="message"
                type="text"
                placeholder="Type your message..."
                className="flex-1 border rounded-l p-2 text-sm"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 rounded-r"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-800 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center animate-bounce"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ChatBot;