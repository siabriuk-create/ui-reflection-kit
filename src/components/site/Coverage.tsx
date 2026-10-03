import { useState } from "react";
import { ArrowRight, MapPin, Radio, Route as RouteIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const ROUTES = [
  { id: "kyiv-lviv", from: "Київ", to: "Львів", time: "14 годин", x1: 52, y1: 40, x2: 16, y2: 47 },
  { id: "kyiv-odesa", from: "Київ", to: "Одеса", time: "11 годин", x1: 52, y1: 40, x2: 44, y2: 79 },
  { id: "kyiv-dnipro", from: "Київ", to: "Дніпро", time: "8 годин", x1: 52, y1: 40, x2: 68, y2: 55 },
] as const;

const HUBS = [
  { name: "Львів", role: "Західний хаб", x: 16, y: 47 },
  { name: "Київ", role: "Головний хаб", x: 52, y: 40 },
  { name: "Одеса", role: "Портовий хаб", x: 44, y: 79 },
  { name: "Дніпро", role: "Східний хаб", x: 68, y: 55 },
  { name: "Харків", role: "Північно-східний хаб", x: 80, y: 45 },
  { name: "Вінниця", role: "Центральний хаб", x: 42, y: 52 },
] as const;

type Tip = { x: number; y: number; title: string; sub: string };

const NETWORK_LINKS = [
  [16, 47, 42, 52], [42, 52, 52, 40], [42, 52, 44, 79],
  [52, 40, 68, 55], [68, 55, 80, 45], [68, 55, 44, 79],
] as const;

const UKRAINE_OUTLINE =
  "M8 55 L13 49 L17 42 L22 36 L30 31 L38 28 L46 27 L54 27 L62 29 L70 31 L78 33 L86 38 L92 43 L87 47 L83 51 L81 57 L77 61 L73 64 L69 67 L65 71 L63 75 L61 80 L59 87 L57 91 L55 86 L53 80 L49 77 L44 79 L38 80 L32 76 L27 71 L22 67 L16 63 L11 60 Z";

export function Coverage() {
  const [active, setActive] = useState<(typeof ROUTES)[number]["id"]>("kyiv-lviv");
  const [tip, setTip] = useState<Tip | null>(null);
  const selected = ROUTES.find((route) => route.id === active) ?? ROUTES[0];

  const tipWidth = tip ? Math.max(tip.title.length, tip.sub.length) * 1.9 + 8 : 0;
  const tipX = tip ? Math.min(Math.max(tip.x - tipWidth / 2, 1), 99 - tipWidth) : 0;
  const tipY = tip ? (tip.y > 14 ? tip.y - 12.5 : tip.y + 5) : 0;

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
              <path d={UKRAINE_OUTLINE} fill="var(--map-fill)" stroke="var(--map-stroke)" strokeWidth="0.7" strokeLinejoin="round" />
              <path d={UKRAINE_OUTLINE} fill="url(#map-dots)" />
              <g stroke="var(--map-stroke)" strokeWidth="0.34" strokeDasharray="1 2" opacity="0.45">
                {NETWORK_LINKS.map(([x1, y1, x2, y2]) => <line key={`${x1}-${y1}-${x2}-${y2}`} x1={x1} y1={y1} x2={x2} y2={y2} />)}
              </g>
              {ROUTES.map((route) => (
                <g key={route.id} className={active === route.id ? "opacity-100" : "opacity-25"}>
                  <line x1={route.x1} y1={route.y1} x2={route.x2} y2={route.y2} stroke="var(--accent)" strokeWidth="0.9" strokeDasharray="2 2" className={active === route.id ? "route-line" : ""} />
                  <line
                    x1={route.x1} y1={route.y1} x2={route.x2} y2={route.y2}
                    stroke="transparent" strokeWidth="5" className="cursor-pointer"
                    onMouseEnter={() => setTip({ x: (route.x1 + route.x2) / 2, y: (route.y1 + route.y2) / 2, title: `${route.from} — ${route.to}`, sub: `Нічний рейс · ${route.time}` })}
                    onMouseLeave={() => setTip(null)}
                    onClick={() => setActive(route.id)}
                  />
                </g>
              ))}
              {HUBS.map((hub) => (
                <g
                  key={hub.name} filter="url(#hub-glow)" className="cursor-pointer"
                  onMouseEnter={() => setTip({ x: hub.x, y: hub.y, title: hub.name, sub: hub.role })}
                  onMouseLeave={() => setTip(null)}
                >
                  <circle cx={hub.x} cy={hub.y} r="2.4" fill="var(--operations)" stroke="var(--accent)" strokeWidth="0.7" />
                  <circle cx={hub.x} cy={hub.y} r="0.8" fill="var(--accent)" />
                </g>
              ))}
              {tip && (
                <g pointerEvents="none" transform={`translate(${tipX} ${tipY})`}>
                  <rect width={tipWidth} height="9.5" rx="1.6" fill="var(--operations)" stroke="var(--accent)" strokeWidth="0.3" opacity="0.97" />
                  <text x="4" y="4" fontSize="3.1" fontWeight="700" fill="var(--primary-foreground)" fontFamily="inherit">{tip.title}</text>
                  <text x="4" y="7.6" fontSize="2.4" fill="var(--accent)" fontFamily="inherit">{tip.sub}</text>
                </g>
              )}
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