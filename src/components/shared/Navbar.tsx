"use client"

import { useEffect, useMemo, useRef, useState, useCallback } from "react"
import { Link, usePathname } from "@/navigation"
import {
  type LucideIcon,
  ChevronDown,
  GraduationCap,
  BookOpen,
  Menu,
  X,
  Trophy,
  Star,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import Image from "next/image"
import dynamic from "next/dynamic"
import ThemeToggle from "./ThemeToggle"

const AnalysisModal = dynamic(() => import("./AnalysisModal"), { ssr: false })

/** Program başlıkları sunucudan prop olarak gelir — böylece 34 kB'lık
 *  `Services` çeviri namespace'i client bundle'ına hiç girmez. */
export interface NavService {
  slug: string
  title: string
  description: string
}

const SLUG_ICONS: Record<string, LucideIcon> = {
  "6-sinif": GraduationCap,
  "7-sinif": GraduationCap,
  "8-sinif": Trophy,
  "9-sinif": BookOpen,
  "10-sinif": BookOpen,
  "11-sinif": GraduationCap,
  "12-sinif": Trophy,
  mezun: Trophy,
  "8-sinif-vip": Star,
  "12-sinif-vip": Star,
}

interface NavItem {
  name: string
  url: string
  hasMegaMenu?: boolean
}

export default function Navbar({ services = [] }: { services?: NavService[] }) {
  const t = useTranslations("Navbar")
  const pathname = usePathname()
  const [megaOpen, setMegaOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openMega = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setMegaOpen(true)
  }, [])

  const closeMega = useCallback(() => {
    closeTimer.current = setTimeout(() => setMegaOpen(false), 80)
  }, [])

  useEffect(
    () => () => {
      if (closeTimer.current) clearTimeout(closeTimer.current)
    },
    [],
  )

  const navItems: NavItem[] = useMemo(
    () => [
      { name: t("home"), url: "/" },
      { name: t("about"), url: "/about" },
      { name: t("services"), url: "/services", hasMegaMenu: true },
      { name: t("guidance"), url: "/rehberlik" },
      { name: t("references"), url: "/references" },
      { name: t("contact"), url: "/contact" },
    ],
    [t],
  )

  // Rota değişince mobil menüyü ve mega menüyü kapat
  useEffect(() => {
    setIsMobileOpen(false)
    setMobileServicesOpen(false)
    setMegaOpen(false)
  }, [pathname])

  // Mobil menü açıkken arka plan scroll'unu kilitle
  useEffect(() => {
    if (!isMobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [isMobileOpen])

  const activeTab =
    navItems.find((item) =>
      item.url === "/" ? pathname === "/" || pathname === "" : pathname.startsWith(item.url),
    )?.name || t("home")

  return (
    <>
      {/* Mobil üst şerit — düz renk, backdrop blur YOK (iOS Safari GPU kilidi) */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 h-[74px] surface border-b pointer-events-none" />

      <header className="fixed top-0 left-0 right-0 z-50 w-full px-6 md:px-12 py-5 flex items-center justify-between pointer-events-none">
        {/* Logo */}
        <div className="pointer-events-auto flex items-center">
          <Link href="/" className="flex items-center" aria-label="Ana sayfa">
            <Image
              src="/logos/Sevinc-Kurs-Logo.png"
              alt="Bahçelievler Sevinç Dershanesi"
              width={80}
              height={80}
              sizes="80px"
              className="h-[56px] w-[56px] md:h-[72px] md:w-[72px] object-contain"
              priority
            />
          </Link>
        </div>

        {/* Masaüstü nav */}
        <div className="pointer-events-auto hidden md:flex flex-col items-center">
          <div className="flex items-center gap-1 surface border py-1 px-1 rounded-full shadow-lg relative max-w-fit">
            {navItems.map((item) => {
              const isActive = activeTab === item.name
              return (
                <div
                  key={item.name}
                  onMouseEnter={item.hasMegaMenu ? openMega : undefined}
                  onMouseLeave={item.hasMegaMenu ? closeMega : undefined}
                  className="relative"
                >
                  <Link
                    href={item.url}
                    className={cn(
                      "relative cursor-pointer text-sm font-semibold px-5 py-2 rounded-full transition-colors flex items-center gap-2",
                      isActive
                        ? "bg-primary/10 text-primary-dark dark:text-primary-light"
                        : "text-black/70 hover:text-black hover:bg-black/5 dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10",
                    )}
                  >
                    {item.name}
                    {item.hasMegaMenu && (
                      <ChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform duration-300",
                          megaOpen && "rotate-180",
                        )}
                      />
                    )}
                  </Link>
                </div>
              )
            })}
            <div className="border-l border-black/10 dark:border-white/10 ml-2 pl-3 flex items-center h-8">
              <ThemeToggle />
            </div>
          </div>

          {/* Mega menü */}
          {megaOpen && services.length > 0 && (
            <div
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              className="absolute top-full mt-3 w-[640px] p-6 rounded-[32px] shadow-2xl z-50 border surface-strong animate-pop-in"
            >
              <div className="grid grid-cols-2 gap-3">
                {services.map((service) => {
                  const Icon = SLUG_ICONS[service.slug] ?? BookOpen
                  return (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      className="flex items-start gap-4 p-4 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-black dark:text-white mb-1">
                          {service.title}
                        </div>
                        <div className="text-xs text-black/45 dark:text-white/40 line-clamp-1">
                          {service.description}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Masaüstü CTA */}
        <div className="pointer-events-auto hidden md:flex items-center justify-end">
          <AnalysisModal />
        </div>

        {/* Hamburger */}
        <button
          className="pointer-events-auto md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 text-black dark:text-white"
          onClick={() => setIsMobileOpen((v) => !v)}
          aria-label="Menüyü aç/kapat"
          aria-expanded={isMobileOpen}
        >
          <span className="relative w-5 h-5">
            <Menu
              className={cn(
                "absolute inset-0 w-5 h-5 transition-all duration-200",
                isMobileOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0",
              )}
            />
            <X
              className={cn(
                "absolute inset-0 w-5 h-5 transition-all duration-200",
                isMobileOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90",
              )}
            />
          </span>
        </button>
      </header>

      {/* Mobil menü — CSS transform ile aç/kapa (framer-motion yok) */}
      <div
        className={cn(
          "fixed inset-0 z-[45] flex flex-col md:hidden surface-strong transition-transform duration-300 ease-out",
          isMobileOpen ? "translate-x-0" : "translate-x-full pointer-events-none",
        )}
        aria-hidden={!isMobileOpen}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 dark:border-white/10">
          <Link href="/" onClick={() => setIsMobileOpen(false)} aria-label="Ana sayfa">
            <Image
              src="/logos/Sevinc-Kurs-Logo.png"
              alt="Bahçelievler Sevinç Dershanesi"
              width={56}
              height={56}
              sizes="56px"
              className="h-[52px] w-[52px] object-contain"
            />
          </Link>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="w-10 h-10 rounded-full bg-black/10 dark:bg-white/10 border border-black/10 dark:border-white/10 flex items-center justify-center text-black dark:text-white"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overscroll-contain px-6 py-8 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.name
            if (item.hasMegaMenu) {
              return (
                <div key={item.name}>
                  <button
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    aria-expanded={mobileServicesOpen}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-4 rounded-2xl text-left text-base font-semibold transition-colors",
                      isActive
                        ? "bg-primary/10 text-black dark:text-white"
                        : "text-black/60 hover:text-black hover:bg-black/5 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5",
                    )}
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      className={cn(
                        "w-4 h-4 transition-transform duration-300",
                        mobileServicesOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-out",
                      mobileServicesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="flex flex-col gap-1 pl-2 pt-2 pb-2">
                        {services.map((service) => {
                          const Icon = SLUG_ICONS[service.slug] ?? BookOpen
                          return (
                            <Link
                              key={service.slug}
                              href={`/services/${service.slug}`}
                              onClick={() => setIsMobileOpen(false)}
                              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                            >
                              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                <Icon className="w-4 h-4 text-primary" />
                              </div>
                              <span className="text-sm font-medium text-black/60 group-hover:text-black dark:text-white/70 dark:group-hover:text-white transition-colors">
                                {service.title}
                              </span>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )
            }
            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "px-4 py-4 rounded-2xl text-base font-semibold transition-colors",
                  isActive
                    ? "bg-primary/10 text-black dark:text-white"
                    : "text-black/60 hover:text-black hover:bg-black/5 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/5",
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="px-6 py-6 border-t border-black/10 dark:border-white/10 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <ThemeToggle className="flex-shrink-0" />
            <span className="text-xs text-black/40 dark:text-white/40 select-none">Tema</span>
          </div>
          {isMobileOpen && <AnalysisModal />}
        </div>
      </div>
    </>
  )
}
