"use client";
import { useState } from "react";

interface NavItem {
  href: string;
  label: string;
}

interface NavigationBarProps {
  brand: string;
  brandColor?: string;
  brandHref?: string;
  items: NavItem[];
  accentColor?: string;
}

export function NavigationBar({
  brand,
  brandColor = "text-blue-600",
  brandHref = "/",
  items,
  accentColor = "text-blue-600",
}: NavigationBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const brandParts = brand.match(/^([A-Z][a-z]+)(.+)$/);

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href={brandHref} className="text-xl font-bold">
          {brandParts ? (
            <>
              <span className={brandColor}>{brandParts[1]}</span>
              {brandParts[2]}
            </>
          ) : (
            <span className={brandColor}>{brand}</span>
          )}
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`transition-colors hover:${accentColor}`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="メニュー"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <nav className="md:hidden border-t bg-white px-6 py-4 animate-slide-up">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="block py-2 text-sm transition-colors hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
