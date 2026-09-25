import { Package, Phone, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "#business", label: "Для бізнесу" },
  { href: "#coverage", label: "Покриття" },
  { href: "#rates", label: "Калькулятор" },
  { href: "#services", label: "Послуги" },
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
      className={`fixed inset-x-0 top-0 z-50 text-primary-foreground transition-all duration-300 ${
        scrolled
          ? "border-b border-primary-foreground/10 bg-operations/90 shadow-[var(--shadow-card)] backdrop-blur-xl"
          : "bg-operations/35 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:py-4">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent text-accent-foreground">
            <Package className="size-5" />
          </span>
          <span className="truncate font-heading text-lg font-black text-primary-foreground">
            Nova<span className="text-accent">Expert</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-semibold text-primary-foreground/70 transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+380800500555"
            className="hidden items-center gap-2 text-sm font-semibold text-primary-foreground md:flex"
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
            className="grid size-10 shrink-0 place-items-center rounded-md border border-primary-foreground/20 text-primary-foreground lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-primary-foreground/10 bg-operations px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-primary-foreground/80 transition-colors hover:bg-primary-foreground/10 hover:text-accent"
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
