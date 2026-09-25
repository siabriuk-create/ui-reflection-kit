import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Calculator } from "@/components/site/Calculator";
import { About } from "@/components/site/About";
import { Testimonials } from "@/components/site/Testimonials";
import { Contacts } from "@/components/site/Contacts";
import { VoiceWidget } from "@/components/site/VoiceWidget";

const title = "NovaExpert — швидка логістика та доставка посилок по Україні";
const description =
  "Експрес-доставка за 24 години, професійне пакування, кур'єрський забір та вантажні перевезення. Розрахуйте вартість відправлення онлайн.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Services />
        <Calculator />
        <About />
        <Testimonials />
      </main>
      <Contacts />
      <VoiceWidget />
    </div>
  );
}
