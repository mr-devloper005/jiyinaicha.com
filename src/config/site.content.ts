import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Local classifieds',
  },
  footer: {
    tagline: 'Local classifieds marketplace',
  },
  hero: {
    badge: 'Today’s picks near you',
    title: ['Sell what you no longer need,', 'and turn it into cash—fast.'],
    description:
      'Browse nearby deals, post in minutes, and keep everything in one calm marketplace layer built for scanning—not endless feeds.',
    primaryCta: {
      label: 'Browse classifieds',
      href: '/classifieds',
    },
    secondaryCta: {
      label: 'Post an ad',
      href: '/dashboard/ads/new',
    },
    searchPlaceholder: 'Search to buy',
    focusLabel: 'Focus',
    featureCardBadge: 'latest cover rotation',
    featureCardTitle: 'Latest posts shape the visual identity of the homepage.',
    featureCardDescription:
      'Recent listings stay at the center of the experience without changing any core platform behavior.',
  },
  home: {
    metadata: {
      title: 'Buy & sell locally on Jiyinaicha',
      description:
        'A focused classifieds marketplace for Jiyinaicha: post ads, browse categories, and discover local deals without noisy clutter.',
      openGraphTitle: 'Buy & sell locally on Jiyinaicha',
      openGraphDescription:
        'Search vehicles, homes, mobiles, and everyday items in a marketplace tuned for quick reads and honest listings.',
      keywords: ['classifieds', 'local deals', 'buy and sell', 'marketplace', 'Jiyinaicha', 'used items'],
    },
    introBadge: 'Why this marketplace',
    introTitle: 'One lane for local commerce—clear categories, honest listings, less noise.',
    introParagraphs: [
      'Jiyinaicha is built around classified ads first: shorter posts, stronger category cues, and a rhythm that rewards scanning.',
      'Search stays global across the site, while the homepage keeps attention on what sells here most often.',
      'Whether you are clearing space at home or hunting for a deal, the flow stays fast on mobile and desktop.',
    ],
    sideBadge: 'At a glance',
    sidePoints: [
      'Forest-and-mint visual system tuned for trust and contrast.',
      'Hero search that sends people straight into results.',
      'Cards and detail pages that highlight price cues and location context.',
      'Light motion—CSS-first, no gimmicks.',
    ],
    primaryLink: {
      label: 'Open classifieds',
      href: '/classifieds',
    },
    secondaryLink: {
      label: 'Search everything',
      href: '/search',
    },
  },
  cta: {
    badge: 'Ready to list?',
    title: 'Post once, reach buyers who are already browsing nearby categories.',
    description: 'Keep the same posting workflow—this layer only changes how the story looks and feels.',
    primaryCta: {
      label: 'Browse classifieds',
      href: '/classifieds',
    },
    secondaryCta: {
      label: 'Get help',
      href: '/help',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'Browse the newest posts in this section.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles and stories',
    description: 'Editorial reading on Jiyinaicha when enabled for this deployment.',
  },
  listing: {
    title: 'Business listings',
    description: 'Structured listings when enabled for this deployment.',
  },
  classified: {
    title: 'Classifieds & local deals',
    description: 'Browse Jiyinaicha classifieds—vehicles, homes, mobiles, services, and more.',
  },
  image: {
    title: 'Images and galleries',
    description: 'Visual posts when enabled for this deployment.',
  },
  profile: {
    title: 'Profiles',
    description: 'Public profiles when enabled for this deployment.',
  },
  sbm: {
    title: 'Saved links',
    description: 'Bookmark collections when enabled for this deployment.',
  },
  pdf: {
    title: 'PDF library',
    description: 'Downloadable resources when enabled for this deployment.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Listings, services, and structured pages',
    paragraphs: [
      'Explore listings, services, brands, and discoverable pages across categories. Each entry is organized to make browsing clearer and help visitors quickly understand what a post offers.',
      'Listings connect naturally with articles, images, resources, and other content types so supporting information stays easy to reach from the same platform.',
      'Browse by category to compare posts in context, discover related content, and move between formats without losing your place.',
    ],
    links: [
      { label: 'Open classifieds', href: '/classifieds' },
      { label: 'Site search', href: '/search' },
      { label: 'Help center', href: '/help' },
    ],
  },
  article: {
    title: 'Articles, stories, and long-form reading',
    paragraphs: [
      'This section is built for stories, explainers, guides, and long-form reading across topics and interests.',
      'Articles connect with listings, images, resources, and other content types so deeper reading can lead naturally into related discovery.',
      'Use this section to browse thoughtful posts, revisit useful writing, and move into supporting content when you want more context.',
    ],
    links: [
      { label: 'Browse classifieds', href: '/classifieds' },
      { label: 'Open search', href: '/search' },
      { label: 'Help', href: '/help' },
    ],
  },
  classified: {
    title: 'Classifieds built for quick reads',
    paragraphs: [
      'Post offers, jobs, services, and household items with categories that help buyers scan with confidence.',
      'Search covers titles, summaries, and tags so the right ad surfaces without wading through unrelated tasks.',
      'When you need more context, supporting pages stay one click away—without turning this into a generic content portal.',
    ],
    links: [
      { label: 'Search ads', href: '/search' },
      { label: 'How it works', href: '/help' },
      { label: 'Post an ad', href: '/dashboard/ads/new' },
    ],
  },
  image: {
    title: 'Image-led posts and visual stories',
    paragraphs: [
      'Images take the lead in this section through galleries, visual posts, and story-led content where imagery carries the experience.',
      'These posts connect with articles, listings, and other sections so visuals can act as entry points into deeper content.',
      'Browse the latest visual updates, then continue into related stories or supporting pages for more context.',
    ],
    links: [
      { label: 'Classifieds home', href: '/classifieds' },
      { label: 'Search', href: '/search' },
      { label: 'About', href: '/about' },
    ],
  },
  profile: {
    title: 'Profiles, identities, and public pages',
    paragraphs: [
      'Profiles capture the identity behind a business, creator, brand, or project and help visitors understand who is behind the content they are exploring.',
      'These pages work as trust anchors across the site and connect naturally with stories, listings, documents, and other post types.',
      'Browse profiles to understand people and brands more clearly, then continue into related content from the same source.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Search', href: '/search' },
      { label: 'Help', href: '/help' },
    ],
  },
  sbm: {
    title: 'Curated links and bookmarked resources',
    paragraphs: [
      'This section collects useful links, references, tools, and saved resources in a text-first browsing format.',
      'Bookmarks stay connected to the rest of the platform, making it easier to move from a saved link into related stories, listings, or resources.',
      'Use this section to organize helpful sources and discover connected content without leaving the broader site experience.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Search', href: '/search' },
      { label: 'Help', href: '/help' },
    ],
  },
  pdf: {
    title: 'PDFs, documents, and downloadable files',
    paragraphs: [
      'The PDF library hosts reports, guides, downloadable files, and longer-form document resources that support reading and discovery.',
      'These resources work alongside stories, listings, and profiles, helping document-style content stay connected to the rest of the platform.',
      'Browse by category to find relevant files quickly, then continue into related sections when you want more context.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Search', href: '/search' },
      { label: 'Help', href: '/help' },
    ],
  },
  social: {
    title: 'Short updates and community signals',
    paragraphs: [
      'Short updates add quick signals that keep activity flowing across the platform.',
      'They work well with stories, listings, and resources by helping visitors move from brief updates into deeper content.',
      'Use these posts as lightweight entry points into the broader site experience.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Search', href: '/search' },
      { label: 'Help', href: '/help' },
    ],
  },
  comment: {
    title: 'Comments and contextual responses',
    paragraphs: [
      'Comments surface responses connected directly to articles and help keep discussion close to the writing it belongs to.',
      'This layer adds perspective and reaction without needing a separate standalone content format.',
      'Use comments as supporting context beneath stories, then continue exploring related content from the same topic area.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Search', href: '/search' },
      { label: 'Help', href: '/help' },
    ],
  },
  org: {
    title: 'Organizations, teams, and structured entities',
    paragraphs: [
      'Organization pages provide structured identity surfaces for teams, brands, communities, and agencies.',
      'Used with listings, stories, profiles, and resources, they help create stronger structure across the platform.',
      'Connect organization pages with related content to build a clearer and more unified site presence.',
    ],
    links: [
      { label: 'Classifieds', href: '/classifieds' },
      { label: 'Search', href: '/search' },
      { label: 'Help', href: '/help' },
    ],
  },
}
