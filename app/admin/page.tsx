import { Card, Grid, Metric, Text, Title } from '@tremor/react'
import { sql } from 'drizzle-orm'
import React from 'react'

import { db } from '~/db'

export default async function AdminPage() {
  const {
    rows: [count],
  } = await db.execute<{
    comments: number
    subscribers: number
    guestbook: number
  }>(
    sql`SELECT 
  (SELECT COUNT(*) FROM comments) as comments,
  (SELECT COUNT(*) FROM subscribers WHERE subscribed_at IS NOT NULL) as subscribers,
  (SELECT COUNT(*) FROM guestbook) as guestbook`
  )

  return (
    <>
      <Title>後台儀表盤</Title>

      <Grid numItemsMd={2} numItemsLg={3} className="mt-6 gap-6">
        <Card>
          <Text>總評論</Text>

          {count && 'comments' in count && <Metric>{count.comments}</Metric>}
        </Card>
        <Card>
          <Text>總訂閱</Text>
          {count && 'subscribers' in count && (
            <Metric>{count.subscribers}</Metric>
          )}
        </Card>
        <Card>
          <Text>總留言</Text>
          {count && 'guestbook' in count && <Metric>{count.guestbook}</Metric>}
        </Card>
      </Grid>
    </>
  )
}
