import { Gauge, ShieldCheck, Headphones } from "lucide-react";

const ADVANTAGES = [
  {
    icon: Gauge,
    title: "Швидкість доставки",
    text: "Оптимізовані маршрути та нічне сортування — посилка їде без простоїв.",
  },
  {
    icon: ShieldCheck,
    title: "Безпека вантажу",
    text: "Сучасні матеріали, контроль на кожному хабі та страхування відправлень.",
  },
  {
    icon: Headphones,
    title: "Професійний сервіс",
    text: "Підтримка 24/7 та персональний менеджер для бізнес-клієнтів.",
  },
];

export function About() {
  return (
    <section id="about" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold tracking-wide text-accent uppercase">Про нас</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-primary sm:text-4xl">
              Команда, якій довіряють тисячі відправлень щодня
            </h2>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              NovaExpert – це команда професіоналів у сфері логістики, які щодня опрацьовують тисячі
              відправлень із турботою про кожного клієнта. Ми поєднуємо швидкісні маршрути, сучасні
              стандарти сортування та бездоганний клієнтський сервіс. Наша мета — зробити кожне
              відправлення простим, безпечним і швидким для вас.
            </p>
          </div>

          <div className="grid gap-4">
            {ADVANTAGES.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="card-lift grid grid-cols-[auto_minmax(0,1fr)] gap-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="size-6" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-primary">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
