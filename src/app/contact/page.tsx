import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark, Plus, ArrowRight } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { ContentImage } from '@/components/shared/content-image'
import { SITE_CONFIG } from '@/lib/site-config'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { CONTACT_PAGE_OVERRIDE_ENABLED, ContactPageOverride } from '@/overrides/contact-page'

const getContactEmails = () => {
  const raw = (process.env.NEXT_PUBLIC_CONTACT_EMAILS || process.env.NEXT_PUBLIC_CONTACT_EMAIL || '').trim()
  if (!raw) return []
  return raw
    .split(/[,\n;]/g)
    .map((item) => item.trim())
    .filter(Boolean)
}

const getContactPhone = () => {
  return process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim() || ''
}

const getContactAddress = () => {
  return process.env.NEXT_PUBLIC_CONTACT_ADDRESS?.trim() || ''
}

const HERO_PHOTO =
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2000&q=80'

function getClassifiedMarketTone() {
  return {
    shell: 'bg-[#f4faf7] text-[#0c1a14]',
    hero: 'relative isolate min-h-[520px] overflow-hidden bg-[#0a1f16]',
    heroOverlay: 'absolute inset-0 bg-[linear-gradient(180deg,rgba(6,28,20,0.55)_0%,rgba(8,42,30,0.88)_55%,rgba(10,52,38,0.92)_100%)]',
    title: 'text-white',
    badge: 'bg-[#8df0c8] text-[#07111f]',
    action: 'bg-[#134d3a] text-white hover:bg-[#0f3d2e]',
    actionAlt: 'border border-white/10 bg-white/6 text-white hover:bg-white/10',
    pill: 'bg-white/10 backdrop-blur-sm',
    panel: 'border border-[#c5d9cc] bg-white shadow-[0_22px_60px_rgba(8,40,28,0.07)]',
    soft: 'border border-[#cfe5d6] bg-[#f4faf7]',
    muted: 'text-[#3d5248]',
  }
}

export default function ContactPage() {
  if (CONTACT_PAGE_OVERRIDE_ENABLED) {
    return <ContactPageOverride />
  }

  const tone = getClassifiedMarketTone()
  const contactEmails = getContactEmails()
  const contactPhone = getContactPhone()
  const contactAddress = getContactAddress()
  
  // Fallback email if none configured
  const displayEmails = contactEmails.length ? contactEmails : ['contact@jiyinaicha.com']

  return (
    <div className="min-h-screen">
      <NavbarShell />
      <main className="overflow-x-hidden">
        <section className={tone.hero}>
          <div className="absolute inset-0">
            <ContentImage src={HERO_PHOTO} alt="Contact background" fill className="object-cover opacity-90" priority sizes="100vw" intrinsicWidth={2000} intrinsicHeight={1200} />
          </div>
          <div className={tone.heroOverlay} />
          <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pb-20 pt-16 text-center sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
            <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] ${tone.badge}`}>
              <Mail className="h-3.5 w-3.5 text-[#5ee9b5]" />
              Get in touch
            </span>
            <h1 className={`mt-7 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.15rem] ${tone.title}`}>
              We're here to help <span className="block text-[0.92em] font-medium text-white/95">with anything you need</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
              Have questions about listings, ads, or your account? Reach out and we'll get back to you as soon as possible.
            </p>
          </div>
        </section>

        <section className="bg-[#f6fbf8] py-14 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
              <div>
                <div className={`rounded-[2rem] p-8 ${tone.panel}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#3d5248]">Contact Information</p>
                  <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#0c1a14]">Reach us directly</h2>
                  
                  <div className={`mt-6 rounded-[1.6rem] p-5 ${tone.soft}`}>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5248]">Email</p>
                      <div className="mt-3 grid gap-3">
                        {displayEmails.map((email) => (
                          <a
                            key={email}
                            href={`mailto:${email}`}
                            className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold ${tone.action}`}
                          >
                            <Mail className="h-4 w-4" />
                            {email}
                          </a>
                        ))}
                      </div>
                    </div>

                  {contactPhone ? (
                    <div className={`mt-4 rounded-[1.6rem] p-5 ${tone.soft}`}>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5248]">Phone</p>
                      <a
                        href={`tel:${contactPhone}`}
                        className={`mt-3 inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold ${tone.action}`}
                      >
                        <Phone className="h-4 w-4" />
                        {contactPhone}
                      </a>
                    </div>
                  ) : null}

                  {contactAddress ? (
                    <div className={`mt-4 rounded-[1.6rem] p-5 ${tone.soft}`}>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5248]">Address</p>
                      <div className={`mt-3 flex items-start gap-2 text-sm ${tone.muted}`}>
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{contactAddress}</span>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className={`mt-6 grid gap-3 rounded-[2rem] p-6 ${tone.panel}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5248]">Quick links</p>
                  <a href="/classifieds" className="flex items-center justify-between rounded-xl p-4 transition hover:bg-[#f4faf7]">
                    <span className="text-sm font-medium text-[#0c1a14]">Browse classifieds</span>
                    <ArrowRight className="h-4 w-4 text-[#134d3a]" />
                  </a>
                  <a href="/dashboard/ads/new" className="flex items-center justify-between rounded-xl p-4 transition hover:bg-[#f4faf7]">
                    <span className="text-sm font-medium text-[#0c1a14]">Post an ad</span>
                    <ArrowRight className="h-4 w-4 text-[#134d3a]" />
                  </a>
                  <a href="/about" className="flex items-center justify-between rounded-xl p-4 transition hover:bg-[#f4faf7]">
                    <span className="text-sm font-medium text-[#0c1a14]">About us</span>
                    <ArrowRight className="h-4 w-4 text-[#134d3a]" />
                  </a>
                </div>
              </div>

              <div className={`rounded-[2rem] p-8 ${tone.panel}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#3d5248]">Send a message</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#0c1a14]">We'll respond quickly</h2>
                <p className={`mt-4 text-sm leading-7 ${tone.muted}`}>Fill out the form below and we'll get back to you within 24 hours.</p>
                
                <form className="mt-6 grid gap-4">
                  <input 
                    className="h-12 w-full rounded-xl border border-[#b8d0c2] bg-white px-4 text-sm text-[#0c1a14] placeholder:text-[#5a6f65]" 
                    placeholder="Your name" 
                  />
                  <input 
                    className="h-12 w-full rounded-xl border border-[#b8d0c2] bg-white px-4 text-sm text-[#0c1a14] placeholder:text-[#5a6f65]" 
                    placeholder="Email address" 
                    type="email"
                  />
                  <input 
                    className="h-12 w-full rounded-xl border border-[#b8d0c2] bg-white px-4 text-sm text-[#0c1a14] placeholder:text-[#5a6f65]" 
                    placeholder="What do you need help with?" 
                  />
                  <textarea 
                    className="min-h-[180px] w-full rounded-2xl border border-[#b8d0c2] bg-white px-4 py-3 text-sm text-[#0c1a14] placeholder:text-[#5a6f65]" 
                    placeholder="Share the full context so we can respond with the right next step."
                  />
                  <button 
                    type="submit" 
                    className={`inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold ${tone.action}`}
                  >
                    Send message
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
