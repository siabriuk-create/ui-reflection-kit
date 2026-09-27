import { Bot, Leaf, Plane, Zap } from "lucide-react";

const TECH = [
  { icon: Bot, title: "Автоматичне сортування", text: "Компʼютерний зір направляє посилки на потрібний маршрут без ручних пауз." },
  { icon: Leaf, title: "Електротранспорт", text: "Електричні авто працюють на міських маршрутах і зменшують локальні викиди." },
  { icon: Plane, title: "Дрони для контролю", text: "Повітряний моніторинг допомагає координувати великі логістичні майданчики." },
];

export function Innovation() {
  return (
    <section id="innovation" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
          <div className="flex flex-col justify-between rounded-lg bg-primary p-8 text-primary-foreground lg:p-10">
            <div>
              <p className="section-kicker">Інновації та екологія</p>
              <h2 className="mt-4 font-heading text-4xl leading-tight font-black sm:text-5xl">Технології, що рухають логістику вперед</h2>
            </div>
            <div className="mt-12 border-t border-primary-foreground/15 pt-8">
              <div className="flex items-center gap-3 text-accent"><Zap className="size-6" /><span className="text-xs font-bold uppercase">Зараз у мережі</span></div>
              <p className="mt-4 font-heading text-4xl font-black">10 540</p>
              <p className="mt-1 text-primary-foreground/65">посилок/год обробляється роботами</p>
            </div>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            {TECH.map(({ icon: Icon, title, text }) => (
              <article key={title} className="innovation-card group bg-card p-7">
                <span className="innovation-icon grid size-12 place-items-center rounded-md bg-accent-soft">
                  <Icon className="size-7 text-accent" />
                </span>
                <h3 className="mt-16 font-heading text-xl font-black text-primary">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}