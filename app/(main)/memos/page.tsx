<!DOCTYPE html>

<html lang="en">
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
      const myTimeline = new MastodonTimeline.Init({
        instanceUrl: "https://mastodon.social",
        timelineType: "profile",
        userId: "112336750066396391",
        profileName: "@papayahu_",
      });    

    </script>
  </body>
</html>
