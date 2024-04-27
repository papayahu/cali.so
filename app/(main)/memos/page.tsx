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
    // Define MastodonTimelineInit interface
    interface MastodonTimelineInit {
      instanceUrl: string;
      timelineType: 'local' | 'profile' | 'hashtag';
      userId?: string;
      profileName?: string;
    }

    // Create MastodonTimelineInit instance
    const myTimelineInit: MastodonTimelineInit = {
      instanceUrl: "https://mastodon.social",
      timelineType: "profile",
      userId: "112336750066396391",
      profileName: "@papayahu_",
    };

    // Create MastodonTimeline instance
    const myTimeline = new MastodonTimeline.Init(myTimelineInit);
  </script>
</body>

