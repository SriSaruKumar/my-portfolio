const axios = require('axios');

async function testLeetCode(username) {
  console.log(`Testing LeetCode fetch for: ${username}...`);

  // Method 1: Official LeetCode GraphQL API
  try {
    const query = `
      query userProblemsSolved($username: String!) {
        matchedUser(username: $username) {
          username
          submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
            }
          }
          profile {
            ranking
            reputation
          }
        }
      }
    `;

    const res = await axios.post(
      'https://leetcode.com/graphql',
      { query, variables: { username } },
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Referer': `https://leetcode.com/${username}/`,
        },
        timeout: 8000,
      }
    );

    if (res.data && res.data.data && res.data.data.matchedUser) {
      const user = res.data.data.matchedUser;
      const stats = user.submitStatsGlobal.acSubmissionNum;
      console.log('SUCCESS Method 1 (Official GraphQL):', {
        username: user.username,
        all: stats.find((s) => s.difficulty === 'All')?.count || 0,
        easy: stats.find((s) => s.difficulty === 'Easy')?.count || 0,
        medium: stats.find((s) => s.difficulty === 'Medium')?.count || 0,
        hard: stats.find((s) => s.difficulty === 'Hard')?.count || 0,
        ranking: user.profile?.ranking || 0,
      });
      return;
    } else {
      console.log('Method 1 matchedUser is null (user might not exist or profile is private)');
    }
  } catch (err) {
    console.log('Method 1 error:', err.message);
  }

  // Method 2: Public Proxy 1 (faisalshohag / alfa-leetcode)
  try {
    const res = await axios.get(`https://leetcode-api-faisalshohag.vercel.app/${username}`, { timeout: 8000 });
    console.log('Method 2 (FaisalShohag proxy):', res.data);
  } catch (err) {
    console.log('Method 2 error:', err.message);
  }

  // Method 3: Public Proxy 2 (alfa-leetcode-api)
  try {
    const res = await axios.get(`https://alfa-leetcode-api.onrender.com/userProfile/${username}`, { timeout: 8000 });
    console.log('Method 3 (Alfa proxy):', res.data);
  } catch (err) {
    console.log('Method 3 error:', err.message);
  }

  // Method 4: Public Proxy 3 (alfa-leetcode-api solved)
  try {
    const res = await axios.get(`https://alfa-leetcode-api.onrender.com/${username}/solved`, { timeout: 8000 });
    console.log('Method 4 (Alfa solved):', res.data);
  } catch (err) {
    console.log('Method 4 error:', err.message);
  }
}

testLeetCode(process.argv[2] || 'srisarukumar');
