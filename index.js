const fetch = require("node-fetch");
const snoowrap = require("snoowrap");
require("dotenv").config();

(async () => {
  try {
    // Config Snoowrap
    const r = new snoowrap({
      userAgent:
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      refreshToken: process.env.REDDIT_REFRESH_TOKEN
    });

    // Get Sub Reddit
    const subReddit = r.getSubreddit("listentothis");

    // Get Random post
    const randomPost = await subReddit.getRandomSubmission();

    // Post Status
    const access_token = process.env.FACEBOOK_ACCESS_TOKEN;
    const messageData = {
      url: randomPost.url,
      author: randomPost.author.name,
      title: randomPost.title
    };
    const messageTemplate = `Listen and enjoy to this song ${messageData.title}
  
  Credit: ${messageData.author}
  `;
    const url = `https://graph.facebook.com/v5.0/101580544646661/feed?message=${messageTemplate}&link=${messageData.url}&access_token=${access_token}`;
    const postStatus = await fetch(url, {
      method: "POST"
    });
    const response = await postStatus.json();
    console.log(response);
  } catch (error) {
    console.error(error);
  }
})();
