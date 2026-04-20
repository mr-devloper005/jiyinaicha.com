import { Bookmark, Building2, FileText, Image as ImageIcon } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { LoginFormPanel } from '@/components/shared/login-form-panel'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { LOGIN_PAGE_OVERRIDE_ENABLED, LoginPageOverride } from '@/overrides/login-page'

function getLoginConfig(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return {
      shell: 'bg-[#ecf4ef] text-[#0c1a14]',
      panel: 'border border-[#c5d9cc] bg-white shadow-[0_24px_80px_rgba(12,40,28,0.08)]',
      side: 'border border-[#b8d0c2] bg-[#0f2419] text-white shadow-[0_28px_90px_rgba(8,28,20,0.35)]',
      muted: 'text-[#3d5248]',
      sideMuted: 'text-emerald-100/85',
      action: 'bg-[#5ee9b5] text-[#052018] hover:bg-[#4bd9a5]',
      icon: Building2,
      iconClass: 'text-[#5ee9b5]',
      title: 'Sign in to your seller workspace',
      body: 'Post ads, edit drafts, and manage replies—your session stays on this device after you sign in.',
      bullets: ['Local classifieds tuned for fast scanning', 'Mint-accent controls that stay lightweight', 'Same platform logic, a marketplace-first shell'],
      bulletClass: 'rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4 text-sm text-emerald-50/95',
    }
  }
  if (kind === 'editorial') {
    return {
      shell: 'bg-[#fbf6ee] text-[#241711]',
      panel: 'border border-[#dcc8b7] bg-[#fffdfa]',
      side: 'border border-[#e6d6c8] bg-[#fff4e8]',
      muted: 'text-[#6e5547]',
      sideMuted: 'text-[#6e5547]',
      action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
      icon: FileText,
      iconClass: '',
      title: 'Sign in to your publication workspace',
      body: 'Draft, review, and publish long-form work with the calmer reading system intact.',
      bullets: ['Cleaner product-specific workflows', 'Palette and layout matched to the site family', 'Fewer repeated admin patterns'],
      bulletClass: 'rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm',
    }
  }
  if (kind === 'visual') {
    return {
      shell: 'bg-[#07101f] text-white',
      panel: 'border border-white/10 bg-white/6',
      side: 'border border-white/10 bg-white/5',
      muted: 'text-slate-300',
      sideMuted: 'text-slate-300',
      action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
      icon: ImageIcon,
      iconClass: '',
      title: 'Enter the creator workspace',
      body: 'Open your visual feed, creator profile, and publishing tools without dropping into a generic admin shell.',
      bullets: ['Cleaner product-specific workflows', 'Palette and layout matched to the site family', 'Fewer repeated admin patterns'],
      bulletClass: 'rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm',
    }
  }
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4]',
    side: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    sideMuted: 'text-[#71574a]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    icon: Bookmark,
    iconClass: '',
    title: 'Open your curated collections',
    body: 'Manage saved resources, collection notes, and curator identity from a calmer workspace.',
    bullets: ['Cleaner product-specific workflows', 'Palette and layout matched to the site family', 'Fewer repeated admin patterns'],
    bulletClass: 'rounded-[1.5rem] border border-current/10 px-4 py-4 text-sm',
  }
}

export default function LoginPage() {
  if (LOGIN_PAGE_OVERRIDE_ENABLED) {
    return <LoginPageOverride />
  }

  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const config = getLoginConfig(productKind)
  const Icon = config.icon

  return (
    <div className={`min-h-screen ${config.shell}`}>
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <section className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-stretch">
          <div className={`rounded-[2rem] p-8 ${config.side}`}>
            <Icon className={`h-8 w-8 ${config.iconClass}`} />
            <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em]">{config.title}</h1>
            <p className={`mt-5 text-sm leading-8 ${config.sideMuted}`}>{config.body}</p>
            <div className="mt-8 grid gap-4">
              {(config.bullets || []).map((item) => (
                <div key={item} className={config.bulletClass}>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[2rem] p-8 ${config.panel}`}>
            <LoginFormPanel actionClassName={config.action} mutedClassName={config.muted} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
