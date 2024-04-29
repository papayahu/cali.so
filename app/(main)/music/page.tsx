import Balancer from 'react-wrap-balancer';
import { Container } from '~/components/ui/Container';
import { RichLink } from '~/components/links/RichLink';

const title = '音樂光廊';
const description = '網易雲自用歌單分享';

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
  twitter: {
    title,
    description,
    card: 'summary_large_image',
  },
};

export default function MusicLightGallery() {
  return (
    <Container className="mt-16 sm:mt-24">
      <header className="max-w-2xl">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          MUSIC HEAVEN / 音樂光廊
        </h1>
        <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
          <Balancer>{description}</Balancer>
        </p>
      </header>

      <article className="prose dark:prose-invert">
        <h2>自用歌單分享</h2>
        <p>歡迎一起來聽歌！</p>
        <ul>
          <li>
            <b>beacon</b>：<RichLink href="https://heo-music-xi.vercel.app" target="_blank">揮別沮喪的網，迎接希望的光</RichLink>
          </li>
          <li>
            <b>morning</b>：<RichLink href="https://papayahu.github.io/morning" target="_blank">適合早晨睡眼惺忪時聽的歌曲</RichLink>
          </li>
          <li>
            <b>faves</b>：<RichLink href="https://papayahu.github.io/faves" target="_blank">精選</RichLink>
          </li>
          <li>
            <b>listening</b>：<RichLink href="https://papayahu.github.io/listening" target="_blank">純音精選</RichLink>
          </li>          
          <li>
            <b>2021</b>：<RichLink href="https://papayahu.github.io/2021" target="_blank">2021年度歌單</RichLink>
          </li> 
          <li>
            <b>2022</b>：<RichLink href="https://papayahu.github.io/2022" target="_blank">2022年度歌單</RichLink>
          </li> 
          <li>
            <b>2023</b>：<RichLink href="https://papayahu.github.io/2023" target="_blank">2023年度歌單</RichLink>
          </li> 
          <li>
            <b>heart</b>：<RichLink href="https://papayahu.github.io/heart" target="_blank">最新1000首紅心歌曲</RichLink>
          </li>     
        </ul>
      </article>
    </Container>
  );
}
