import { useEffect } from "react";

const AGENT_ID = "agent_8701k3h41as5ft5bgvr8cfemk";
const WIDGET_SCRIPT = "https://elevenlabs.io/convai-widget/index.js";
const ASSISTANT_PROMPT = `Ти — голосовий помічник української логістичної компанії NovaExpert. Спілкуйся українською, коротко й професійно. Допомагай клієнтам відстежувати посилки: попроси номер відправлення і поясни, що перевірка на цьому сайті демонстраційна. Допомагай розрахувати доставку за офіційними тарифами: мала до 2 кг — 70 грн по місту або 90 грн по Україні; середня до 10 кг — 115 грн по місту або 135 грн по Україні; велика до 30 кг — 180 грн по місту або 200 грн по Україні. Єдина додаткова послуга — кур'єрський забір або доставка за 60 грн для відправлень до 30 кг. Не пропонуй доставку в поштомат, окрему доплату за село або доплату за габарит понад 120 см. Повідомляй, що орієнтовний час доставки між містами України — 20 годин, а маршрут Київ—Львів займає близько 14 годин. Якщо інформації недостатньо, попроси уточнення і не вигадуй статус посилки чи ціну.`;

export function VoiceWidget() {
  useEffect(() => {
    if (!document.querySelector(`script[src="${WIDGET_SCRIPT}"]`)) {
      const script = document.createElement("script");
      script.src = WIDGET_SCRIPT;
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="voice-widget-slot" aria-label="Голосовий помічник NovaExpert">
      <elevenlabs-convai
        agent-id={AGENT_ID}
        variant="compact"
        dismissible="true"
        avatar-orb-color-1="#002D62"
        avatar-orb-color-2="#FF5722"
        action-text="Запитайте NovaExpert"
        start-call-text="Почати розмову"
        end-call-text="Завершити"
        expand-text="Відкрити помічника"
        listening-text="Слухаю…"
        speaking-text="NovaExpert відповідає"
        override-language="uk"
        override-first-message="Вітаю! Допоможу відстежити посилку, розрахувати доставку або уточнити терміни."
        override-prompt={ASSISTANT_PROMPT}
      />
    </div>
  );
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": {
        "agent-id": string;
        variant?: string;
        dismissible?: string;
        "avatar-orb-color-1"?: string;
        "avatar-orb-color-2"?: string;
        "action-text"?: string;
        "start-call-text"?: string;
        "end-call-text"?: string;
        "expand-text"?: string;
        "listening-text"?: string;
        "speaking-text"?: string;
        "override-language"?: string;
        "override-first-message"?: string;
        "override-prompt"?: string;
      };
    }
  }
}
