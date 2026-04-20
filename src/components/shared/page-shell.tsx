'use client'

import type { ReactNode } from 'react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'

export function PageShell({
  title,
  description,
  actions,
  children,
}: {
  title: string
  description?: string
  actions?: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f4faf7_0%,#ffffff_45%)]">
      <NavbarShell />
      <main>
        <section className="border-b border-[#cfe5d6] bg-[linear-gradient(90deg,rgba(94,233,181,0.08),transparent_55%)]">
          <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#0c1a14]">{title}</h1>
                {description && (
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#3d5248]">{description}</p>
                )}
              </div>
              {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">{children}</section>
      </main>
      <Footer />
    </div>
  )
}
