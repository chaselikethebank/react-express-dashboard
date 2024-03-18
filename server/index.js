// server/index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = "UClYsncuu6rBhsh2lYYb0zdQ";

app.use(cors());

app.get('/main/analytics', async (req, res) => {
  try {
    const youtubeResponse = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${CHANNEL_ID}&key=${YOUTUBE_API_KEY}`);
    const channelData = youtubeResponse.data.items[0];

    const analyticsData = {
      channel: {
        title: channelData.snippet.title,
        description: channelData.snippet.description,
        publishedAt: channelData.snippet.publishedAt,
        viewCount: channelData.statistics.viewCount,
        subscriberCount: channelData.statistics.subscriberCount,
        videoCount: channelData.statistics.videoCount,
      },
      videoPerformance: {
        viewsPerVideo: channelData.statistics.viewCount / channelData.statistics.videoCount,
        likesToDislikesRatio: channelData.statistics.likeCount / channelData.statistics.dislikeCount,
        commentsPerVideo: channelData.statistics.commentCount / channelData.statistics.videoCount,
        averageViewDuration: channelData.statistics.averageViewDuration,
        clickThroughRate: calculateClickThroughRate(channelData.statistics.viewCount, channelData.statistics.subscriberCount),
      },
      audienceEngagement: {
        commentsEngagementRate: calculateCommentsEngagementRate(channelData.statistics.commentCount, channelData.statistics.viewCount),
        likesDislikesTrend: trackLikesDislikesTrend(),
        socialSharesPerVideo: trackSocialSharesPerVideo(),
        subscribersGainedPerVideo: trackSubscribersGainedPerVideo(),
      },
      monetization: {
        adRevenuePerVideo: calculateAdRevenuePerVideo(),
        totalAdRevenue: calculateTotalAdRevenue(),
        revenuePerSubscriber: calculateRevenuePerSubscriber(channelData.statistics.subscriberCount),
        revenueSources: trackRevenueSources(),
      },
       
    };

    res.json({ analyticsData });
  } catch (error) {
    console.error("Error fetching analytics:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function calculateClickThroughRate(viewCount, subscriberCount) {
 
  return (viewCount / subscriberCount) * 100;
}

function calculateCommentsEngagementRate(commentCount, viewCount) {
  return (commentCount / viewCount) * 100;
}

function trackLikesDislikesTrend() {
  return { /* Trend data */ };
}

function trackSocialSharesPerVideo() {
  return { /* Social shares data */ };
}

function trackSubscribersGainedPerVideo() {
  return { /* Subscribers gained data */ };
}

function calculateAdRevenuePerVideo() {
  return /* Ad revenue per video */;
}

function calculateTotalAdRevenue() {
  return /* Total ad revenue */;
}

function calculateRevenuePerSubscriber(subscriberCount) {
  return /* Revenue per subscriber */;
}

function trackRevenueSources() {
  return { /* Revenue sources data */ };
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`, YOUTUBE_API_KEY, CHANNEL_ID);
});
