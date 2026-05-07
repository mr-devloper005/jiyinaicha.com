import Link from "next/link";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { Footer } from "@/components/shared/footer";
import { ContentImage } from "@/components/shared/content-image";
import { SITE_CONFIG } from "@/lib/site-config";
import { ArrowRight, Sparkles, Users, TrendingUp, ShieldCheck, MapPin, Zap } from "lucide-react";

const HERO_PHOTO =
  'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80'

const tone = {
  shell: 'bg-[#f4faf7] text-[#0c1a14]',
  hero: 'relative isolate min-h-[520px] overflow-hidden bg-[#0a1f16]',
  heroOverlay: 'absolute inset-0 bg-[linear-gradient(180deg,rgba(6,28,20,0.55)_0%,rgba(8,42,30,0.88)_55%,rgba(10,52,38,0.92)_100%)]',
  title: 'text-white',
  badge: 'bg-[#8df0c8] text-[#07111f]',
  action: 'bg-[#134d3a] text-white hover:bg-[#0f3d2e]',
  actionAlt: 'border border-white/10 bg-white/6 text-white hover:bg-white/10',
  panel: 'border border-[#c5d9cc] bg-white shadow-[0_22px_60px_rgba(8,40,28,0.07)]',
  soft: 'border border-[#cfe5d6] bg-[#f4faf7]',
  muted: 'text-[#3d5248]',
}

const highlights = [
  { label: "Active classified ads", value: "12k+", icon: TrendingUp },
  { label: "Categories covered", value: "40+", icon: Zap },
  { label: "Monthly visitors", value: "180k", icon: Users },
];

const features = [
  { 
    icon: ShieldCheck, 
    title: "Built for scanning", 
    description: "Categories, photos, and price cues are easy to read on any device. No clutter, just what you need to make decisions." 
  },
  { 
    icon: MapPin, 
    title: "Local first", 
    description: "We emphasize nearby deals and clear location context on every listing. Find what's in your neighborhood." 
  },
  { 
    icon: Sparkles, 
    title: "Straightforward posting", 
    description: "Publish an ad quickly—no clutter from unrelated content types. List it, price it, sell it." 
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <NavbarShell />
      <main className="overflow-x-hidden">
        <section className={tone.hero}>
          <div className="absolute inset-0">
            <ContentImage src={HERO_PHOTO} alt="About background" fill className="object-cover opacity-90" priority sizes="100vw" intrinsicWidth={2000} intrinsicHeight={1200} />
          </div>
          <div className={tone.heroOverlay} />
          <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pb-20 pt-16 text-center sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
            <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] ${tone.badge}`}>
              <Sparkles className="h-3.5 w-3.5 text-[#5ee9b5]" />
              About us
            </span>
            <h1 className={`mt-7 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.15rem] ${tone.title}`}>
              Classifieds, <span className="block text-[0.92em] font-medium text-white/95">without the junk drawer</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              {SITE_CONFIG.name} focuses on what moves in a local market: clear ads, honest categories, and search that stays relevant to buyers and sellers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard/ads/new" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${tone.action}`}>
                Post an ad
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/contact" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${tone.actionAlt}`}>
                Contact us
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#f6fbf8] py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 lg:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.label} className={`rounded-[2rem] p-8 ${tone.panel}`}>
                  <item.icon className="h-8 w-8 text-[#134d3a]" />
                  <div className="mt-4 text-4xl font-semibold text-[#0c1a14]">{item.value}</div>
                  <div className={`mt-2 text-sm ${tone.muted}`}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#3d5248]">Why choose us</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#0c1a14]">Built for local markets</h2>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className={`rounded-[2rem] p-8 ${tone.panel}`}>
                <feature.icon className="h-6 w-6 text-[#134d3a]" />
                <h3 className="mt-4 text-xl font-semibold text-[#0c1a14]">{feature.title}</h3>
                <p className={`mt-3 text-sm leading-7 ${tone.muted}`}>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#f6fbf8] py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className={`grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center ${tone.panel} rounded-[2rem] p-8`}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#3d5248]">Our mission</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#0c1a14]">Making local buying and selling simple</h2>
                <p className={`mt-4 text-sm leading-7 ${tone.muted}`}>
                  We believe classifieds should be fast, clear, and focused on what actually matters: connecting buyers and sellers in your community. No algorithms deciding what you see, no confusing interfaces—just straightforward listings that help you find what you're looking for.
                </p>
                <div className="mt-6">
                  <Link href="/classifieds" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${tone.action}`}>
                    Browse classifieds
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="relative min-h-[300px] overflow-hidden rounded-[2rem]">
                <ContentImage src={HERO_PHOTO} alt="Our mission" fill className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
