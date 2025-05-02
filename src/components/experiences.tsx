import {getTranslation} from '@/lib/i18n'
import {ELanguages} from '@/types/enums'
import {Trans} from 'react-i18next/TransWithoutContext'
import Tag from './tag'
import Link from 'next/link'
import {ArrowUpRight, LinkIcon} from 'lucide-react'

interface IExperienceKeys {
  id?: number | string
  company: string
  role: string
  period: string
  tags: string
  description: string
  description_list: string
}

function getExperienceKeys(prefix: string): IExperienceKeys {
  return {
    id: prefix,
    company: `${prefix}_company`,
    role: `${prefix}_role`,
    period: `${prefix}_period`,
    tags: `${prefix}_tags`,
    description: `${prefix}_description`,
    description_list: `${prefix}_description_list`,
  }
}

const experiences: IExperienceKeys[] = ['station_f', 'diving_bear', 'phd'].map(
  prefix => getExperienceKeys(prefix),
)

export default async function Experiences({lng}: {lng: ELanguages}) {
  const {t} = await getTranslation(lng, undefined, {keyPrefix: 'experience'})
  return (
    <section id='experience'>
      <div className='mb-6 flex flex-col gap-6 lg:-mt-4'>
        <h2 className='text-sm font-semibold text-slate-500 dark:text-slate-500 lg:invisible lg:h-0'>
          {t('section_title')}
        </h2>
        <ul className='flex flex-col gap-6'>
          {experiences.map(expKeys => (
            <Experience key={expKeys.id} lng={lng} experienceKeys={expKeys} />
          ))}
        </ul>
      </div>
      <a
        href='/files/CV_leo-petit.pdf'
        target='_blank'
        rel='noopener noreferrer'
        className='group/cv inline-block gap-2 text-base text-cyan-600 hover:text-cyan-500'>
        <div className='mr-2 inline'>{t('view_cv')}</div>
        <ArrowUpRight
          size='14px'
          className='inline group-hover/cv:-translate-y-1 group-hover/cv:translate-x-1'
        />
      </a>
    </section>
  )
}

async function Experience({
  lng,
  experienceKeys,
}: {
  lng: ELanguages
  experienceKeys: IExperienceKeys
}) {
  const {t} = await getTranslation(lng, undefined, {keyPrefix: 'experience'})

  const descriptionListElements = t(experienceKeys.description_list, {
    returnObjects: true,
  }) as string[]

  const tagsText = t(experienceKeys.tags, {returnObjects: true}) as string[]

  const emphTextColor = 'font-semibold text-teal-700 dark:text-slate-100'

  return (
    <div className='group flex flex-col gap-1 rounded-lg px-0 py-2 md:grid md:grid-cols-3 lg:border lg:border-transparent lg:p-2 lg:hover:z-50 lg:hover:border lg:hover:border-slate-300 lg:hover:bg-slate-100 lg:dark:hover:border-slate-700 lg:dark:hover:bg-slate-900'>
      <div className='text-sm font-medium text-slate-600 dark:text-slate-500 md:col-span-1 md:mt-[6px]'>
        {t(experienceKeys.period)}
      </div>
      <div className='flex flex-col gap-4 md:col-span-2'>
        <div>
          <h2 className='inline-block text-xl font-medium text-slate-600 dark:text-slate-100'>
            {t(experienceKeys.role)}
          </h2>{' '}
          <span className='inline-block text-slate-500 dark:text-slate-400'>
            ·
          </span>{' '}
          <h3 className='inline-block text-lg font-semibold text-slate-500 dark:text-slate-400'>
            {t(experienceKeys.company)}
          </h3>
        </div>
        <p className='text-sm font-extralight text-slate-500 dark:text-slate-400'>
          <Trans
            t={t}
            i18nKey={experienceKeys.description}
            components={{
              emph: <strong className={emphTextColor} />,
            }}
          />
        </p>
        <ul className='flex flex-col gap-y-2'>
          {descriptionListElements.map((description, idx) => (
            <li
              key={idx}
              className='text-xs font-light text-slate-500 dark:text-slate-500'>
              - {description}
            </li>
          ))}
        </ul>
        {experienceKeys.id === 'phd' && (
          <Link
            href='https://agupubs.onlinelibrary.wiley.com/doi/pdfdirect/10.1029/2023GC011229'
            target='_blank'
            rel='noopener'
            className='group/link flex items-center gap-2 text-xs text-cyan-600 hover:text-cyan-500'>
            <LinkIcon className='group-hover/link:text-cyen-500 size-4' />{' '}
            {t('phd_link')}
          </Link>
        )}
        <div className='flex flex-wrap gap-2'>
          {tagsText.map(tag => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
      </div>
    </div>
  )
}
