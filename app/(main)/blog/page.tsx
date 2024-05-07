import Balancer from 'react-wrap-balancer'
import Image from 'next/image'

import { SocialLink } from '~/components/links/SocialLink'
import { Container } from '~/components/ui/Container'

import { BlogPosts } from './BlogPosts'

const description =
  '一些有趣、實用的軟體分享，希望大家都可以發現屬於自己的寶藏！'
export const metadata = {
  title: '尋寶塢',
  description,
  openGraph: {
    title: '尋寶塢',
    description,
  },
  twitter: {
    title: '尋寶塢',
    description,
    card: 'summary_large_image',
  },
}

// TODO: add pagination or infinite scroll
export default function BlogPage() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          歡迎光臨尋寶塢
        </h1>
        <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>{description}</Balancer>
        </p>
        <p className="flex items-center">
          <SocialLink href="/feed.xml" platform="rss" />
        </p>
      </header>
      <div className="mt-12 grid grid-cols-1 gap-6 sm:mt-20 lg:grid-cols-2 lg:gap-8">
        <BlogPosts limit={20} />
      </div>
    </Container>
  )
}

{favicon && faviconUrl && (
  <span
    className={clsxm(
      'mr-px inline-flex translate-y-0.5',
      hostsThatNeedInvertedFavicons.includes(hrefHost) && 'dark:invert'
    )}
  >
    {faviconUrl ? (
      <Image
        src={faviconUrl}
        alt=""
        aria-hidden="true"
        className="inline h-4 w-4 rounded"
        width={16}
        height={16}
        unoptimized
        priority={false}
      />
    ) : (
      <Image
        src="/public/favicon_blank.png" // 使用指定的png圖片
        alt=""
        aria-hidden="true"
        className="inline h-4 w-4 rounded"
        width={16}
        height={16}
        unoptimized
        priority={false}
      />
    )}
  </span>
)}

export const revalidate = 60
