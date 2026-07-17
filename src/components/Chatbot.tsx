import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

function getBotResponse(text: string): string {
  const lower = text.toLowerCase();

  if (lower.includes('erro') || lower.includes('automação')) {
    return '🔧 Dica de automação: Verifique se a URL do seu Webhook no Make.com ou n8n está ativa e com o método POST configurado. Teste o endpoint manualmente antes de ativar o modo 100% automático. Confira também se as chaves de API das redes sociais estão cadastradas em Configurações.';
  }

  if (lower.includes('roteiro') || lower.includes('vendas')) {
    return '💰 Dica de gatilho mental: Use o gatilho de ESCASSEZ no seu roteiro! Frases como "Apenas 50 vagas com esse valor" ou "O timer já está rodando" aumentam a conversão em até 40%. Combine com prova social ("12.000 clientes satisfeitos") para potencializar o efeito.';
  }

  return '🚀 Ótima pergunta! O ScriptMiner está aqui pra te ajudar a escalar. Você pode gerar roteiros de alta conversão, minerar produtos físicos, criar e-books e automatizar postagens. Qual funcionalidade você quer explorar primeiro?';
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'bot', text: '👋 Olá! Sou o MinerAI, seu assistente. Como posso ajudar você hoje?' },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const handleSend = () => {
    if (!input.trim() || typing) return;

    const userMsg: ChatMessage = { id: `u${Date.now()}`, role: 'user', text: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const botMsg: ChatMessage = { id: `b${Date.now()}`, role: 'bot', text: getBotResponse(userMsg.text) };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(!open)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-accent-500 to-blue-700 flex items-center justify-center shadow-glow transition-all duration-300 hover:scale-110 ${
          !open ? 'animate-pulse-soft' : ''
        }`}
      >
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] surface rounded-2xl shadow-card overflow-hidden animate-fade-in-up flex flex-col" style={{ height: '480px' }}>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-default bg-surface-subtle">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-blue-700 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-primary">MinerAI</h3>
                <p className="text-[10px] text-muted flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Online agora
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted hover:text-primary transition-colors p-1">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-accent-500 text-white rounded-br-sm'
                      : 'bg-surface-subtle text-primary border border-default rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-surface-subtle border border-default rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-muted animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-default">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Digite sua mensagem..."
                className="flex-1 rounded-xl bg-surface-subtle border border-default px-4 py-2.5 text-sm text-primary placeholder:text-subtle focus:outline-none focus:border-accent-500/60"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || typing}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-blue-700 flex items-center justify-center text-white shadow-glow hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
