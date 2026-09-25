import { ArrowRight, Boxes, Code2, Percent, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";

const BENEFITS = [
  { icon: Warehouse, title: "Фулфілмент", text: "Зберігаємо, комплектуємо й відправляємо замовлення без вашої участі." },
  { icon: Percent, title: "Обʼємні знижки", text: "Персональні умови для регулярних відправлень і сезонних піків." },
  { icon: Boxes, title: "Єдиний потік", text: "Замовлення, повернення та залишки в одному операційному контурі." },
];

export function Business() {
  return (
    <section id="business" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="section-kicker">B2B та e-commerce</p>
            <h2 className="mt-4 max-w-xl font-heading text-4xl leading-tight font-black text-primary sm:text-5xl">
              Масштабуйте бізнес. Логістику ми беремо на себе.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Підключайте магазин до мережі NovaExpert і відправляйте більше без розширення власного складу.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" asChild><a href="#contacts"><Code2 /> API інтеграція</a></Button>
              <Button variant="cta" size="lg" asChild><a href="#contacts">Залишити заявку для бізнесу <ArrowRight /></a></Button>
            </div>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            {BENEFITS.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="bg-card p-6 lg:min-h-64">
                <span className="font-heading text-sm font-black text-muted-foreground">0{index + 1}</span>
                <Icon className="mt-8 size-7 text-accent" />
                <h3 className="mt-5 font-heading text-xl font-black text-primary">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}