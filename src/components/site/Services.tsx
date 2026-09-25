import { useState } from "react";
import { Boxes, FileText, PackageCheck, Shirt, Truck, Wine, Zap, Laptop } from "lucide-react";

const SERVICES = [
  {
    icon: Zap,
    title: "Експрес-доставка",
    text: "Швидка доставка документів та посилок між містами за 20 годин.",
    price: "Від 70 грн",
  },
  {
    icon: PackageCheck,
    title: "Безпечне пакування",
    text: "Професійні матеріали для крихких речей, скла, електроніки та габаритів.",
    price: "Від 15 грн",
  },
  {
    icon: Truck,
    title: "Кур'єрська доставка",
    text: "Забір або вручення посилки за адресою без черг та зайвих турбот.",
    price: "Від 50 грн",
  },
  {
    icon: Boxes,
    title: "Вантажні перевезення",
    text: "Оптимальні рішення для великого бізнесу, інтернет-магазинів та палет.",
    price: "Від 300 грн",
  },
];

const PACKING = [
  {
    id: "fragile",
    label: "Крихке",
    icon: Wine,
    rules: [
      "Обгортання бульбашковою плівкою у 2–3 шари.",
      "Жорстка коробка з наповнювачем по периметру.",
      "Маркування «Обережно, скло» на двох сторонах.",
      "Порожнини всередині заповнюються папером або пінопластом.",
    ],
  },
  {
    id: "clothes",
    label: "Одяг",
    icon: Shirt,
    rules: [
      "Вакуумний або поліетиленовий пакет від вологи.",
      "Складання без металевих вішаків усередині.",
      "Для дорогих речей — картонна коробка замість пакета.",
      "Взуття відправляється у власній коробці.",
    ],
  },
  {
    id: "docs",
    label: "Документи",
    icon: FileText,
    rules: [
      "Жорсткий картонний конверт формату А4.",
      "Файл-протектор від вологи та згинів.",
      "Опис вкладення для важливих оригіналів.",
      "Рекомендуємо оголошену цінність відправлення.",
    ],
  },
  {
    id: "tech",
    label: "Техніка",
    icon: Laptop,
    rules: [
      "Заводська коробка або аналог із амортизацією.",
      "Акумулятори фіксуються окремо, клеми ізолюються.",
      "Мінімум 5 см наповнювача з кожного боку.",
      "Обов'язкова страховка на повну вартість.",
    ],
  },
];

export function Services() {
  const [active, setActive] = useState("fragile");
  const current = PACKING.find((p) => p.id === active) ?? PACKING[0]!;

  return (
    <section id="services" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">Що ми робимо</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Наші послуги та правила пакування
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, text, price }) => (
            <article
              key={title}
              className="card-lift flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-primary-soft text-primary">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-primary">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
              <p className="mt-5 inline-flex w-fit rounded-full bg-accent-soft px-3 py-1 text-sm font-bold text-accent">
                {price}
              </p>
            </article>
          ))}
        </div>

        <div
          id="packaging"
          className="mt-16 scroll-mt-28 rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-card)] sm:p-9"
        >
          <h3 className="text-xl font-bold text-primary sm:text-2xl">Перевірити правила пакування</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Оберіть тип вкладення — покажемо вимоги до упаковки.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {PACKING.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActive(id)}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-all ${
                  active === id
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-card)]"
                    : "bg-surface text-foreground/75 hover:bg-primary-soft hover:text-primary"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>

          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {current.rules.map((rule) => (
              <li
                key={rule}
                className="flex items-start gap-3 rounded-xl bg-surface p-4 text-sm text-foreground/85"
              >
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" />
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
