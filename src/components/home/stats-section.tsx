'use client'

import { motion } from 'framer-motion'
import { MapPin, Tag, Clock, Users } from 'lucide-react'

const stats = [
  {
    icon: Tag,
    value: '50K+',
    label: 'Classified ads',
    description: 'Items and services posted by local sellers',
  },
  {
    icon: MapPin,
    value: '120+',
    label: 'Towns & areas',
    description: 'Neighborhoods represented in search',
  },
  {
    icon: Clock,
    value: '24h',
    label: 'Avg. first reply',
    description: 'Typical time to hear back on an ad',
  },
  {
    icon: Users,
    value: '100K+',
    label: 'Monthly visits',
    description: 'Buyers browsing categories every month',
  },
]

export function StatsSection() {
  return (
    <section className="border-b border-border bg-secondary/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Platform in Numbers
          </h2>
          <p className="mt-2 text-muted-foreground">A marketplace tuned for local deals—not generic feeds.</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                <stat.icon className="h-7 w-7 text-accent" />
              </div>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="mt-1 font-medium text-foreground">{stat.label}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
