"use client"

import React, { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, usePathname } from "@/navigation"
import { LucideIcon, ChevronDown, Search, Target, Share2, Code, Globe, Camera, Palette, Megaphone } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from 'next-intl'
import LanguageSwitcher from "./LanguageSwitcher"
import Image from "next/image"
import AnalysisModal from "./AnalysisModal"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
  hasMegaMenu?: boolean
}

interface ServiceItem {
  title: string
  description: string
  href: string
  icon: LucideIcon
}

export default function Navbar() {
  const t = useTranslations('Navbar')
  const st = useTranslations('Services')
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const openMenu = (name: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setIsHovered(name)
  }

  const closeMenu = () => {
    closeTimer.current = setTimeout(() => setIsHovered(null), 80)
  }

  const navItems: NavItem[] = [
    { name: t('home'), url: "/", icon: Globe },
    { name: t('about'), url: "/about", icon: Globe },
    { name: t('services'), url: "/services", icon: ChevronDown, hasMegaMenu: true },
    { name: t('references'), url: "/references", icon: Globe },
    { name: t('contact'), url: "/contact", icon: Globe },
  ]

  const services: ServiceItem[] = [
    { title: st('items.seo.title'), description: st('items.seo.description'), href: "/services/seo", icon: Search },
    { title: st('items.google-ads.title'), description: st('items.google-ads.description'), href: "/services/google-ads", icon: Target },
    { title: st('items.meta-ads.title'), description: st('items.meta-ads.description'), href: "/services/meta-ads", icon: Share2 },
    { title: st('items.web-design.title'), description: st('items.web-design.description'), href: "/services/web-design", icon: Code },
    { title: st('items.social-media.title'), description: st('items.social-media.description'), href: "/services/social-media", icon: Globe },
    { title: st('items.production.title'), description: st('items.production.description'), href: "/services/production", icon: Camera },
    { title: st('items.design.title'), description: st('items.design.description'), href: "/services/design", icon: Palette },
    { title: st('items.pr.title'), description: st('items.pr.description'), href: "/services/pr", icon: Megaphone },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const activeTab = navItems.find((item) => {
    if (item.url === "/") return pathname === "/" || pathname === ""
    return pathname.startsWith(item.url)
  })?.name || t('home')

  const servicesLabel = t('services')

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-12 py-5 flex items-center justify-between pointer-events-none">
      {/* Logo - Sol Taraf */}
      <div className="pointer-events-auto w-[225px] flex items-center">
        <Link href="/" className="flex items-center">
          <Image 
            src="/logos/Main_Logo_Beyaz.png" 
            alt="Renee DesignLab" 
            width={200} 
            height={60} 
            className="h-[60px] w-auto object-contain"
            priority
          />
        </Link>
      </div>

      {/* Nav Linkleri - Orta Kısım */}
      <div className="pointer-events-auto flex flex-col items-center">
        <div className="flex items-center gap-1 bg-white/5 border border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg relative max-w-fit">
          {navItems.map((item) => {
            const isActive = activeTab === item.name

            return (
              <div
                key={item.name}
                onMouseEnter={() => item.hasMegaMenu ? openMenu(item.name) : undefined}
                onMouseLeave={() => item.hasMegaMenu ? closeMenu() : undefined}
                className="relative"
              >
                <Link
                  href={item.url}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors flex items-center gap-2",
                    "text-white/60 hover:text-white",
                    isActive && "text-white"
                  )}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {item.name}
                    {item.hasMegaMenu && <ChevronDown className={cn("w-3 h-3 transition-transform duration-300", isHovered === item.name && "rotate-180")} />}
                  </span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="lamp"
                      className="absolute inset-0 bg-primary/10 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary-light rounded-t-full shadow-[0_-4px_8px_0_rgba(139,92,246,0.8)]">
                        <div className="absolute w-12 h-6 bg-primary/20 blur-md -top-2 -left-2" />
                        <div className="absolute w-8 h-6 bg-primary/20 blur-md -top-1" />
                        <div className="absolute w-4 h-4 bg-primary/20 blur-sm top-0 left-2" />
                      </div>
                    </motion.div>
                  )}
                </Link>
              </div>
            )
          })}
          <div className="pr-4 border-l border-white/10 ml-2 pl-4 flex items-center h-8">
              <LanguageSwitcher />
          </div>
        </div>

        {/* Mega Menu — sibling to the nav pill, centered below it */}
        <AnimatePresence>
          {isHovered === servicesLabel && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.18 }}
              onMouseEnter={() => openMenu(servicesLabel)}
              onMouseLeave={() => closeMenu()}
              className="absolute top-full mt-3 w-[640px] p-6 bg-background/95 border border-white/10 backdrop-blur-2xl rounded-[32px] shadow-2xl z-50"
            >
              <div className="grid grid-cols-2 gap-4">
                {services.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="flex items-start gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <service.icon className="w-5 h-5 text-primary-light" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white mb-1">{service.title}</div>
                      <div className="text-xs text-white/40 line-clamp-1">{service.description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sağ taraf - Analiz butonu */}
      <div className="pointer-events-auto hidden md:flex items-center justify-end w-[225px]">
        <AnalysisModal />
      </div>
    
    </header>
  )
}
