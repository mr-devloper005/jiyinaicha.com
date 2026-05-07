import Link from 'next/link'
import { Globe, Mail, MapPin, Phone, ShieldAlert, ShieldCheck, Tag } from 'lucide-react'
import { ContentImage } from '@/components/shared/content-image'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { TaskPostCard } from '@/components/shared/task-post-card'
import { TaskImageCarousel } from '@/components/tasks/task-image-carousel'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { RichContent, formatRichHtml } from '@/components/shared/rich-content'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'

export function DirectoryTaskDetailPage({
  task,
  taskLabel,
  taskRoute,
  post,
  description,
  category,
  images,
  mapEmbedUrl,
  related,
}: {
  task: TaskKey
  taskLabel: string
  taskRoute: string
  post: SitePost
  description: string
  category: string
  images: string[]
  mapEmbedUrl: string | null
  related: SitePost[]
}) {
  const content = post.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
  const location =
    typeof content.address === 'string'
      ? content.address
      : typeof content.location === 'string'
        ? content.location
        : ''
  const website = typeof content.website === 'string' ? content.website : ''
  const phone = typeof content.phone === 'string' ? content.phone : ''
  const email = typeof content.email === 'string' ? content.email : ''
  const highlights = Array.isArray(content.highlights)
    ? content.highlights.filter((item): item is string => typeof item === 'string')
    : []

  const posterName =
    typeof post.authorName === 'string' && post.authorName.trim() ? post.authorName.trim() : 'Listing owner'
  const posterAvatar =
    typeof content.logo === 'string' && content.logo.trim()
      ? content.logo.trim()
      : images[0]

  const schemaPayload = {
    '@context': 'https://schema.org',
    '@type': task === 'profile' ? 'Organization' : 'LocalBusiness',
    name: post.title,
    description,
    image: images[0],
    url: `${taskRoute}/${post.slug}`,
    address: location || undefined,
    telephone: phone || undefined,
    email: email || undefined,
  }

  const hasContacts = Boolean(phone || email || website)
  const descriptionHtml = formatRichHtml(description, '')

  return (
    <div className="min-h-screen bg-[#f8fbff] text-slate-950">
      <SchemaJsonLd data={schemaPayload} />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          href={taskRoute}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-950"
        >
          ← Back to {taskLabel}
        </Link>

        <section className="grid gap-8 lg:grid-cols-[2fr_1fr] lg:items-start">
          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
              <TaskImageCarousel images={images} />
              {images.length > 1 ? (
                <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-semibold text-white">
                  {images.length} photos
                </div>
              ) : null}
            </div>

            <header className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
              <div className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
                <Badge variant="secondary" className="bg-slate-100 text-slate-700">
                  <Tag className="h-3.5 w-3.5" />
                  {category || taskLabel}
                </Badge>
                {location ? (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {location}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                {post.title}
              </h1>

              <RichContent html={descriptionHtml} className="mt-4 text-sm leading-8 text-slate-600" />

              {highlights.length ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {highlights.slice(0, 6).map((item) => (
                    <div
                      key={item}
                      className="rounded-[1.2rem] border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </header>
          </div>

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Contact</p>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                  <ShieldCheck className="h-3.5 w-3.5" /> Verified
                </span>
              </div>

              <div className="mt-5 grid gap-3">
                {phone ? (
                  <Button asChild className="w-full justify-start gap-3 rounded-xl">
                    <a href={`tel:${phone}`}>
                      <Phone className="h-4 w-4" />
                      Call
                    </a>
                  </Button>
                ) : null}
                {email ? (
                  <Button asChild variant="secondary" className="w-full justify-start gap-3 rounded-xl">
                    <a href={`mailto:${email}`}>
                      <Mail className="h-4 w-4" />
                      Contact
                    </a>
                  </Button>
                ) : null}
                {website ? (
                  <Button asChild variant="outline" className="w-full justify-start gap-3 rounded-xl">
                    <a href={website} target="_blank" rel="noreferrer">
                      <Globe className="h-4 w-4" />
                      Website
                    </a>
                  </Button>
                ) : null}
              </div>

              {hasContacts ? null : (
                <p className="mt-4 text-sm text-slate-600">Contact details are not available for this listing yet.</p>
              )}
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Posted by</p>
              <div className="mt-4 flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <ContentImage src={posterAvatar} alt={posterName} fill className="object-cover" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-950">{posterName}</p>
                  <p className="truncate text-xs text-slate-600">{location || 'Local listing'}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-2 text-sm text-slate-700">
                {location ? (
                  <div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                    <MapPin className="mt-0.5 h-4 w-4" />
                    <span className="min-w-0 break-words">{location}</span>
                  </div>
                ) : null}
                {phone ? (
                  <div className="flex items-start gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                    <Phone className="mt-0.5 h-4 w-4" />
                    <span>{phone}</span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-emerald-50 p-6 shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
              <div className="flex items-center gap-3">
                <ShieldAlert className="h-5 w-5 text-emerald-700" />
                <p className="text-sm font-semibold text-emerald-950">Safety tips</p>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-emerald-900/90">
                <li>Meet in a public place and verify details.</li>
                <li>Avoid advance payments or wire transfers.</li>
                <li>Inspect items/services before confirming.</li>
                <li>Report suspicious listings to support.</li>
              </ul>
            </div>

            {mapEmbedUrl ? (
              <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_60px_rgba(15,23,42,0.08)]">
                <div className="border-b border-slate-200 px-6 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Location</p>
                </div>
                <iframe
                  src={mapEmbedUrl}
                  title={`${post.title} map`}
                  className="h-[280px] w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            ) : null}
          </aside>
        </section>

        {related.length ? (
          <section className="mt-14">
            <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">Related</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">More in {category || taskLabel}</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                <Tag className="h-3.5 w-3.5" /> {taskLabel}
              </span>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-3">
              {related.map((item) => (
                <TaskPostCard key={item.id} post={item} href={`${taskRoute}/${item.slug}`} taskKey={task} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}
