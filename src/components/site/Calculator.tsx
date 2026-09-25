import { useMemo, useState } from "react";
import { Calculator as CalcIcon } from "lucide-react";

const SIZES = [
  { id: "small", label: "Мала (до 2 кг)", city: 70, ukraine: 90 },
  { id: "medium", label: "Середня (до 10 кг)", city: 115, ukraine: 135 },
  { id: "large", label: "Велика (до 30 кг)", city: 180, ukraine: 200 },
] as const;

const ZONES = [
  { id: "city", label: "По місту" },
  { id: "ukraine", label: "По Україні" },
] as const;

type SizeId = (typeof SIZES)[number]["id"];
type ZoneId = (typeof ZONES)[number]["id"];

const VILLAGE_FEE = 30;
const POSTAMAT_FEE = 10;
const OVERSIZE_FEE_PER_PLACE = 100;
const COURIER_FEE = 60;

export function Calculator() {
  const [size, setSize] = useState<SizeId>("small");
  const [zone, setZone] = useState<ZoneId>("city");
  const [village, setVillage] = useState(false);
  const [postamat, setPostamat] = useState(false);
  const [oversize, setOversize] = useState(false);
  const [places, setPlaces] = useState(1);
  const [courier, setCourier] = useState(false);

  const selected = SIZES.find((s) => s.id === size) ?? SIZES[0];
  const isUkraine = zone === "ukraine";

  const breakdown = useMemo(() => {
    const lines: { label: string; amount: number }[] = [];

    const base = isUkraine ? selected.ukraine : selected.city;
    lines.push({
      label: `${selected.label} · ${isUkraine ? "по Україні" : "по місту"}`,
      amount: base,
    });

    if (village && isUkraine) {
      lines.push({ label: "Доставка у селище/село", amount: VILLAGE_FEE });
    }
    if (postamat) {
      lines.push({ label: "Доставка у поштомат", amount: POSTAMAT_FEE });
    }
    if (oversize) {
      const count = Math.max(1, Math.min(20, Math.round(places)));
      const word = count % 10 === 1 && count !== 11 ? "місце" : count % 10 >= 2 && count % 10 <= 4 && (count < 12 || count > 14) ? "місця" : "місць";
      lines.push({
        label: `Габарит понад 120 см / без коробки · ${count} ${word}`,
        amount: OVERSIZE_FEE_PER_PLACE * count,
      });
    }
    if (courier) {
      lines.push({ label: "Кур'єрський забір або доставка", amount: COURIER_FEE });
    }

    const total = lines.reduce((sum, l) => sum + l.amount, 0);
    return { lines, total };
  }, [selected, isUkraine, village, postamat, oversize, places, courier]);

  return (
    <section id="rates" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">Тарифи</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Офіційні тарифи та розрахунок вартості
          </h2>
        </div>

        {/* Таблиця базових тарифів */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead>
                <tr className="bg-surface text-primary">
                  <th className="px-6 py-4 font-semibold">Тип посилки</th>
                  <th className="px-6 py-4 font-semibold">По місту</th>
                  <th className="px-6 py-4 font-semibold">По Україні</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {SIZES.map((s) => (
                  <tr key={s.id} className="text-foreground/85">
                    <td className="px-6 py-4 font-medium text-primary">{s.label}</td>
                    <td className="px-6 py-4">{s.city} грн</td>
                    <td className="px-6 py-4">{s.ukraine} грн</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border bg-surface/60 px-6 py-4 text-sm text-foreground/75">
            <p className="font-semibold text-primary">Додатково:</p>
            <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
              <li>• Доставка у селища/села — +{VILLAGE_FEE} грн</li>
              <li>• Доставка у поштомат — +{POSTAMAT_FEE} грн</li>
              <li>• Габарит понад 120 см або без коробки — +{OVERSIZE_FEE_PER_PLACE} грн за місце</li>
              <li>• Кур'єрський забір або доставка — +{COURIER_FEE} грн (до 30 кг)</li>
            </ul>
          </div>
        </div>

        {/* Калькулятор */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-primary">
                Тип посилки
                <select
                  value={size}
                  onChange={(e) => {
                    const next = e.target.value as SizeId;
                    setSize(next);
                    if (next === "large") setVillage((v) => v); // village still allowed up to 30 kg
                  }}
                  className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal text-foreground outline-none focus:border-accent"
                >
                  {SIZES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm font-semibold text-primary">
                Напрямок доставки
                <select
                  value={zone}
                  onChange={(e) => {
                    const next = e.target.value as ZoneId;
                    setZone(next);
                    if (next === "city") setVillage(false);
                  }}
                  className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal text-foreground outline-none focus:border-accent"
                >
                  {ZONES.map((z) => (
                    <option key={z.id} value={z.id}>
                      {z.label}
                    </option>
                  ))}
                </select>
              </label>

              <fieldset className="sm:col-span-2">
                <legend className="text-sm font-semibold text-primary">Додаткові опції</legend>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  <label className="flex items-center gap-3 rounded-xl bg-surface p-4 text-sm font-medium text-foreground/85">
                    <input
                      type="checkbox"
                      checked={postamat}
                      onChange={(e) => setPostamat(e.target.checked)}
                      className="size-4 accent-[var(--accent)]"
                    />
                    Доставка у поштомат (+{POSTAMAT_FEE} грн)
                  </label>

                  <label
                    className={
                      "flex items-center gap-3 rounded-xl bg-surface p-4 text-sm font-medium text-foreground/85" +
                      (isUkraine ? "" : " opacity-50")
                    }
                    title={isUkraine ? undefined : "Доступно лише для доставки по Україні"}
                  >
                    <input
                      type="checkbox"
                      checked={village && isUkraine}
                      disabled={!isUkraine}
                      onChange={(e) => setVillage(e.target.checked)}
                      className="size-4 accent-[var(--accent)]"
                    />
                    Доставка у селище/село (+{VILLAGE_FEE} грн)
                  </label>

                  <label className="flex items-center gap-3 rounded-xl bg-surface p-4 text-sm font-medium text-foreground/85">
                    <input
                      type="checkbox"
                      checked={oversize}
                      onChange={(e) => setOversize(e.target.checked)}
                      className="size-4 accent-[var(--accent)]"
                    />
                    Габарит 120+ см / без коробки
                  </label>

                  <label className="flex items-center gap-3 rounded-xl bg-surface p-4 text-sm font-medium text-foreground/85">
                    <input
                      type="checkbox"
                      checked={courier}
                      onChange={(e) => setCourier(e.target.checked)}
                      className="size-4 accent-[var(--accent)]"
                    />
                    Кур'єрський забір/доставка (+{COURIER_FEE} грн)
                  </label>

                  {oversize && (
                    <label className="block text-sm font-semibold text-primary sm:col-span-2">
                      Кількість місць (по +{OVERSIZE_FEE_PER_PLACE} грн за місце)
                      <input
                        type="number"
                        min={1}
                        max={20}
                        value={places}
                        onChange={(e) => setPlaces(Number(e.target.value))}
                        className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal text-foreground outline-none focus:border-accent"
                      />
                    </label>
                  )}
                </div>
              </fieldset>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-3xl bg-primary p-8 text-primary-foreground shadow-[var(--shadow-lift)]">
            <div>
              <CalcIcon className="size-7 text-accent" />
              <p className="mt-4 text-sm text-primary-foreground/75">Орієнтовна вартість</p>
              <p className="mt-2 text-5xl font-extrabold tracking-tight">{breakdown.total} грн</p>

              <ul className="mt-6 space-y-2 text-sm text-primary-foreground/85">
                {breakdown.lines.map((line) => (
                  <li key={line.label} className="flex items-baseline justify-between gap-4">
                    <span>{line.label}</span>
                    <span className="shrink-0 font-semibold">{line.amount} грн</span>
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-8 text-sm text-primary-foreground/70">
              Остаточна вартість залежить від фактичної ваги та габаритів після огляду відправлення.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
