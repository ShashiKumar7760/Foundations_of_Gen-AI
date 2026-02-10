
import React, { useState, useRef, useEffect } from 'react';
import { Send, GraduationCap, X, MessageCircle, Loader2, User, HelpCircle } from 'lucide-react';
import { chatWithAcademicAdvisor } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIChatAssistantProps {
  context: string;
}

const AIChatAssistant: React.FC<AIChatAssistantProps> = ({ context }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: `Hi there! I'm your Academic Advisor. Stuck on something related to ${context}? Ask me anything!` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    const response = await chatWithAcademicAdvisor(userMessage, context);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-white w-[380px] sm:w-[420px] h-[600px] shadow-2xl rounded-[2.5rem] border border-slate-100 flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-indigo-600 p-6 flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-2.5 rounded-2xl">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-base leading-tight">Academic Advisor</h4>
                <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-widest mt-0.5">Always Online</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 p-2 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex items-start gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  m.role === 'user' ? 'bg-slate-100' : 'bg-indigo-50 text-indigo-600'
                }`}>
                  {m.role === 'user' ? <User className="w-4 h-4 text-slate-500" /> : <GraduationCap className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-3xl text-sm leading-relaxed font-medium shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-tr-none' 
                    : 'bg-indigo-50 text-slate-800 rounded-tl-none border border-indigo-100'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="bg-indigo-50 p-4 rounded-3xl rounded-tl-none border border-indigo-100">
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-slate-50">
            <div className="flex gap-3 bg-slate-50 p-2 rounded-3xl border border-slate-100 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:bg-white transition-all">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask your advisor a question..."
                className="flex-grow bg-transparent border-none px-4 py-2 text-sm focus:outline-none text-slate-700 font-medium"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="bg-indigo-600 text-white p-2.5 rounded-2xl hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-md shadow-indigo-100"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-4 font-bold uppercase tracking-widest">
              AI can make mistakes. Verify important facts.
            </p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 text-white p-5 rounded-full shadow-2xl hover:bg-indigo-600 hover:scale-110 active:scale-95 transition-all group relative"
        >
          <MessageCircle className="w-7 h-7" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full border-2 border-white animate-pulse" />
        </button>
      )}
    </div>
  );
};

export default AIChatAssistant;
