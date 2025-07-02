import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Smile, Paperclip } from 'lucide-react';

const ChatLayout = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Sarah Chen',
      avatar: 'SC',
      message: 'Hey team! Just finished the wireframes for the new dashboard. What do you think?',
      timestamp: '10:30 AM',
      isOwn: false
    },
    {
      id: 2,
      user: 'Mike Johnson',
      avatar: 'MJ',
      message: 'Looks great! The navigation flow is much cleaner now.',
      timestamp: '10:32 AM',
      isOwn: false
    },
    {
      id: 3,
      user: 'You',
      avatar: 'YO',
      message: 'Agreed! I love the new layout. Should we schedule a review meeting?',
      timestamp: '10:35 AM',
      isOwn: true
    },
    {
      id: 4,
      user: 'Alex Rivera',
      avatar: 'AR',
      message: 'Perfect timing! I just pushed the latest API changes to staging.',
      timestamp: '10:37 AM',
      isOwn: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        user: 'You',
        avatar: 'YO',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Simulate someone typing
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const responses = [
          'Sounds good to me!',
          'Let me check the calendar',
          'I can join at 2 PM',
          'Great work everyone!',
          'Should we invite the design team too?'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const responseMessage = {
          id: messages.length + 2,
          user: 'Emma Davis',
          avatar: 'ED',
          message: randomResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isOwn: false
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-h-screen">
      <div className="relative z-10 h-full flex flex-col animate-fade-in">

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-neutral-800">
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 animate-fade-in ${msg.isOwn ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
                  {msg.avatar}
                </div>
                <div className={`max-w-xs lg:max-w-md ${msg.isOwn ? 'text-right' : 'text-left'}`}>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-medium text-white">{msg.user}</span>
                    <span className="text-xs text-neutral-500">{msg.timestamp}</span>
                  </div>
                  <div
                    className={`rounded-xl px-4 py-2 ${
                      msg.isOwn
                        ? 'bg-primary text-white'
                        : 'bg-neutral-800 text-neutral-100'
                    }`}
                  >
                    {msg.message}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium text-white">
                  ED
                </div>
                <div className="max-w-xs lg:max-w-md">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-medium text-white">Emma Davis</span>
                    <span className="text-xs text-neutral-500">typing...</span>
                  </div>
                  <div className="bg-neutral-800 text-neutral-100 rounded-xl px-4 py-2">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 bg-neutral-500 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-neutral-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="h-2 w-2 bg-neutral-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <div className="border-t sticky border-neutral-800 pt-4 flex-shrink-0">
          <div className="flex items-end gap-3">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-neutral-700 bg-neutral-800 px-4 py-3">
              <button className="text-neutral-400 transition-colors hover:text-white">
                <Paperclip size={20} />
              </button>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 resize-none bg-transparent text-white placeholder-neutral-500 focus:outline-none"
                rows="1"
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-600 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;