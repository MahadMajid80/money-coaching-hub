import { whatsapp } from "@/lib/site";

const Icon = ({ size = 22 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 15.03L2 22l5.1-1.5A9.93 9.93 0 1 0 12.04 2Zm0 18.1a8.15 8.15 0 0 1-4.16-1.14l-.3-.18-3.03.9.9-2.95-.2-.31a8.17 8.17 0 1 1 6.79 3.68Zm4.48-6.11c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.16.25-.63.8-.78.96-.14.17-.29.19-.53.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.31c-.23.25-.86.84-.86 2.04 0 1.2.88 2.37 1 2.53.12.17 1.72 2.63 4.18 3.69.58.25 1.04.4 1.4.51.59.19 1.12.16 1.54.1.47-.07 1.46-.6 1.66-1.17.21-.58.21-1.07.15-1.17-.06-.11-.22-.17-.47-.29Z" />
  </svg>
);

/** Floating "Ask me on WhatsApp" button shown on every page. */
export function WhatsAppFloat() {
  return (
    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="wa-float" aria-label="Ask Luca on WhatsApp">
      <Icon size={26} />
      <span className="wa-float-label">Ask me on WhatsApp</span>
    </a>
  );
}

/** Small inline link, e.g. under a booking button. */
export function WhatsAppInline({ text = "Got a question first? Ask me on WhatsApp", dark = false }: { text?: string; dark?: boolean }) {
  return (
    <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={dark ? "wa-inline wa-inline--dark" : "wa-inline"}>
      <Icon size={18} />
      <span>{text}</span>
    </a>
  );
}
