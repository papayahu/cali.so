<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Your site title</title>
  <!-- CSS -->
  <link href="app/(main)/memos/mastodon-timeline.min.css" rel="stylesheet" />
</head>

<body>
  <!-- Mastodon Timeline -->
  <div id="mt-container" class="mt-container">
    <div class="mt-body" role="feed">
      <div class="mt-loading-spinner"></div>
    </div>
  </div>  

  <!-- JavaScript -->
  <script src="app/(main)/memos/mastodon-timeline.umd.js"></script>
  <script>
    // 定義 MastodonTimelineInit 介面
    interface MastodonTimelineInit {
     instanceUrl: string;
     timelineType: 'local' | 'profile' | 'hashtag';
     userId?: string;
     profileName?: string;
    }

    // 創建 MastodonTimelineInit 實例
    const myTimelineInit: MastodonTimelineInit = {
     instanceUrl: "https://mastodon.social",
     timelineType: "profile",
     userId: "112336750066396391",
     profileName: "@papayahu_",
    };

    // 引入 JavaScript 文件
    import * as MastodonTimeline from 'mastodon-timeline';
    
    // 創建 MastodonTimeline 實例
    const myTimeline = new MastodonTimeline.Init(myTimelineInit);
  </script>
</body>

