import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Icons } from "@/components/icons"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b border-b-slate-200 bg-white dark:border-b-slate-700 dark:bg-slate-900">
        <div className="container flex h-14 items-center sm:justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Icons.logo />
              <span className="sr-only">{siteConfig.name}</span>
            </Link>
          </div>
          <nav className="ml-auto flex items-center space-x-1">
            <Link href={siteConfig.links.github}>
              <Icons.gitHub className="mr-2 h-4 w-4" /> GitHub
            </Link>
          </nav>
        </div>
      </header>
      <main className="grid flex-1">{children}</main>
    </div>
  )
}
