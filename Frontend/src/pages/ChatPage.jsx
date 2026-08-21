import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Avatar from "../components/ui/Avatar";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import ChatBubble from "../components/shared/ChatBubble";
import { conversations, getConversation } from "../utils/mockChat";

export default function ChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const active = getConversation(id || conversations[0].id);

  const [messages, setMessages] = useState(active.messages);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    setMessages(active.messages);
  }, [active.id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        from: "me",
        text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setDraft("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Messages</h1>
      <p className="text-muted mt-1">Chat with your skill exchange partners.</p>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_300px] gap-6 mt-6 h-[600px]">
        {/* Conversation list */}
        <div className="bg-white border border-border rounded-2xl overflow-y-auto">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => navigate(`/chat/${c.id}`)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left border-b border-border last:border-0 hover:bg-page transition-colors ${
                c.id === active.id ? "bg-teal-active-bg" : ""
              }`}
            >
              <Avatar name={c.name} size={38} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-text truncate">{c.name}</p>
                  <span className="text-xs text-muted shrink-0 ml-2">{c.time}</span>
                </div>
                <p className="text-xs text-muted truncate mt-0.5">{c.lastMessage}</p>
              </div>
              {c.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-red text-white text-[11px] font-semibold flex items-center justify-center shrink-0">
                  {c.unread}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Thread */}
        <div className="bg-white border border-border rounded-2xl flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar name={active.name} size={36} />
              <div>
                <p className="font-semibold text-text text-sm">{active.name}</p>
                <p className="text-xs text-muted">{active.exchangeLabel}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted">
              <button className="hover:text-text">Report</button>
              <button className="hover:text-text">Block</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
            {messages.map((m) => (
              <ChatBubble key={m.id} message={m} />
            ))}
            <div ref={scrollRef} />
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-3 px-5 py-4 border-t border-border">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Write a message..."
              className="flex-1 bg-page border border-border rounded-full px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-dark/20"
            />
            <Button type="submit">Send</Button>
          </form>
        </div>

        {/* Exchange details */}
        <div className="bg-white border border-border rounded-2xl p-5 h-fit">
          <p className="text-xs font-semibold tracking-wide text-muted mb-4">
            THIS EXCHANGE
          </p>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted">You teach</span>
              <span className="font-semibold text-text">{active.teach}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">You receive</span>
              <span className="font-semibold text-text">{active.receive}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Status</span>
              <Badge color="teal">{active.status}</Badge>
            </div>
          </div>
          <Button variant="secondary" className="w-full mt-4">
            Schedule Session
          </Button>
        </div>
      </div>
    </div>
  );
}
