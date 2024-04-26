import Image from 'next/image'
import Balancer from 'react-wrap-balancer'

import { RichLink } from '~/components/links/RichLink'
import { Container } from '~/components/ui/Container'

//import AlipayQR from './alipay-qr.jpg'
//import ThankYouLetterScreenshot1 from './Arc aagD26w9@2x.png'
//import ThankYouLetterScreenshot2 from './Arc ynleUdHy@2x.png'

const title = '我的Mastodon隨記園地'
const description =
  '一些生活碎片'

const myTimeline = new MastodonTimeline.Init({
instanceUrl: "https://mastodon.social",
timelineType: "profile",
userId: "112336750066396391",
profileName: "@papayahu_",
});

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
}

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@idotj/mastodon-embed-timeline@4.4.2/dist/mastodon-timeline.min.css" integrity="sha256-1UGgxsonaMCfOEnVOL89aMKSo3GEAmaRP0ISbsWa6lU=" crossorigin="anonymous">
<script src="https://cdn.jsdelivr.net/npm/@idotj/mastodon-embed-timeline@4.4.2/dist/mastodon-timeline.umd.js" integrity="sha256-E6WPG6iq+qQIzvu3HPJJxoAeRdum5siq13x4ITjyxu8=" crossorigin="anonymous"></script>

  <div id="mt-container" class="mt-container">
  <div class="mt-body" role="feed">
    <div class="mt-loading-spinner"></div>
  </div>
</div>
