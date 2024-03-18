import React, { useState, useEffect } from "react";
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

const Dashboard = () => {
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch channel analytics data
        const response = await axios.get("http://localhost:3000/main/analytics");
        const data = response.data.analyticsData;

        // Extract required data
        setChannelInfo(data.channel);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="dashboard">

      {/* Display key metrics */}
      {channelInfo && (
        <div className="key-metrics">
          <div className="metric-card">
            <h2>Total Subscribers</h2>
            <p>{channelInfo.subscriberCount}</p>
          </div>
          <div className="metric-card">
            <h2>Total Views</h2>
            <p>{channelInfo.viewCount}</p>
          </div>
          <div className="metric-card">
            <h2>Total Videos</h2>
            <p>{channelInfo.videoCount}</p>
          </div>
          {/* Add more key metrics as needed */}
        </div>
      )}

      {/* Add more sections to display additional data */}
    </div>
  );
};

export default Dashboard;
