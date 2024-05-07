import * as cheerio from 'cheerio'
import { ImageResponse } from 'next/og'
import { type NextRequest, NextResponse } from 'next/server'

import { ratelimit, redis } from '~/lib/redis'

export const runtime = 'edge'
export const revalidate = 259200 // 3 days

function getKey(url: string) {
  return `favicon:${url}`
}

const faviconMapper: { [key: string]: string } = {
  '((?:zolplay.cn)|(?:zolplay.com)|(?:cn.zolplay.com))':
    'https://github.com/papayahu/papayahu.so/blob/main/public/favicons/zolplay.png',
  '(?:github.com)': 'https://github.com/papayahu/papayahu.so/blob/main/public/favicons/github.png',
  '((?:t.co)|(?:twitter.com)|(?:x.com))':
    'https://github.com/papayahu/papayahu.so/blob/main/public/favicons/twitter.png',
  'coolshell.cn': 'https://github.com/papayahu/papayahu.so/blob/main/public/favicons/coolshell.png',
  'vercel.com': 'https://github.com/papayahu/papayahu.so/blob/main/public/favicons/vercel.png',
  'nextjs.org': 'https://github.com/papayahu/papayahu.so/blob/main/public/favicons/nextjs.png',
  '(?:papayahu-so.vercel.app)': 'https://github.com/papayahu/papayahu.so/blob/main/public/android-chrome-192x192.png'
}

function getPredefinedIconForUrl(url: string): string | undefined {
  for (const regexStr in faviconMapper) {
    const regex = new RegExp(
      `^(?:https?:\/\/)?(?:[^@/\\n]+@)?(?:www.)?` + regexStr
    )
    if (regex.test(url)) {
      return faviconMapper[regexStr]
    }
  }

  return undefined
}

const width = 32
const height = width
function renderFavicon(url: string) {
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt={`${url} 的圖標`} width={width} height={height} />
    ),
    {
      width,
      height,
    }
  )
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const url = searchParams.get('url')

  if (!url) {
    return NextResponse.error()
  }

  const { success } = await ratelimit.limit('favicon' + `_${req.ip ?? ''}`)
  if (!success) {
    return NextResponse.error()
  }

  let iconUrl = 'https://github.com/papayahu/papayahu.so/blob/main/public/favicon_blank.png'

  try {
    const predefinedIcon = getPredefinedIconForUrl(url)
    if (predefinedIcon) {
      return renderFavicon(predefinedIcon)
    }

    const cachedFavicon = await redis.get<string>(getKey(url))
    if (cachedFavicon) {
      return renderFavicon(cachedFavicon)
    }

    const res = await fetch(new URL(`https://${url}`).href, {
      headers: {
        'Content-Type': 'text/html',
      },
      cache: 'force-cache',
    })

    if (res.ok) {
      const html = await res.text()
      const $ = cheerio.load(html)
      const appleTouchIcon = $('link[rel="apple-touch-icon"]').attr('href')
      const favicon = $('link[rel="icon"]').attr('href')
      const shortcutFavicon = $('link[rel="shortcut icon"]').attr('href')
      const finalFavicon = appleTouchIcon ?? favicon ?? shortcutFavicon
      if (finalFavicon) {
        iconUrl = new URL(finalFavicon, new URL(`https://${url}`).href).href
      }
    }

    await redis.set(getKey(url), iconUrl, { ex: revalidate })

    return renderFavicon(iconUrl)
  } catch (e) {
    console.error(e)
  }

  await redis.set(getKey(url), iconUrl, { ex: revalidate })

  return renderFavicon(iconUrl)
}
