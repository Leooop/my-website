'use client'

import {useTranslation} from '@/lib/i18n/client'
import {cn} from '@/lib/utils'
import {ActiveSectionContext} from '@/providers/active-section-context'
import {ELanguages} from '@/types/enums'
import {useContext} from 'react'

export default function TabElement({
  lng,
  tabKey,
}: {
  lng: ELanguages
  tabKey: string
}) {
  const {t} = useTranslation(lng, undefined, {keyPrefix: 'tabs'})
  const {activeSection} = useContext(ActiveSectionContext)

  const baseClassName = 'text-slate-600 dark:text-slate-400'
  const baseLineClassName = 'bg-slate-600 dark:bg-slate-400'
  const activeClassName = 'text-slate-900 dark:text-slate-100'
  const activeLineClassName = 'bg-slate-900 dark:bg-slate-100 w-16'

  return (
    <div
      className={cn(
        'group flex items-center gap-x-4 py-4 text-xs font-normal tracking-widest hover:text-slate-900 dark:hover:text-slate-100',
        tabKey === activeSection ? activeClassName : baseClassName,
      )}>
      <TabLine
        className={cn(
          'inline-block h-[2px] w-8 border-none transition-all duration-150 ease-in-out group-hover:w-16 group-hover:bg-slate-900 dark:group-hover:bg-slate-100',
          tabKey === activeSection ? activeLineClassName : baseLineClassName,
        )}
      />
      {t(tabKey)}
    </div>
  )
}

const TabLine = ({className}: {className?: string}) => (
  <hr className={cn('', className)} />
)
