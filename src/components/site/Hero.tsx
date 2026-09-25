import { ShieldCheck, Timer, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-logistics.jpg";

const STATS = [
  { icon: Timer, value: "24 год", label: "Доставка між містами" },
  { icon: Truck, value: "1 500+", label: "Відділень по Україні" },
  { icon: ShieldCheck, value: "99,8%", label: "Відправлень без пошкоджень" },
];

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      <img
        src={heroImg}
        alt="Сортування посилок на складі NovaExpert"
        width={1920}
        height={1088}
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "var(--gradient-hero)" }}
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:pt-44 lg:pb-28">
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-accent/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-accent-foreground uppercase">
            Логістика нового покоління
          </span>
          <h1 className="mt-6 text-4xl leading-[1.08] font-extrabold tracking-tight text-primary-foreground sm:text-5xl lg:text-6xl">
            NovaExpert — швидка логістика та надійні відправлення по Україні
          </h1>
          <p className="mt-5 max-w-xl text-base text-primary-foreground/85 sm:text-lg">
            Професійне пакування, миттєва відправка та контроль посилки на кожному етапі.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button variant="cta" size="xl" asChild>
              <a href="#rates">Розрахувати відправку</a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#services">Наші послуги</a>
            </Button>
          </div>
        </div>

        <dl className="mt-16 grid gap-4 sm:grid-cols-3">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="rounded-2xl border border-primary-foreground/15 bg-primary/35 p-5 backdrop-blur-md"
            >
              <Icon className="size-6 text-accent" />
              <dt className="mt-3 text-2xl font-extrabold text-primary-foreground">{value}</dt>
              <dd className="text-sm text-primary-foreground/75">{label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
