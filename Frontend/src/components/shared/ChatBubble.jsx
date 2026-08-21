import clsx from "clsx";

export default function ChatBubble({ message }) {
  const isMe = message.from === "me";
  return (
    <div className={clsx("flex", isMe ? "justify-end" : "justify-start")}>
      <div
        className={clsx(
          "max-w-[70%] rounded-2xl px-4 py-2.5",
          isMe ? "bg-teal-dark text-white" : "bg-page text-text"
        )}
      >
        <p className="text-sm">{message.text}</p>
        <p className={clsx("text-[11px] mt-1", isMe ? "text-white/70" : "text-muted")}>
          {message.time}
        </p>
      </div>
    </div>
  );
}
