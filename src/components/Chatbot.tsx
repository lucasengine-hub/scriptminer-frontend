import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
}

function getBotResponse(text: string): string {
  const lower = text.toLowerCase();

  if (lower.includes('erro') || lower.includes('automação') || lower.includes('webhook') || lower.includes('error') || lower.includes('automation')) {
    return '🔧 Diagnóstico técnico: Verifique se o Webhook retorna HTTP status 200. No Make.com ou n8n, abra o cenário e clique em "Run once" para testar o endpoint manualmente. Confirme que o método é POST e que o Content-Type está como application/json. Se o status for 4xx ou 5xx, o fluxo de automação será interrompido na fila de postagens.';
  }

  if (lower.includes('roteiro') || lower.includes('vendas') || lower.includes('copy') || lower.includes('script') || lower.includes('sales')) {
    return '🎬 Instrução de copywriting de retenção escura: Nos primeiros 3 segundos do vídeo, aplique quebra de padrão visual + sonora. Use um gancho de curiosidade ou polêmica seguido de um corte seco no auge da tensão. Combine com a matriz de arquétipo Sexy/Provocativo para máxima retenção. Gatilho de escassez no CTA final aumenta conversão em até 40%.';
  }

  return '🚀 Excelente pergunta! O VRTX está aqui para te levar ao próximo nível. Execute sem medo: gere roteiros, minere produtos, espie criativos virais e automatize suas postagens. A diferença entre quem escala e quem fica parado é a consistência de execução. Qual funcionalidade você quer dominar primeiro?';
}

interface ChatbotProps {
  t: (k: string) => string;
}

export function Chatbot({ t }: ChatbotProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'bot', text: t('chatbotGreeting') },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update greeting when language changes
  useEffect(() => {
    setMessages((prev) => prev.map((m) => m.id === 'init' ? { ...m, text: t('chatbotGreeting') } : m));
  }, [t]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
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
      <button onClick={() => setOpen(!open)} className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-accent-500 to-blue-700 flex items-center justify-center shadow-glow transition-all duration-300 hover:scale-110 ${!open ? 'animate-pulse-soft' : ''}`}>
        {open ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] surface rounded-2xl shadow-card overflow-hidden animate-fade-in-up flex flex-col" style={{ height: '480px' }}>
          <div className="flex items-center justify-between px-4 py-3 border-b border-default bg-surface-subtle">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-500 to-blue-700 flex items-center justify-center"><Sparkles className="w-4 h-4 text-white" /></div>
              <div><h3 className="text-sm font-semibold text-primary">{t('chatbotName')}</h3><p className="text-[10px] text-muted flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />{t('chatbotOnline')}</p></div>
            </div>
            <button onClick={() => setOpen(false)} className="text-muted hover:text-primary transition-colors p-1"><X className="w-4 h-4" /></button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-accent-500 text-white rounded-br-sm' : 'bg-surface-subtle text-primary border border-default rounded-bl-sm'}`}>{msg.text}</div>
              </div>
            ))}
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

          <div className="p-3 border-t border-default">
            <div className="flex items-center gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder={t('chatbotPlaceholder')} className="flex-1 rounded-xl bg-surface-subtle border border-default px-4 py-2.5 text-sm text-primary placeholder:text-subtle focus:outline-none focus:border-accent-500/60" />
              <button onClick={handleSend} disabled={!input.trim() || typing} className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-blue-700 flex items-center justify-center text-white shadow-glow hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"><Send className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
