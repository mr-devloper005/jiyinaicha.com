import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowRight,
  Bookmark,
  Bike,
  Building2,
  Car,
  Cpu,
  FileText,
  Home,
  Image as ImageIcon,
  LayoutGrid,
  Plus,
  Search,
  ShieldCheck,
  Smartphone,
  Sofa,
  Sparkles,
  Tag,
  User,
} from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { fetchTaskPosts, getPostImages, getPostTaskKey } from '@/lib/task-data'
import { siteContent } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind, type ProductKind } from '@/design/factory/get-product-kind'
import type { SitePost } from '@/lib/site-connector'
import { HOME_PAGE_OVERRIDE_ENABLED, HomePageOverride } from '@/overrides/home-page'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

type EnabledTask = (typeof SITE_CONFIG.tasks)[number]
type TaskFeedItem = { task: EnabledTask; posts: SitePost[] }

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: Bookmark,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

function resolveTaskKey(value: unknown, fallback: TaskKey): TaskKey {
  if (value === 'listing' || value === 'classified' || value === 'article' || value === 'image' || value === 'profile' || value === 'sbm') return value
  return fallback
}

function getTaskHref(task: TaskKey, slug: string) {
  const route = SITE_CONFIG.tasks.find((item) => item.key === task)?.route || `/${task}`
  return `${route}/${slug}`
}

function getPostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post?.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const contentImage = typeof post?.content === 'object' && post?.content && Array.isArray((post.content as any).images)
    ? (post.content as any).images.find((url: unknown) => typeof url === 'string' && url)
    : null
  const logo = typeof post?.content === 'object' && post?.content && typeof (post.content as any).logo === 'string'
    ? (post.content as any).logo
    : null
  return mediaUrl || contentImage || logo || '/placeholder.svg?height=900&width=1400'
}

function getPostMeta(post?: SitePost | null) {
  if (!post || typeof post.content !== 'object' || !post.content) return { location: '', category: '' }
  const content = post.content as Record<string, unknown>
  return {
    location: typeof content.address === 'string' ? content.address : typeof content.location === 'string' ? content.location : '',
    category: typeof content.category === 'string' ? content.category : typeof post.tags?.[0] === 'string' ? post.tags[0] : '',
  }
}

/** Classified marketplace surface — forest + mint, independent of legacy directory palettes */
function getClassifiedMarketTone() {
  return {
    shell: 'bg-[#f4faf7] text-[#0c1a14]',
    hero: 'relative isolate min-h-[520px] overflow-hidden bg-[#0a1f16]',
    heroOverlay: 'absolute inset-0 bg-[linear-gradient(180deg,rgba(6,28,20,0.55)_0%,rgba(8,42,30,0.88)_55%,rgba(10,52,38,0.92)_100%)]',
    panel: 'border border-[#c5d9cc] bg-white shadow-[0_28px_70px_rgba(8,40,28,0.1)]',
    soft: 'border border-[#cfe5d6] bg-[#f0faf5]',
    muted: 'text-[#3d5248]',
    title: 'text-white',
    badge: 'border border-white/20 bg-white/10 text-white',
    action: 'bg-[#5ee9b5] text-[#052018] shadow-[0_12px_40px_rgba(94,233,181,0.35)] hover:bg-[#4bd9a5]',
    actionAlt: 'border border-white/25 bg-transparent text-white hover:bg-white/10',
    pill: 'border border-[#b8d0c2] bg-white text-[#1a2e24]',
  }
}

function getEditorialTone() {
  return {
    shell: 'bg-[#fbf6ee] text-[#241711]',
    panel: 'border border-[#dcc8b7] bg-[#fffdfa] shadow-[0_24px_60px_rgba(77,47,27,0.08)]',
    soft: 'border border-[#e6d6c8] bg-[#fff4e8]',
    muted: 'text-[#6e5547]',
    title: 'text-[#241711]',
    badge: 'bg-[#241711] text-[#fff1e2]',
    action: 'bg-[#241711] text-[#fff1e2] hover:bg-[#3a241b]',
    actionAlt: 'border border-[#dcc8b7] bg-transparent text-[#241711] hover:bg-[#f5e7d7]',
  }
}

function getVisualTone() {
  return {
    shell: 'bg-[#07101f] text-white',
    panel: 'border border-white/10 bg-[rgba(11,18,31,0.78)] shadow-[0_28px_80px_rgba(0,0,0,0.35)]',
    soft: 'border border-white/10 bg-white/6',
    muted: 'text-slate-300',
    title: 'text-white',
    badge: 'bg-[#8df0c8] text-[#07111f]',
    action: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    actionAlt: 'border border-white/10 bg-white/6 text-white hover:bg-white/10',
  }
}

function getCurationTone() {
  return {
    shell: 'bg-[#f7f1ea] text-[#261811]',
    panel: 'border border-[#ddcdbd] bg-[#fffaf4] shadow-[0_24px_60px_rgba(91,56,37,0.08)]',
    soft: 'border border-[#e8dbce] bg-[#f3e8db]',
    muted: 'text-[#71574a]',
    title: 'text-[#261811]',
    badge: 'bg-[#5b2b3b] text-[#fff0f5]',
    action: 'bg-[#5b2b3b] text-[#fff0f5] hover:bg-[#74364b]',
    actionAlt: 'border border-[#ddcdbd] bg-transparent text-[#261811] hover:bg-[#efe3d6]',
  }
}

const HERO_PHOTO =
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2000&q=80'

const QUICK_BROWSE = [
  { label: 'Vehicles', slug: 'automotive', Icon: Car },
  { label: 'Real Estate', slug: 'real-estate', Icon: Building2 },
  { label: 'Appliances', slug: 'home-improvement', Icon: Home },
  { label: 'Mobiles', slug: 'technology', Icon: Smartphone },
  { label: 'Electronics', slug: 'electric', Icon: Cpu },
  { label: 'Furniture', slug: 'furniture', Icon: Sofa },
  { label: 'Bikes', slug: 'game-sports', Icon: Bike },
] as const


function DirectoryHome({ enabledTasks, listingPosts, classifiedPosts, profilePosts }: {
  enabledTasks: EnabledTask[]
  listingPosts: SitePost[]
  classifiedPosts: SitePost[]
  profilePosts: SitePost[]
}) {
  const tone = getClassifiedMarketTone()
  const featuredListings = (classifiedPosts.length ? classifiedPosts : listingPosts).slice(0, 3)
  const featuredTaskKey: TaskKey = classifiedPosts.length ? 'classified' : 'listing'

  // Generate real category data from posts
  const allPosts = [...classifiedPosts, ...listingPosts]
  const categoryCounts = new Map<string, number>()
  const categoryImages = new Map<string, string>()

  for (const post of allPosts) {
    const content = post.content && typeof post.content === 'object' ? post.content : {}
    const category = typeof (content as any).category === 'string' ? (content as any).category : ''
    
    if (category) {
      categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1)
      
      // Get first image for this category if not already set
      if (!categoryImages.has(category)) {
        const images = getPostImages(post)
        if (images.length > 0) {
          categoryImages.set(category, images[0])
        }
      }
    }
  }

  // Map category slugs to display names
  const categoryNames: Record<string, string> = {
    'automotive': 'Vehicles',
    'real-estate': 'Real Estate',
    'technology': 'Mobiles & Tech',
    'home-improvement': 'Home & Garden',
    'furniture': 'Furniture',
    'electric': 'Electronics',
    'game-sports': 'Sports & Hobbies',
  }

  // Build popular categories with real data (show even with 0 posts)
  const popularCategories = Object.keys(categoryNames).map(slug => ({
    name: categoryNames[slug] || slug,
    slug,
    ads: categoryCounts.get(slug) || 0,
    src: categoryImages.get(slug) || 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=80'
  })).slice(0, 4)
  const quickRoutes = enabledTasks.slice(0, 4)
  const freshGrid = (profilePosts.length ? profilePosts : classifiedPosts).slice(0, 4)

  return (
    <main className="overflow-x-hidden">
      <section className={tone.hero}>
        <div className="absolute inset-0">
          <ContentImage src={HERO_PHOTO} alt="Warm interior background" fill className="object-cover opacity-90" priority sizes="100vw" intrinsicWidth={2000} intrinsicHeight={1200} />
        </div>
        <div className={tone.heroOverlay} />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-4 pb-20 pt-16 text-center sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
          <span className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.28em] ${tone.badge}`}>
            <Sparkles className="h-3.5 w-3.5 text-[#5ee9b5]" />
            {siteContent.hero.badge}
          </span>
          <h1 className={`mt-7 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-[3.15rem] ${tone.title}`}>
            {siteContent.hero.title[0]} <span className="block text-[0.92em] font-medium text-white/95">{siteContent.hero.title[1]}</span>
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{siteContent.hero.description}</p>
          <Link
            href="/dashboard/ads/new"
            className={`mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${tone.actionAlt}`}
          >
            <Plus className="h-4 w-4" />
            Post Ad now
          </Link>

          <form
            action="/search"
            method="get"
            className={`mt-10 flex w-full max-w-3xl flex-col gap-3 rounded-full p-2 shadow-[0_24px_80px_rgba(0,0,0,0.35)] sm:flex-row sm:items-stretch ${tone.pill}`}
          >
            <label className="sr-only" htmlFor="hq">Search</label>
            <input
              id="hq"
              name="q"
              placeholder={siteContent.hero.searchPlaceholder}
              className="min-h-12 flex-1 rounded-full border-0 bg-transparent px-5 text-sm text-[#0c1a14] outline-none placeholder:text-[#5a6f65]"
            />
            <button
              type="submit"
              className="inline-flex min-h-12 min-w-12 shrink-0 items-center justify-center rounded-full bg-[#134d3a] text-white transition hover:bg-[#0f3d2e] sm:min-w-[3.25rem]"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
          </form>

          <div className="mt-10 flex max-w-3xl flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/85">
            {QUICK_BROWSE.map(({ label, slug, Icon }) => (
              <Link key={slug} href={`/classifieds?category=${slug}`} className="inline-flex items-center gap-2 transition hover:text-[#5ee9b5]">
                <Icon className="h-4 w-4 opacity-80" strokeWidth={1.75} />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#f6fbf8] py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#3d5248]">Browse with intent</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-[#0c1a14]">Popular categories</h2>
            </div>
            <Link href="/classifieds" className="inline-flex items-center gap-2 text-sm font-semibold text-[#134d3a] hover:underline">
              View more
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popularCategories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/classifieds?category=${cat.slug}`}
                className="group relative aspect-[3/4] overflow-hidden rounded-[1.75rem] shadow-[0_20px_50px_rgba(8,40,28,0.12)]"
              >
                <ContentImage src={cat.src} alt={cat.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:1024px) 50vw, 25vw" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(5,20,14,0.92)_100%)]" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <p className="text-lg font-semibold">{cat.name}</p>
                  <p className="mt-1 text-sm text-white/75">{cat.ads} ads</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-[#d4e8dd] pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5248]">Fresh on the board</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#0c1a14]">Deals worth a second look</h2>
          </div>
          <Link href="/classifieds" className="text-sm font-semibold text-[#134d3a] hover:underline">
            Browse all ads
          </Link>
        </div>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {featuredListings.map((post) => (
            <TaskPostCard key={post.id} post={post} href={getTaskHref(featuredTaskKey, post.slug)} taskKey={featuredTaskKey} />
          ))}
        </div>
      </section>

      <section className={tone.shell}>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8 lg:py-16">
          <div className={`rounded-[2rem] p-8 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5248]">Buying & selling is easy</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#0c1a14]">Post in minutes. Buyers find you faster.</h2>
            <ul className={`mt-6 space-y-4 text-sm leading-7 ${tone.muted}`}>
              <li className="flex gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#134d3a]" />
                Clear categories and location cues keep scans honest.
              </li>
              <li className="flex gap-3">
                <Search className="mt-0.5 h-5 w-5 shrink-0 text-[#134d3a]" />
                Search is tuned for titles, tags, and descriptions—no noisy feeds.
              </li>
              <li className="flex gap-3">
                <Tag className="mt-0.5 h-5 w-5 shrink-0 text-[#134d3a]" />
                One primary marketplace lane so the story stays simple.
              </li>
            </ul>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {freshGrid.map((post) => {
              const meta = getPostMeta(post)
              const taskKey = resolveTaskKey(getPostTaskKey(post) || 'classified', 'classified')
              return (
                <Link key={post.id} href={getTaskHref(taskKey, post.slug)} className={`overflow-hidden rounded-[1.85rem] ${tone.panel} transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(8,40,28,0.12)]`}>
                  <div className="relative h-44 overflow-hidden">
                    <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#5a6f65]">{meta.category || 'Classified'}</p>
                    <h3 className="mt-2 text-lg font-semibold text-[#0c1a14]">{post.title}</h3>
                    <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Local offer with a short, scannable description.'}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {quickRoutes.length > 0 ? (
        <section className="border-t border-[#d4e8dd] bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-[#3d5248]">Primary surfaces</p>
            <div className="mx-auto mt-6 flex max-w-3xl flex-wrap justify-center gap-4">
              {quickRoutes.map((task) => {
                const Icon = taskIcons[task.key as TaskKey] || LayoutGrid
                return (
                  <Link key={task.key} href={task.route} className={`flex min-w-[200px] flex-1 flex-col rounded-[1.5rem] border border-[#cfe5d6] bg-[#f7fdf9] p-5 transition hover:border-[#134d3a]/35`}>
                    <Icon className="h-5 w-5 text-[#134d3a]" />
                    <span className="mt-3 text-base font-semibold text-[#0c1a14]">{task.label}</span>
                    <span className="mt-1 text-sm text-[#5a6f65]">{task.description}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-[#0f2419] px-8 py-12 text-center text-white shadow-[0_32px_90px_rgba(5,24,18,0.35)] sm:px-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#5ee9b5]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-emerald-400/10 blur-3xl" />
          <h2 className="relative text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">Post your ad now</h2>
          <p className="relative mx-auto mt-3 max-w-lg text-sm text-white/75">Reach local buyers without leaving this marketplace shell—same routes, clearer presentation.</p>
          <Link
            href="/dashboard/ads/new"
            className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-[#5ee9b5] px-8 py-3.5 text-sm font-semibold text-[#052018] shadow-[0_14px_40px_rgba(94,233,181,0.35)] transition hover:bg-[#4bd9a5]"
          >
            <Plus className="h-4 w-4" />
            Post Ad now
          </Link>
        </div>
      </section>
    </main>
  )
}

function EditorialHome({ primaryTask, articlePosts, supportTasks }: { primaryTask?: EnabledTask; articlePosts: SitePost[]; supportTasks: EnabledTask[] }) {
  const tone = getEditorialTone()
  const lead = articlePosts[0]
  const side = articlePosts.slice(1, 5)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <FileText className="h-3.5 w-3.5" />
              Reading-first publication
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Essays, analysis, and slower reading designed like a publication, not a dashboard.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/articles'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Start reading
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                About the publication
              </Link>
            </div>
          </div>

          <aside className={`rounded-[2rem] p-6 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Inside this issue</p>
            <div className="mt-5 space-y-5">
              {side.map((post) => (
                <Link key={post.id} href={`/articles/${post.slug}`} className="block border-b border-black/10 pb-5 last:border-b-0 last:pb-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] opacity-60">Feature</p>
                  <h3 className="mt-2 text-xl font-semibold">{post.title}</h3>
                  <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Long-form perspective with a calmer reading rhythm.'}</p>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        {lead ? (
          <div className={`mt-12 overflow-hidden rounded-[2.5rem] ${tone.panel}`}>
            <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
              <div className="relative min-h-[360px] overflow-hidden">
                <ContentImage src={getPostImage(lead)} alt={lead.title} fill className="object-cover" />
              </div>
              <div className="p-8 lg:p-10">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Lead story</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.04em]">{lead.title}</h2>
                <p className={`mt-4 text-sm leading-8 ${tone.muted}`}>{lead.summary || 'A more deliberate lead story surface with room for a proper narrative setup.'}</p>
                <Link href={`/articles/${lead.slug}`} className={`mt-8 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                  Read article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {supportTasks.slice(0, 3).map((task) => (
            <Link key={task.key} href={task.route} className={`rounded-[1.8rem] p-6 ${tone.soft}`}>
              <h3 className="text-xl font-semibold">{task.label}</h3>
              <p className={`mt-3 text-sm leading-7 ${tone.muted}`}>{task.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

function VisualHome({ primaryTask, imagePosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; imagePosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getVisualTone()
  const gallery = imagePosts.length ? imagePosts.slice(0, 5) : articlePosts.slice(0, 5)
  const creators = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <ImageIcon className="h-3.5 w-3.5" />
              Visual publishing system
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Image-led discovery with creator profiles and a more gallery-like browsing rhythm.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/images'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open gallery
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Meet creators
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {gallery.slice(0, 5).map((post, index) => (
              <Link
                key={post.id}
                href={getTaskHref(resolveTaskKey(getPostTaskKey(post) || 'image', 'image'), post.slug)}
                className={index === 0 ? `col-span-2 row-span-2 overflow-hidden rounded-[2.4rem] ${tone.panel}` : `overflow-hidden rounded-[1.8rem] ${tone.soft}`}
              >
                <div className={index === 0 ? 'relative h-[360px]' : 'relative h-[170px]'}>
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Visual notes</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">Larger media surfaces, fewer boxes, stronger pacing.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>This product avoids business-directory density and publication framing. The homepage behaves more like a visual board, with profile surfaces and imagery leading the experience.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {creators.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-40 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>{post.summary || 'Creator profile and visual identity surface.'}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function CurationHome({ primaryTask, bookmarkPosts, profilePosts, articlePosts }: { primaryTask?: EnabledTask; bookmarkPosts: SitePost[]; profilePosts: SitePost[]; articlePosts: SitePost[] }) {
  const tone = getCurationTone()
  const collections = bookmarkPosts.length ? bookmarkPosts.slice(0, 4) : articlePosts.slice(0, 4)
  const people = profilePosts.slice(0, 3)

  return (
    <main className={tone.shell}>
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${tone.badge}`}>
              <Bookmark className="h-3.5 w-3.5" />
              Curated collections
            </span>
            <h1 className={`mt-6 max-w-4xl text-5xl font-semibold tracking-[-0.06em] sm:text-6xl ${tone.title}`}>
              Save, organize, and revisit resources through shelves, boards, and curated collections.
            </h1>
            <p className={`mt-6 max-w-2xl text-base leading-8 ${tone.muted}`}>{SITE_CONFIG.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={primaryTask?.route || '/sbm'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.action}`}>
                Open collections
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/profile" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${tone.actionAlt}`}>
                Explore curators
              </Link>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {collections.map((post) => (
              <Link key={post.id} href={getTaskHref(resolveTaskKey(getPostTaskKey(post) || 'sbm', 'sbm'), post.slug)} className={`rounded-[1.8rem] p-6 ${tone.panel}`}>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Collection</p>
                <h3 className="mt-3 text-2xl font-semibold">{post.title}</h3>
                <p className={`mt-3 text-sm leading-8 ${tone.muted}`}>{post.summary || 'A calmer bookmark surface with room for context and grouping.'}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className={`rounded-[2rem] p-7 ${tone.panel}`}>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Why this feels different</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">More like saved boards and reading shelves than a generic post feed.</h2>
            <p className={`mt-4 max-w-2xl text-sm leading-8 ${tone.muted}`}>The structure is calmer, the cards are less noisy, and the page encourages collecting and returning instead of forcing everything into a fast-scrolling list.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {people.map((post) => (
              <Link key={post.id} href={`/profile/${post.slug}`} className={`rounded-[1.8rem] p-5 ${tone.soft}`}>
                <div className="relative h-32 overflow-hidden rounded-[1.2rem]">
                  <ContentImage src={getPostImage(post)} alt={post.title} fill className="object-cover" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">{post.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${tone.muted}`}>Curator profile, saved resources, and collection notes.</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

export default async function HomePage() {
  if (HOME_PAGE_OVERRIDE_ENABLED) {
    return <HomePageOverride />
  }

  const enabledTasks = SITE_CONFIG.tasks.filter((task) => task.enabled)
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const taskFeed: TaskFeedItem[] = (
    await Promise.all(
      enabledTasks.map(async (task) => ({
        task,
        posts: await fetchTaskPosts(task.key, 8, { allowMockFallback: false, fresh: true }),
      }))
    )
  ).filter(({ posts }) => posts.length)

  const primaryTask = enabledTasks.find((task) => task.key === recipe.primaryTask) || enabledTasks[0]
  const supportTasks = enabledTasks.filter((task) => task.key !== primaryTask?.key)
  const listingPosts = taskFeed.find(({ task }) => task.key === 'listing')?.posts || []
  const classifiedPosts = taskFeed.find(({ task }) => task.key === 'classified')?.posts || []
  const articlePosts = taskFeed.find(({ task }) => task.key === 'article')?.posts || []
  const imagePosts = taskFeed.find(({ task }) => task.key === 'image')?.posts || []
  const profilePosts = taskFeed.find(({ task }) => task.key === 'profile')?.posts || []
  const bookmarkPosts = taskFeed.find(({ task }) => task.key === 'sbm')?.posts || []

  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      {productKind === 'directory' ? (
        <DirectoryHome
          enabledTasks={enabledTasks}
          listingPosts={listingPosts}
          classifiedPosts={classifiedPosts}
          profilePosts={profilePosts}
        />
      ) : null}
      {productKind === 'editorial' ? (
        <EditorialHome primaryTask={primaryTask} articlePosts={articlePosts} supportTasks={supportTasks} />
      ) : null}
      {productKind === 'visual' ? (
        <VisualHome primaryTask={primaryTask} imagePosts={imagePosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      {productKind === 'curation' ? (
        <CurationHome primaryTask={primaryTask} bookmarkPosts={bookmarkPosts} profilePosts={profilePosts} articlePosts={articlePosts} />
      ) : null}
      <Footer />
    </div>
  )
}
