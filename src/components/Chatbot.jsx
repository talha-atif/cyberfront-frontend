import { useState, useEffect, useRef } from "react";
import {
  MdSend,
  MdSmartToy,
  MdAccountCircle,
  MdClose,
  MdChat,
} from "react-icons/md";

const TypingIndicator = ({ isTyping }) => {
  return isTyping ? (
    <div className="flex items-center justify-start mb-4">
      <div className="flex-shrink-0 flex items-start mr-2">
        <MdSmartToy className="text-blue-800" size={18} />
      </div>
      <div className="px-3 py-2 bg-gray-200 text-gray-800 rounded-full flex items-center">
        <span className="animate-pulse flex items-center h-full">
          <span className="inline-block w-2 h-2 bg-gray-600 rounded-full mr-1"></span>
          <span className="inline-block w-2 h-2 bg-gray-600 rounded-full mr-1"></span>
          <span className="inline-block w-2 h-2 bg-gray-600 rounded-full"></span>
        </span>
      </div>
    </div>
  ) : null;
};

const Chatbot = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi there 👋 How can I help you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatboxRef = useRef(null);
  const textareaRef = useRef(null);

  const generateResponse = async () => {
    const userMessage = { role: "user", content: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:5000/chatbot/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      const assistantMessage = {
        role: "assistant",
        content: data.answer,
      };
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        role: "assistant",
        content: "Oops! Something went wrong. Please try again.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
      e.preventDefault();
      generateResponse();
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        className="bg-blue-800 text-white rounded-full p-4 focus:outline-none"
        onClick={() => setShowChatbot(!showChatbot)}
      >
        {showChatbot ? <MdClose size={18} /> : <MdChat size={18} />}
      </button>

      <div
        className={`fixed bottom-24 right-8 max-w-md bg-white rounded-lg shadow-lg transition-all duration-300 ${
          showChatbot ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <div className="bg-blue-800 text-white py-4 px-6 rounded-t-lg flex justify-between items-center">
          <h2 className="text-lg font-semibold">Benchmark Bot</h2>
          <button
            className="focus:outline-none"
            onClick={() => setShowChatbot(false)}
          >
            <MdClose size={24} />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto px-4 py-6" ref={chatboxRef}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start ${
                message.role === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              {message.role === "assistant" && (
                <div className="flex-shrink-0 flex items-start mr-2">
                  <MdSmartToy className="text-blue-800" size={22} />
                </div>
              )}
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-800 text-white rounded-tr-none"
                    : "bg-gray-200 text-gray-800 rounded-tl-none"
                }`}
              >
                {message.content}
              </div>
              {message.role === "user" && (
                <div className="flex-shrink-0 flex items-start ml-2">
                  <MdAccountCircle className="text-blue-800" size={24} />
                </div>
              )}
            </div>
          ))}
          <TypingIndicator isTyping={isTyping} />
        </div>

        <div className="bg-gray-100 p-4 flex items-center">
          <textarea
            className="flex-grow resize-none bg-transparent outline-none px-2 py-1"
            placeholder="Enter a message..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            ref={textareaRef}
          />
          <button
            className="bg-blue-800 text-white rounded-full p-2 focus:outline-none"
            onClick={generateResponse}
            disabled={!inputValue}
          >
            <MdSend size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
