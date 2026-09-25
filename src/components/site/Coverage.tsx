import { useState } from "react";
import { ArrowRight, MapPin, Radio, Route as RouteIcon } from "lucide-react";

const ROUTES = [
  { id: "kyiv-lviv", from: "Київ", to: "Львів", time: "14 годин", x1: 62, y1: 45, x2: 18, y2: 42 },
  { id: "kyiv-odesa", from: "Київ", to: "Одеса", time: "11 годин", x1: 62, y1: 45, x2: 49, y2: 81 },
  { id: "kyiv-dnipro", from: "Київ", to: "Дніпро", time: "8 годин", x1: 62, y1: 45, x2: 77, y2: 58 },
] as const;

export function Coverage() {
  const [active, setActive] = useState<(typeof ROUTES)[number]["id"]>("kyiv-lviv");
  const selected = ROUTES.find((route) => route.id === active) ?? ROUTES[0];

  return (
    <section id="coverage" className="overflow-hidden bg-operations py-20 text-primary-foreground lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="section-kicker">Покриття України</p>
            <h2 className="mt-4 max-w-2xl font-heading text-4xl font-black sm:text-5xl">4 500+ рейсів щодня</h2>
            <p className="mt-4 max-w-xl text-primary-foreground/65">Ключові хаби зʼєднані нічними маршрутами без зайвих зупинок.</p>
          </div>
          <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
            <Radio className="size-5 text-accent" /> Дані маршрутної мережі
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="relative min-h-[430px] overflow-hidden rounded-lg border border-primary-foreground/10 bg-primary-foreground/5">
            <div className="operations-grid absolute inset-0 opacity-30" />
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full p-6" role="img" aria-label="Схематична карта маршрутів NovaExpert по Україні">
              <path d="M8 39 16 26 29 23 35 15 49 18 57 12 67 19 82 20 91 30 88 43 96 51 87 62 80 75 64 78 57 88 43 83 30 87 23 73 12 68 15 55 6 49Z" fill="var(--map-fill)" stroke="var(--map-stroke)" strokeWidth="0.7" />
              {ROUTES.map((route) => (
                <g key={route.id} className={active === route.id ? "opacity-100" : "opacity-25"}>
                  <line x1={route.x1} y1={route.y1} x2={route.x2} y2={route.y2} stroke="var(--accent)" strokeWidth="0.8" strokeDasharray="2 2" className={active === route.id ? "route-line" : ""} />
                  <circle cx={route.x2} cy={route.y2} r="1.8" fill="var(--accent)" />
                </g>
              ))}
              <circle cx="62" cy="45" r="2.3" fill="var(--primary-foreground)" />
            </svg>
            <div className="absolute top-[42%] left-[62%] translate-x-3 text-xs font-bold">Київ</div>
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-md border border-primary-foreground/10 bg-operations/85 p-4 backdrop-blur-md sm:left-auto sm:w-80">
              <div><p className="text-xs text-primary-foreground/50">Обраний маршрут</p><p className="mt-1 font-heading text-lg font-black">{selected.from} — {selected.to}</p></div>
              <strong className="text-accent">{selected.time}</strong>
            </div>
          </div>
          <div className="grid gap-2">
            {ROUTES.map((route) => (
              <button
                key={route.id}
                type="button"
                onClick={() => setActive(route.id)}
                className={`grid min-h-28 grid-cols-[auto_1fr_auto] items-center gap-4 rounded-lg border p-5 text-left transition-colors ${active === route.id ? "border-accent bg-accent/10" : "border-primary-foreground/10 bg-primary-foreground/5 hover:bg-primary-foreground/10"}`}
              >
                <MapPin className="size-5 text-accent" />
                <span><span className="block font-heading font-black">{route.from} — {route.to}</span><span className="mt-1 block text-xs text-primary-foreground/50">Прямий нічний рейс</span></span>
                <span className="flex items-center gap-2 text-sm font-bold">{route.time}<ArrowRight className="size-4" /></span>
              </button>
            ))}
            <div className="mt-2 flex items-center gap-3 rounded-lg bg-accent p-5 text-accent-foreground">
              <RouteIcon className="size-6" /><span className="text-sm"><strong className="block font-heading text-xl">24 області</strong> у єдиній мережі</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}