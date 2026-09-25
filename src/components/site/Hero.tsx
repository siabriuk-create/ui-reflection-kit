import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, PackageSearch, Radar, Timer, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroAsset from "@/assets/hero-logistics-kyiv.jpg.asset.json";

const STATS = [
  { icon: Timer, value: "20 годин", label: "між містами" },
  { icon: Truck, value: "4 500+", label: "рейсів щодня" },
  { icon: Radar, value: "99,8%", label: "доставлено вчасно" },
];

export function Hero() {
  const [tracking, setTracking] = useState("");
  const [result, setResult] = useState<string | null>(null);

  const track = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const number = tracking.trim();
    if (!number) {
      setResult("Введіть номер накладної");
      return;
    }
    setResult(`Відправлення ${number.toUpperCase()} прямує до сортувального хаба`);
  };

  return (
    <section id="top" className="relative isolate min-h-[760px] overflow-hidden bg-operations text-primary-foreground">
      <img
        src={heroAsset.url}
        alt="Логістичний центр NovaExpert у Києві"
        width={1920}
        height={1080}
        className="absolute inset-0 -z-20 size-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-[var(--gradient-operations)]" aria-hidden />
      <div className="operations-grid absolute inset-0 -z-10 opacity-35" aria-hidden />

      <div className="mx-auto grid min-h-[760px] max-w-7xl items-center gap-12 px-4 pt-32 pb-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:pt-36">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-md border border-accent/40 bg-accent/10 px-3 py-2 text-xs font-bold uppercase text-accent">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Мережа працює без затримок
          </p>
          <h1 className="mt-7 max-w-2xl font-heading text-5xl leading-[1.03] font-black sm:text-6xl lg:text-7xl">
            Де ваша посилка?
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/75">
            Відстежуйте рух відправлення в єдиній логістичній мережі NovaExpert.
          </p>

          <form onSubmit={track} className="mt-9 max-w-2xl" aria-label="Відстеження посилки">
            <div className="flex flex-col gap-2 rounded-lg border border-primary-foreground/15 bg-operations/85 p-2 shadow-[var(--shadow-operations)] backdrop-blur-xl sm:flex-row">
              <label className="flex min-w-0 flex-1 items-center gap-3 px-4">
                <PackageSearch className="size-5 shrink-0 text-accent" />
                <span className="sr-only">Номер накладної</span>
                <input
                  value={tracking}
                  onChange={(event) => setTracking(event.target.value)}
                  placeholder="Введіть номер накладної"
                  className="h-14 min-w-0 flex-1 bg-transparent text-base text-primary-foreground outline-none placeholder:text-primary-foreground/45"
                />
              </label>
              <Button type="submit" variant="cta" size="xl" className="h-14 rounded-md px-9">
                Знайти <ArrowRight />
              </Button>
            </div>
            {result && (
              <div className="mt-3 flex items-center gap-2 rounded-md border border-primary-foreground/10 bg-primary-foreground/10 px-4 py-3 text-sm backdrop-blur-md animate-in fade-in">
                <CheckCircle2 className="size-4 shrink-0 text-accent" />
                {result}
              </div>
            )}
          </form>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-primary-foreground/15 pt-7">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="min-w-0">
                <Icon className="size-5 text-accent" />
                <dt className="mt-3 font-heading text-xl font-black sm:text-2xl">{value}</dt>
                <dd className="mt-1 text-xs text-primary-foreground/60 sm:text-sm">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="hidden gap-4 lg:grid" aria-label="Операційні показники">
          <div className="rounded-lg border border-primary-foreground/10 bg-operations/70 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Активний маршрут</span>
              <span className="text-xs font-bold uppercase text-accent">У дорозі</span>
            </div>
            <div className="mt-5 flex items-center justify-between font-heading text-2xl font-black">
              <span>Київ</span><ArrowRight className="text-accent" /><span>Львів</span>
            </div>
            <div className="mt-5 h-1 overflow-hidden rounded-full bg-primary-foreground/10">
              <div className="route-progress h-full w-3/4 bg-accent" />
            </div>
            <div className="mt-3 flex justify-between text-xs text-primary-foreground/55">
              <span>Хаб Київ</span><span>14 годин</span>
            </div>
          </div>
          <a href="#business" className="group rounded-lg bg-accent p-6 text-accent-foreground shadow-[var(--shadow-lift)]">
            <p className="text-xs font-bold uppercase">NovaExpert для бізнесу</p>
            <p className="mt-3 font-heading text-2xl font-black">Логістика, що масштабується разом із вами</p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold">Дізнатися більше <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></span>
          </a>
        </aside>
      </div>
    </section>
  );
}