import { useState } from "react";
import { ArrowRight, MapPin, Radio, Route as RouteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const ROUTES = [
  { id: "kyiv-lviv", from: "Київ", to: "Львів", time: "14 годин", x1: 62, y1: 45, x2: 18, y2: 42 },
  { id: "kyiv-odesa", from: "Київ", to: "Одеса", time: "11 годин", x1: 62, y1: 45, x2: 49, y2: 81 },
  { id: "kyiv-dnipro", from: "Київ", to: "Дніпро", time: "8 годин", x1: 62, y1: 45, x2: 77, y2: 58 },
] as const;

const HUBS = [
  { name: "Львів", x: 18, y: 42 },
  { name: "Київ", x: 62, y: 45 },
  { name: "Одеса", x: 49, y: 81 },
  { name: "Дніпро", x: 77, y: 58 },
  { name: "Харків", x: 88, y: 42 },
  { name: "Вінниця", x: 45, y: 52 },
] as const;

const NETWORK_LINKS = [
  [18, 42, 45, 52], [45, 52, 62, 45], [45, 52, 49, 81],
  [62, 45, 77, 58], [77, 58, 88, 42], [77, 58, 49, 81],
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
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full p-6" role="img" aria-label="Технологічна карта маршрутів NovaExpert по Україні">
              <defs>
                <filter id="hub-glow"><feGaussianBlur stdDeviation="1.4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
                <pattern id="map-dots" width="4" height="4" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="0.25" fill="var(--map-stroke)" opacity="0.5" /></pattern>
              </defs>
              <path d="M8 39 16 26 29 23 35 15 49 18 57 12 67 19 82 20 91 30 88 43 96 51 87 62 80 75 64 78 57 88 43 83 30 87 23 73 12 68 15 55 6 49Z" fill="var(--map-fill)" stroke="var(--map-stroke)" strokeWidth="0.7" />
              <path d="M8 39 16 26 29 23 35 15 49 18 57 12 67 19 82 20 91 30 88 43 96 51 87 62 80 75 64 78 57 88 43 83 30 87 23 73 12 68 15 55 6 49Z" fill="url(#map-dots)" />
              <g fill="none" stroke="var(--map-stroke)" strokeWidth="0.28" opacity="0.48">
                <path d="M16 26 23 38 18 54 12 68M29 23 34 38 30 57 23 73M35 15 44 31 45 52 43 83M49 18 55 30 62 45 57 88M57 12 67 32 64 49 64 78M67 19 76 36 77 58 80 75M82 20 80 31 88 43 87 62M23 38 34 38 44 31 55 30 67 32 80 31M18 54 30 57 45 52 64 49 77 58 87 62" />
              </g>
              <g stroke="var(--map-stroke)" strokeWidth="0.34" strokeDasharray="1 2" opacity="0.45">
                {NETWORK_LINKS.map(([x1, y1, x2, y2]) => <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} />)}
              </g>
              {ROUTES.map((route) => (
                <g key={route.id} className={active === route.id ? "opacity-100" : "opacity-25"}>
                  <line x1={route.x1} y1={route.y1} x2={route.x2} y2={route.y2} stroke="var(--accent)" strokeWidth="0.9" strokeDasharray="2 2" className={active === route.id ? "route-line" : ""} />
                </g>
              ))}
              {HUBS.map((hub) => <g key={hub.name} filter="url(#hub-glow)"><circle cx={hub.x} cy={hub.y} r="2.4" fill="var(--operations)" stroke="var(--accent)" strokeWidth="0.7" /><circle cx={hub.x} cy={hub.y} r="0.8" fill="var(--accent)" /></g>)}
            </svg>
            <div className="absolute top-4 left-4 rounded-md border border-primary-foreground/10 bg-operations/80 px-3 py-2 text-xs text-primary-foreground/65 backdrop-blur-md"><span className="mr-2 inline-block size-2 rounded-full bg-accent route-progress" />6 ключових хабів онлайн</div>
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-md border border-primary-foreground/10 bg-operations/85 p-4 backdrop-blur-md sm:left-auto sm:w-80">
              <div><p className="text-xs text-primary-foreground/50">Обраний маршрут</p><p className="mt-1 font-heading text-lg font-black">{selected.from} — {selected.to}</p></div>
              <strong className="text-accent">{selected.time}</strong>
            </div>
          </div>
          <div className="grid gap-2">
            {ROUTES.map((route) => (
              <Button
                key={route.id}
                type="button"
                variant="ghost"
                onClick={() => setActive(route.id)}
                className={`grid h-auto min-h-28 grid-cols-[auto_1fr_auto] items-center gap-4 whitespace-normal rounded-lg border p-5 text-left transition-colors ${active === route.id ? "border-accent bg-accent/10" : "border-primary-foreground/10 bg-primary-foreground/5 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"}`}
              >
                <MapPin className="size-5 text-accent" />
                <span><span className="block font-heading font-black">{route.from} — {route.to}</span><span className="mt-1 block text-xs text-primary-foreground/50">Прямий нічний рейс</span></span>
                <span className="flex items-center gap-2 text-sm font-bold">{route.time}<ArrowRight className="size-4" /></span>
              </Button>
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