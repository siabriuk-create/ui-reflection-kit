import { useEffect } from "react";

export function VoiceWidget() {
  useEffect(() => {
    const src = "https://elevenlabs.io/convai-widget/index.js";
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="voice-widget-slot" aria-label="Голосовий помічник NovaExpert">
      <elevenlabs-convai agent-id="agent_8701k3h41as5ft5bgvr8cfemk" />
    </div>
  );
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": { "agent-id": string };
    }
  }
}
