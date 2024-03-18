// src/components/YouTubeChannelAnalytics.tsx
import  { useState, useEffect } from "react";
import axios from "axios";

interface ChannelInfo {
  topicCategories: any;
  title: string;
  description: string;
  publishedAt: string;
  viewCount: number;
  subscriberCount: number;
  videoCount: number;
}

function YouTubeChannelAnalytics() {
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null);
  
  useEffect(() => {
    async function fetchChannelInfo() {
      try {
        const response = await axios.get("http://localhost:3000/main/analytics");
        setChannelInfo(response.data.analyticsData.channel);  
        console.log(response)
      } catch (error) {
        console.error("Error fetching channel info:", error);
      }
    }

    fetchChannelInfo();
  }, []);

  return (
    <div>
     
      {channelInfo ? (
        <div>
          <h2>Name: {channelInfo.title}</h2>
          <p>Description: {channelInfo.description}</p>
          <p>Last Published At: {channelInfo.publishedAt}</p>
          <p>Total Views: {channelInfo.viewCount}</p>
          <p>Subscribers: {channelInfo.subscriberCount}</p>
          <p>Total Videos: {channelInfo.videoCount}</p>
          {channelInfo.topicCategories && (
            <p>Topic Categories: {channelInfo.topicCategories.join(", ")}</p>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default YouTubeChannelAnalytics;
