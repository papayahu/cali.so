import * as React from 'react'

import { emailConfig } from '../config/email'
import { Button, Heading, Hr, Img, Link, Section, Text } from './_components'
import Layout from './Layout'

const ConfirmSubscriptionEmail = ({ link = 'link.com/confirm?fake-token' }) => {
  const previewText = `確認訂閱 Tracy 的動態嗎？`

  return (
    <Layout previewText={previewText}>
      <Section className="mt-[24px]">
        <Img
          src={`${emailConfig.baseUrl}/subscription-email-header.jpg`}
          width="250"
          height="129.28"
          alt="Cali"
          className="mx-auto my-0"
        />
      </Section>
      <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-bold text-black">
        訂閱 Tracy 的動態
      </Heading>
      <Text className="text-[14px] leading-[24px] text-black">Hello!</Text>
      <Text className="text-[14px] leading-[24px] text-black">
        為了認證此操作，請點擊下面的按鈕確認訂閱 Tracy 的動態噢，謝謝 🙏
      </Text>
      <Section className="mb-[32px] mt-[32px] text-center">
        <Button
          pX={20}
          pY={12}
          className="rounded-xl bg-zinc-900 text-center text-[12px] font-semibold text-white no-underline"
          href={link}
        >
          確認訂閱
        </Button>
      </Section>
      <Text className="text-[14px] leading-[24px] text-black">
        或者複製下面的連結到你的瀏覽器中進行訪問：
        <br />
        <Link href={link} className="text-blue-600 no-underline">
          {link}
        </Link>
      </Text>
      <Hr className="mx-0 my-[26px] h-px w-full bg-zinc-100" />
      <Text className="text-[12px] leading-[24px] text-[#666666]">
        如果不是你本人操作的可以無視本封信件，如果你有任何疑問可以隨時聯繫我。
      </Text>
    </Layout>
  )
}

export default ConfirmSubscriptionEmail
