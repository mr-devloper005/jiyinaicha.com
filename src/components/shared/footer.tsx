import Link from 'next/link'
import { FileText, Building2, LayoutGrid, Tag, Github, Twitter, Linkedin, Image as ImageIcon, User, ArrowRight, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { FOOTER_OVERRIDE_ENABLED, FooterOverride } from '@/overrides/footer'

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: LayoutGrid,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const footerLinks = {
  platform: SITE_CONFIG.tasks.filter((task) => task.enabled).map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  })),
  company: [
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  resources: [
    { name: 'Help Center', href: '/help' },
    { name: 'Developers', href: '/developers' },
    { name: 'Status', href: '/status' },
  ],
  legal: [
    { name: 'Licenses', href: '/licenses' },
  ],
}

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
]

/** Routes for other base-repo tasks — low-emphasis footer discovery; classifieds stay primary in nav. */
const SECONDARY_FOOTER_TASK_KEYS: TaskKey[] = ['article', 'listing', 'image', 'profile', 'sbm', 'pdf']

export function Footer() {
  if (FOOTER_OVERRIDE_ENABLED) {
    return <FooterOverride />
  }

  const { recipe } = getFactoryState()
  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]

  if (recipe.footer === 'minimal-footer') {
    const secondaryTaskLinks = SITE_CONFIG.tasks.filter((task) => SECONDARY_FOOTER_TASK_KEYS.includes(task.key))

    return (
      <footer className="border-t border-emerald-900/35 bg-[#0c1f17] text-emerald-50/95">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-md">
              <p className="text-lg font-semibold tracking-tight lowercase text-white">{SITE_CONFIG.name}.</p>
              <p className="mt-1 text-sm text-emerald-100/70">{SITE_CONFIG.description}</p>
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-8 lg:max-w-3xl lg:items-end">
              <div className="w-full lg:text-right">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-200/55">Classifieds and site</p>
                <div className="mt-3 flex flex-wrap justify-start gap-2 lg:justify-end">
                  {enabledTasks.map((task) => (
                    <Link
                      key={task.key}
                      href={task.route}
                      className="rounded-full border border-[#5ee9b5]/35 bg-[#5ee9b5]/10 px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition hover:border-[#5ee9b5]/55 hover:bg-[#5ee9b5]/18"
                    >
                      {task.label}
                    </Link>
                  ))}
                  <Link
                    href="/dashboard/ads/new"
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-emerald-50 transition hover:bg-white/10"
                  >
                    Post an ad
                  </Link>
                  <Link href="/search" className="rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-emerald-100/90 hover:bg-white/10">
                    Search
                  </Link>
                  <Link href="/help" className="rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-emerald-100/90 hover:bg-white/10">
                    Help
                  </Link>
                  <Link href="/about" className="rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-emerald-100/90 hover:bg-white/10">
                    About
                  </Link>
                  <Link href="/contact" className="rounded-full border border-white/12 px-4 py-2 text-sm font-medium text-emerald-100/90 hover:bg-white/10">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-emerald-200/45 sm:flex-row sm:px-6 lg:px-8">
            <p>&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'dense-footer') {
    return (
      <footer className="border-t border-white/10 bg-[linear-gradient(180deg,#07111f_0%,#0b1a2e_100%)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr_1fr]">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-7">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/15 bg-white/[0.08]">
                  <img
                    src="/favicon.png?v=20260420"
                    alt={`${SITE_CONFIG.name} logo`}
                    width={64}
                    height={64}
                    className="absolute left-1/2 top-1/2 h-[132%] w-[132%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
                  />
                </div>
                <div>
                  <p className="text-lg font-semibold">{SITE_CONFIG.name}</p>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">{siteContent.footer.tagline}</p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">{SITE_CONFIG.description}</p>
              {primaryTask ? (
                <Link href={primaryTask.route} className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#8df0c8] px-4 py-2.5 text-sm font-semibold text-[#07111f] hover:bg-[#77dfb8]">
                  Explore {primaryTask.label}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : null}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-3">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Surfaces</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {footerLinks.platform.map((item: any) => (
                    <li key={item.name}><Link href={item.href} className="flex items-center gap-2 hover:text-white">{item.icon ? <item.icon className="h-4 w-4" /> : null}{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Resources</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-200">
                  {footerLinks.resources.map((item) => (
                    <li key={item.name}><Link href={item.href} className="hover:text-white">{item.name}</Link></li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Connect</h3>
                <div className="mt-4 flex gap-3">
                  {socialLinks.map((item) => (
                    <Link key={item.name} href={item.href} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/10 bg-white/8 p-2.5 text-slate-200 hover:bg-white/12 hover:text-white">
                      <item.icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-white/10 pt-5 text-sm text-slate-400">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
        </div>
      </footer>
    )
  }

  if (recipe.footer === 'editorial-footer') {
    return (
      <footer className="border-t border-[#dbc6b6] bg-[linear-gradient(180deg,#fff9f0_0%,#fff1df_100%)] text-[#2f1d16]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#dbc6b6] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#72594a]">
                <Sparkles className="h-3.5 w-3.5" />
                Editorial desk
              </div>
              <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">{SITE_CONFIG.name}</h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#72594a]">{SITE_CONFIG.description}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6d5a]">Sections</h4>
              <ul className="mt-4 space-y-3 text-sm">
                {footerLinks.platform.map((item: any) => (
                  <li key={item.name}><Link href={item.href} className="hover:text-[#2f1d16]">{item.name}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8b6d5a]">Company</h4>
              <ul className="mt-4 space-y-3 text-sm">
                {footerLinks.company.map((item) => (
                  <li key={item.name}><Link href={item.href} className="hover:text-[#2f1d16]">{item.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="border-t border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] text-slate-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr_0.8fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-white shadow-sm">
                <img
                  src="/favicon.png?v=20260420"
                  alt={`${SITE_CONFIG.name} logo`}
                  width={56}
                  height={56}
                  className="absolute left-1/2 top-1/2 h-[132%] w-[132%] max-w-none -translate-x-1/2 -translate-y-1/2 object-contain"
                />
              </div>
              <div>
                <span className="block text-lg font-semibold">{SITE_CONFIG.name}</span>
                <span className="text-xs uppercase tracking-[0.22em] text-slate-500">{siteContent.footer.tagline}</span>
              </div>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-600">{SITE_CONFIG.description}</p>
          </div>
          {(['platform', 'company', 'resources', 'legal'] as const).map((section) => (
            <div key={section}>
              <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">{section}</h3>
              <ul className="mt-5 space-y-3 text-sm text-slate-600">
                {footerLinks[section].map((item: any) => (
                  <li key={item.name}><Link href={item.href} className="flex items-center gap-2 hover:text-slate-950">{item.icon ? <item.icon className="h-4 w-4" /> : null}{item.name}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-slate-200 pt-6 text-center text-sm text-slate-500">&copy; {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</div>
      </div>
    </footer>
  )
}
