import { useState, type FormEvent } from "react";
import { MapPin, Phone, Mail, Send, MessageCircle, Facebook, Instagram, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SOCIALS = [
  { icon: Send, label: "Telegram" },
  { icon: MessageCircle, label: "Viber" },
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
];

export function Contacts() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    toast.success("Запит надіслано! Ми зв'яжемося з вами найближчим часом.");
    (e.currentTarget as HTMLFormElement).reset();
  };

  return (
    <footer id="contacts" className="bg-primary py-20 text-primary-foreground lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Контакти</h2>
            <p className="mt-4 max-w-md text-primary-foreground/75">
              Залиште заявку — і наш кур'єр забере посилку за вашою адресою вже сьогодні.
            </p>

            <ul className="mt-9 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <MapPin className="size-5 shrink-0 text-accent" />
                м. Київ, вул. Логістична, 12
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-5 shrink-0 text-accent" />
                <a href="tel:+380800500555" className="hover:text-accent">
                  +380 800 500 555
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-5 shrink-0 text-accent" />
                <a href="mailto:support@novaexpert.ua" className="hover:text-accent">
                  support@novaexpert.ua
                </a>
              </li>
            </ul>

            <div className="mt-9 flex gap-3">
              {SOCIALS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#contacts"
                  aria-label={label}
                  className="grid size-11 place-items-center rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          <form
            onSubmit={onSubmit}
            className="rounded-3xl bg-background p-6 shadow-[var(--shadow-lift)] sm:p-8"
          >
            <h3 className="text-xl font-bold text-primary">Швидкий запит</h3>
            <div className="mt-6 space-y-4">
              <label className="block text-sm font-semibold text-primary">
                Ваше ім'я
                <input
                  required
                  name="name"
                  className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal text-foreground outline-none focus:border-accent"
                />
              </label>
              <label className="block text-sm font-semibold text-primary">
                Телефон
                <input
                  required
                  type="tel"
                  name="phone"
                  placeholder="+380"
                  className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3 text-sm font-normal text-foreground outline-none focus:border-accent"
                />
              </label>
              <label className="block text-sm font-semibold text-primary">
                Повідомлення
                <textarea
                  name="message"
                  rows={4}
                  className="mt-2 w-full rounded-xl border border-input bg-background p-3 text-sm font-normal text-foreground outline-none focus:border-accent"
                />
              </label>
              <Button type="submit" variant="cta" size="lg" className="w-full">
                Надіслати запит
              </Button>
              {sent && (
                <p className="text-center text-sm text-muted-foreground">
                  Дякуємо! Ми передзвонимо протягом 15 хвилин.
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-primary-foreground/15 pt-8 text-sm text-primary-foreground/70">
          <span className="flex items-center gap-2 font-semibold">
            <Package className="size-4 text-accent" />
            NovaExpert
          </span>
          <span>© {new Date().getFullYear()} NovaExpert. Усі права захищені.</span>
        </div>
      </div>
    </footer>
  );
}
