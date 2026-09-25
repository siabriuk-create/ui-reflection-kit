import { Package, Phone, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "#services", label: "Послуги" },
  { href: "#packaging", label: "Пакування" },
  { href: "#rates", label: "Тарифи" },
  { href: "#about", label: "Про нас" },
  { href: "#contacts", label: "Контакти" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/70 bg-background/85 shadow-[var(--shadow-card)] backdrop-blur-md"
          : "bg-background/40 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:py-4">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Package className="size-5" />
          </span>
          <span className="truncate text-lg font-extrabold tracking-tight text-primary">
            Nova<span className="text-accent">Expert</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+380800500555"
            className="hidden items-center gap-2 text-sm font-semibold text-primary md:flex"
          >
            <Phone className="size-4 text-accent" />
            +380 800 500 555
          </a>
          <Button variant="cta" size="lg" className="hidden sm:inline-flex" asChild>
            <a href="#contacts">Викликати кур'єра</a>
          </Button>
          <button
            type="button"
            aria-label="Меню"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 shrink-0 place-items-center rounded-xl border border-border text-primary lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-foreground/85 transition-colors hover:bg-surface hover:text-accent"
              >
                {item.label}
              </a>
            ))}
            <Button variant="cta" className="mt-2" asChild>
              <a href="#contacts" onClick={() => setOpen(false)}>
                Викликати кур'єра
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
