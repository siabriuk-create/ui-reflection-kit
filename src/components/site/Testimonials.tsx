import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Андрій Шевченко",
    text: "Дуже зручно! Відправив крихкий керамічний посуд — загорнули в надійне пакування, доїхало в ідеальному стані. Рекомендую!",
  },
  {
    name: "Олена Коваленко",
    text: "Працюю з інтернет-магазином, постійно відправляю замовлення клієнтам. Швидко оформлюють накладні, жодних затримок.",
  },
  {
    name: "Максим Бондар",
    text: "Кур'єр приїхав чітко вчасно, забрав важку коробку з дому. Економія часу колосальна, сервіс на висоті!",
  },
  {
    name: "Ірина Мельник",
    text: "Приємні оператори у відділенні та зручна підказка щодо пакування. Тепер тільки сюди!",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-accent uppercase">Довіра</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
            Відгуки клієнтів
          </h2>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REVIEWS.map(({ name, text }) => (
            <figure
              key={name}
              className="card-lift flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
            >
              <div className="flex gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">
                “{text}”
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-soft text-sm font-bold text-primary">
                  {name.charAt(0)}
                </span>
                <span className="truncate text-sm font-semibold text-primary">{name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
