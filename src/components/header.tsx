import {ELanguages} from '@/types/enums'
import {getTranslation} from '@/lib/i18n'
import {cn} from '@/lib/utils'
import Links from './links'
import Link from 'next/link'
import TabElement from './client/tab-element'

export default function Header({
  lng,
  className,
}: {
  lng: ELanguages
  className?: string
}) {
  return (
    <header className={cn('flex flex-col justify-between gap-0', className)}>
      <div className='flex flex-col lg:gap-16'>
        <Title lng={lng} />
        <Tabs lng={lng} />
      </div>
      <Links lng={lng} className='invisible h-0 lg:visible' />
    </header>
  )
}

export async function Title({lng}: {lng: ELanguages}) {
  const {t} = await getTranslation(lng)
  return (
    <section className='flex flex-col gap-4'>
      <h1 className='text-3xl font-semibold text-slate-600 dark:text-slate-100 md:text-5xl'>
        Léo Petit
      </h1>
      <h2 className='text-lg text-slate-600 dark:text-slate-100 md:text-xl'>
        {t('subtitle')}
      </h2>
      <h3 className='text-xs font-light text-slate-500 dark:text-slate-400 md:text-sm'>
        {t('pitch')}
      </h3>
    </section>
  )
}

const tabsKeys = ['about', 'experience', 'education']
function Tabs({lng}: {lng: ELanguages}) {
  return (
    <ul className='invisible flex h-0 flex-col items-start lg:visible'>
      {tabsKeys.map(tabKey => (
        <li key={tabKey}>
          <Link href={tabKey !== 'about' ? `#${tabKey}` : `#content`}>
            <TabElement lng={lng} tabKey={tabKey} />
          </Link>
        </li>
      ))}
    </ul>
  )
}
