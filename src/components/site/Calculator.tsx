import { useMemo, useState, type ReactNode } from "react";
import { Calculator as CalcIcon, Check, Info } from "lucide-react";

const SIZES = [
  { id: "small", label: "Мала (до 2 кг)", city: 70, ukraine: 90, max: 2 },
  { id: "medium", label: "Середня (до 10 кг)", city: 115, ukraine: 135, max: 10 },
  { id: "large", label: "Велика (до 30 кг)", city: 180, ukraine: 200, max: 30 },
] as const;

const CITIES = ["Київ", "Львів", "Одеса", "Дніпро", "Харків", "Вінниця"];
const FEES = { postamat: 10, village: 30, courier: 60 };

export function Calculator() {
  const [origin, setOrigin] = useState("Київ");
  const [destination, setDestination] = useState("Львів");
  const [weight, setWeight] = useState(1);
  const [dimensions, setDimensions] = useState({ length: 20, width: 15, height: 10 });
  const [postamat, setPostamat] = useState(false);
  const [village, setVillage] = useState(false);
  const [courier, setCourier] = useState(false);

  const calculation = useMemo(() => {
    const normalizedWeight = Number.isFinite(weight) ? Math.max(weight, 0.1) : 0.1;
    const size = SIZES.find((item) => normalizedWeight <= item.max) ?? SIZES[2];
    const sameCity = origin === destination;
    const base = sameCity ? size.city : size.ukraine;
    const lines: Array<{ label: string; amount: number }> = [
      { label: `${size.label} · ${sameCity ? "по місту" : "по Україні"}`, amount: base },
    ];
    if (postamat) lines.push({ label: "Доставка у поштомат", amount: FEES.postamat });
    if (village) lines.push({ label: "Доставка у селище/село", amount: FEES.village });
    if (courier) lines.push({ label: "Курʼєрський забір або доставка", amount: FEES.courier });
    return { size, lines, total: lines.reduce((sum, line) => sum + line.amount, 0), overLimit: normalizedWeight > 30 };
  }, [courier, destination, origin, postamat, village, weight]);

  const updateDimension = (key: keyof typeof dimensions, value: string) => {
    setDimensions((current) => ({ ...current, [key]: Math.max(1, Number(value) || 1) }));
  };

  return (
    <section id="rates" className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="section-kicker">Розрахунок доставки</p>
            <h2 className="mt-4 max-w-2xl font-heading text-4xl font-black text-primary sm:text-5xl">Точний тариф ще до відправлення</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">Вкажіть маршрут, фактичну вагу та габарити. Категорія посилки визначиться автоматично.</p>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-card)] lg:grid-cols-[1.15fr_0.85fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Звідки"><select value={origin} onChange={(e) => setOrigin(e.target.value)} className="field-control">{CITIES.map((city) => <option key={city}>{city}</option>)}</select></Field>
              <Field label="Куди"><select value={destination} onChange={(e) => setDestination(e.target.value)} className="field-control">{CITIES.map((city) => <option key={city}>{city}</option>)}</select></Field>
              <Field label="Вага, кг"><input type="number" min="0.1" max="30" step="0.1" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="field-control" /></Field>
              <div>
                <span className="text-sm font-semibold text-primary">Габарити, см</span>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {(["length", "width", "height"] as const).map((key, index) => (
                    <input key={key} aria-label={["Довжина", "Ширина", "Висота"][index]} type="number" min="1" value={dimensions[key]} onChange={(e) => updateDimension(key, e.target.value)} className="field-control px-2 text-center" />
                  ))}
                </div>
              </div>
            </div>

            <fieldset className="mt-7">
              <legend className="text-sm font-semibold text-primary">Додаткові послуги</legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                <Option checked={postamat} onChange={setPostamat} label="Поштомат" price={FEES.postamat} />
                <Option checked={village} onChange={setVillage} label="Селище/село" price={FEES.village} />
                <Option checked={courier} onChange={setCourier} label="Курʼєр" price={FEES.courier} />
              </div>
            </fieldset>

            <div className="mt-8 overflow-x-auto border-t border-border pt-7">
              <table className="w-full min-w-[480px] text-left text-sm">
                <thead><tr className="text-muted-foreground"><th className="pb-3 font-medium">Тип посилки</th><th className="pb-3 font-medium">По місту</th><th className="pb-3 font-medium">По Україні</th></tr></thead>
                <tbody className="divide-y divide-border">
                  {SIZES.map((size) => <tr key={size.id} className={calculation.size.id === size.id ? "text-primary" : "text-foreground/70"}><td className="py-3 font-semibold">{size.label}</td><td className="py-3">{size.city} грн</td><td className="py-3">{size.ukraine} грн</td></tr>)}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="flex flex-col justify-between bg-primary p-7 text-primary-foreground sm:p-9 lg:p-10">
            <div>
              <div className="flex items-center justify-between"><CalcIcon className="size-7 text-accent" /><span className="rounded-md border border-primary-foreground/15 px-3 py-1 text-xs">Онлайн-розрахунок</span></div>
              <p className="mt-10 text-sm text-primary-foreground/60">Орієнтовна вартість</p>
              <p className="mt-2 font-heading text-5xl font-black">{calculation.total} грн</p>
              <ul className="mt-8 space-y-3 border-t border-primary-foreground/15 pt-6 text-sm">
                {calculation.lines.map((line) => <li key={line.label} className="flex items-start justify-between gap-4"><span className="flex gap-2 text-primary-foreground/75"><Check className="mt-0.5 size-4 shrink-0 text-accent" />{line.label}</span><strong className="shrink-0">{line.amount} грн</strong></li>)}
              </ul>
              {calculation.overLimit && <p className="mt-5 rounded-md bg-accent p-3 text-sm text-accent-foreground">Для відправлень понад 30 кг потрібен індивідуальний розрахунок.</p>}
            </div>
            <div className="mt-10 flex gap-3 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/55"><Info className="size-4 shrink-0 text-accent" /><p>Габарити: {dimensions.length} × {dimensions.width} × {dimensions.height} см. Прихованих доплат за розмір немає.</p></div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block text-sm font-semibold text-primary">{label}{children}</label>;
}

function Option({ checked, onChange, label, price }: { checked: boolean; onChange: (value: boolean) => void; label: string; price: number }) {
  return (
    <label className={`flex cursor-pointer items-center gap-3 rounded-md border p-4 transition-colors ${checked ? "border-accent bg-accent-soft" : "border-border bg-surface hover:border-primary/30"}`}>
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="sr-only" />
      <span className={`grid size-5 shrink-0 place-items-center rounded-sm border ${checked ? "border-accent bg-accent text-accent-foreground" : "border-input bg-background"}`}>{checked && <Check className="size-3" />}</span>
      <span className="min-w-0 text-sm font-semibold text-primary"><span className="block truncate">{label}</span><span className="text-xs font-normal text-muted-foreground">+{price} грн</span></span>
    </label>
  );
}