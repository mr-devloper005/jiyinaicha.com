'use client'

import { LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuth } from '@/lib/auth-context'

export function NavbarAuthControls() {
  const { user, logout } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-emerald-100 hover:bg-white/10 hover:text-white"
          aria-label="Account menu"
        >
          <Avatar className="h-9 w-9 border border-[#5ee9b5]/35">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-[#134d3a] text-sm font-semibold text-[#5ee9b5]">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 border-[#cfe5d6] bg-white/98">
        <div className="flex items-center gap-3 p-3">
          <Avatar className="h-10 w-10 border border-[#cfe5d6]">
            <AvatarImage src={user?.avatar} alt={user?.name} />
            <AvatarFallback className="bg-[#e8f5ef] text-sm font-semibold text-[#134d3a]">
              {user?.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col">
            <span className="block truncate text-sm font-medium text-[#0c1a14]">{user?.name}</span>
            <span className="block truncate text-xs text-[#5a6f65]">{user?.email}</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={logout}
          className="mx-1 mb-1 cursor-pointer gap-2 rounded-md px-3 py-2.5 font-semibold text-[#134d3a] focus:bg-[#5ee9b5]/35 focus:text-[#052018] data-[highlighted]:bg-[#5ee9b5]/35 data-[highlighted]:text-[#052018] [&_svg]:text-[#134d3a] data-[highlighted]:[&_svg]:text-[#052018] focus:[&_svg]:text-[#052018]"
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
