import Link from 'next/link'
import Image from 'next/image'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { fetchSiteFeed } from '@/lib/site-connector'
import { getPostImages, getPostTaskKey } from '@/lib/task-data'
import { SITE_CONFIG } from '@/lib/site-config'

interface CategoryData {
  name: string
  slug: string
  count: number
  image: string | null
}

export async function CategorySection() {
  const feed = await fetchSiteFeed(200)
  const posts = feed?.posts || []

  // Count posts by category
  const categoryCounts = new Map<string, number>()
  const categoryImages = new Map<string, string>()

  for (const post of posts) {
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

  // Build category data with real counts and images
  const categories: CategoryData[] = CATEGORY_OPTIONS.map((cat) => ({
    name: cat.name,
    slug: cat.slug,
    count: categoryCounts.get(cat.slug) || 0,
    image: categoryImages.get(cat.slug) || null
  }))

  return (
    <section className="border-b border-border py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Explore Categories
          </h2>
          <p className="mt-2 text-muted-foreground">
            Browse through our diverse range of content and listings
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/search?category=${category.slug}`}
              className="group flex flex-col items-center rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-accent/50 hover:bg-secondary"
            >
              <div className="relative h-24 w-full bg-secondary">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground/30">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-4 text-center">
                <span className="text-sm font-medium text-foreground block">
                  {category.name}
                </span>
                <span className="mt-1 text-xs text-muted-foreground block">
                  {category.count} items
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
