import { useEffect, useState } from "react";

export function VoiceWidget() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
    setReady(true);
  }, []);

  if (!ready) return null;

  return <elevenlabs-convai agent-id="agent_8701k3h41as5ft5bgvr8cfemk" />;
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": { "agent-id": string };
    }
  }
}
