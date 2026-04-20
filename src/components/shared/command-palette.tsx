'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { useToast } from '@/components/ui/use-toast'
import {
  Plus,
  Settings,
  Search,
  Tag,
  Building2,
  FileText,
  Image as ImageIcon,
  User,
  LayoutGrid,
  type LucideIcon,
} from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'

const taskNavigateIcons: Partial<Record<TaskKey, LucideIcon>> = {
  listing: Building2,
  classified: Tag,
  article: FileText,
  image: ImageIcon,
  profile: User,
  sbm: LayoutGrid,
  pdf: FileText,
  org: Building2,
  social: LayoutGrid,
  comment: FileText,
}

export function CommandPalette() {
  const router = useRouter()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  const quickLinks = useMemo(() => {
    const taskLinks = SITE_CONFIG.tasks
      .filter((t) => t.enabled)
      .map((t) => {
        const Icon = taskNavigateIcons[t.key] || Tag
        return {
          label: `Go to ${t.label}`,
          href: t.route,
          icon: Icon,
        }
      })
    return [...taskLinks, { label: 'Go to Settings', href: '/settings', icon: Settings }]
  }, [])

  const createActions = useMemo(
    () =>
      SITE_CONFIG.tasks
        .filter((t) => t.enabled)
        .map((t) => ({
          label:
            t.key === 'classified'
              ? 'Post a classified ad'
              : `Create ${t.label.replace(/s$/, '')}`,
          href: `/create/${t.key}`,
          icon: Plus,
        })),
    []
  )

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <CommandDialog open={open} onOpenChange={setOpen} title="Command Palette" description="Search for a command to run...">
      <CommandInput placeholder="Search commands..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          {quickLinks.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => {
                router.push(item.href)
                setOpen(false)
              }}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Create">
          {createActions.map((item) => (
            <CommandItem
              key={item.href}
              onSelect={() => {
                router.push(item.href)
                setOpen(false)
              }}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Quick">
          <CommandItem
            onSelect={() => {
              toast({ title: 'Search opened', description: 'Use the hero search or /search page.' })
              router.push('/search')
              setOpen(false)
            }}
          >
            <Search className="mr-2 h-4 w-4" />
            Open Search
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
