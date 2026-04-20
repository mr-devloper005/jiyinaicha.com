'use client'

import { type FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { toast } from '@/components/ui/use-toast'

export function LoginFormPanel({
  actionClassName,
  mutedClassName,
}: {
  actionClassName: string
  mutedClassName: string
}) {
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    await login(email, password)
    toast({
      title: 'Signed in',
      description: 'Your session is saved on this device.',
    })
    router.push('/dashboard')
  }

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-70">Welcome back</p>
      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        <input
          className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm"
          placeholder="Email address"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          required
        />
        <input
          className="h-12 rounded-xl border border-current/10 bg-transparent px-4 text-sm"
          placeholder="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          required
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition-opacity disabled:opacity-60 ${actionClassName}`}
        >
          {isLoading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
      <div className={`mt-6 flex items-center justify-between text-sm ${mutedClassName}`}>
        <Link href="/forgot-password" className="hover:underline">
          Forgot password?
        </Link>
        <Link href="/register" className="inline-flex items-center gap-2 font-semibold hover:underline">
          <Sparkles className="h-4 w-4" />
          Create account
        </Link>
      </div>
    </>
  )
}
