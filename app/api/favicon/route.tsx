import * as cheerio from 'cheerio'
import { ImageResponse } from 'next/og'
import { type NextRequest, NextResponse } from 'next/server'

import { ratelimit, redis } from '~/lib/redis'
// 在这里放置 extractIconFromPage 函数
async function extractIconFromPage(url: string): Promise<string | undefined> {
  // 在这里编写从页面内容中提取图标链接的逻辑
  // 可以使用 cheerio 或其他 HTML 解析库来解析页面内容，然后查找可能的图标链接
  // 如果找到了图标链接，则返回该链接，否则返回 undefined
}
export const runtime = 'edge'
export const revalidate = 259200 // 3 days

function getKey(url: string) {
  return `favicon:${url}`
}

const faviconMapper: { [key: string]: string } = {
  '((?:zolplay.cn)|(?:zolplay.com)|(?:cn.zolplay.com))':
    'https://papayahu-so.vercel.app/favicons/zolplay.png',
  '(?:github.com)': 'https://papayahu-so.vercel.app/favicons/github.png',
  '((?:t.co)|(?:twitter.com)|(?:x.com))':
    'https://papayahu-so.vercel.app/favicons/twitter.png',
  'coolshell.cn': 'https://papayahu-so.vercel.app/favicons/coolshell.png',
  'vercel.com': 'https://papayahu-so.vercel.app/favicons/vercel.png',
  'nextjs.org': 'https://papayahu-so.vercel.app/favicons/nextjs.png',
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

  let iconUrl = 'https://papayahu-so.vercel.app/favicon_blank.png'

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
// 如果没有找到预定义图标 URL 并且从页面头部也没有提取到图标链接，则尝试从页面内容中提取
if (!predefinedIcon && !cachedFavicon && !iconUrl) {
  iconUrl = await extractIconFromPage(url) ?? 'https://papayahu-so.vercel.app/favicon_blank.png'
}    
    
    await redis.set(getKey(url), iconUrl, { ex: revalidate })

    return renderFavicon(iconUrl)
  } catch (e) {
    console.error(e)
  }

  await redis.set(getKey(url), iconUrl, { ex: revalidate })

  return renderFavicon(iconUrl)
}
