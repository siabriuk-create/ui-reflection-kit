import { useMemo, useState } from "react";
import { Calculator as CalcIcon } from "lucide-react";

const TYPES = [
  { id: "docs", label: "Документи", base: 70, perKm: 0.35 },
  { id: "p2", label: "Посилка до 2 кг", base: 95, perKm: 0.5 },
  { id: "p10", label: "Посилка до 10 кг", base: 150, perKm: 0.8 },
  { id: "cargo", label: "Вантаж", base: 300, perKm: 1.4 },
];

const CITIES: Record<string, number> = {
  Київ: 0,
  Львів: 540,
  Одеса: 475,
  Харків: 480,
  Дніпро: 480,
  Вінниця: 270,
  Запоріжжя: 520,
  Полтава: 340,
};
const CITY_NAMES = Object.keys(CITIES);

export function Calculator() {
  const [type, setType] = useState("p2");
  const [from, setFrom] = useState("Київ");
  const [to, setTo] = useState("Львів");
  const [courier, setCourier] = useState(true);

  const price = useMemo(() => {
    const t = TYPES.find((x) => x.id === type) ?? { base: 70, perKm: 0.35 };
    const distance = Math.max(40, Math.abs((CITIES[from] ?? 0) - (CITIES[to] ?? 0)) || 320);
    return Math.round((t.base + distance * t.perKm + (courier ? 50 : 0)) / 5) * 5;
  }, [type, from, to, courier]);

  return (
    <section id="rates" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">Тарифи</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Швидкий розрахунок вартості
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-primary sm:col-span-2">
                Тип відправлення
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal text-foreground outline-none focus:border-accent"
                >
                  {TYPES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-semibold text-primary">
                Місто відправника
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal text-foreground outline-none focus:border-accent"
                >
                  {CITY_NAMES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-semibold text-primary">
                Місто одержувача
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal text-foreground outline-none focus:border-accent"
                >
                  {CITY_NAMES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>

              <label className="flex items-center gap-3 rounded-xl bg-surface p-4 text-sm font-medium text-foreground/85 sm:col-span-2">
                <input
                  type="checkbox"
                  checked={courier}
                  onChange={(e) => setCourier(e.target.checked)}
                  className="size-4 accent-[var(--accent)]"
                />
                Забір кур'єром за адресою (+50 грн)
              </label>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl bg-primary p-8 text-primary-foreground shadow-[var(--shadow-lift)]">
            <div>
              <CalcIcon className="size-7 text-accent" />
              <p className="mt-4 text-sm text-primary-foreground/75">Орієнтовна вартість</p>
              <p className="mt-2 text-5xl font-extrabold tracking-tight">{price} грн</p>
              <p className="mt-3 text-sm text-primary-foreground/70">
                {from} → {to} · доставка 1–2 дні
              </p>
            </div>
            <ul className="mt-8 space-y-2 text-sm text-primary-foreground/80">
              <li>• Безкоштовне базове пакування</li>
              <li>• Відстеження на кожному етапі</li>
              <li>• Оплата при отриманні</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
