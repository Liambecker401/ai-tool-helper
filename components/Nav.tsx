import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/models", label: "Models" },
  { href: "/rankings", label: "Rankings" },
  { href: "/settings", label: "Settings" },
];

export function Nav() {
  return (
    <header className="border-b bg-background">
      <nav className="mx-auto flex w-full max-w-5xl items-center gap-2 px-6 py-4">
        <Link className="mr-4 text-sm font-semibold" href="/">
          AI Tool Helper
        </Link>
        <div className="flex flex-wrap items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
