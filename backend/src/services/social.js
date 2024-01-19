const fs = require('fs');

module.exports = class SocialService {


  readJsonFromFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file:", err);
            return;
        }
        try {
            const userData = JSON.parse(jsonString);
            readSocialData(userData);
        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
    });
}
    readTwitterSocialData(jsonFile) {
      // Parse the JSON string into an object
      let userData = JSON.parse(jsonString);

      // Accessing the user's data
      let user = userData.users[0]; // assuming we're interested in the first user

      console.log("User Details:");
      console.log("ID:", user.id);
      console.log("Name:", user.name);
      console.log("Followers:", user.followers.length);
      console.log("Following:", user.following.length);

      // Iterating through user's comments
      console.log("\nUser Comments:");
      user.comments.forEach(comment => {
          console.log(`Date: ${comment.timestamp}, Text: ${comment.text}, Emotion: ${comment.emotion}, Retweets: ${comment.retweets}`);
      });
    }


    readSimpleSocialData(jsonString) {
      // Parse the JSON string into an object
      const userData = JSON.parse(jsonString);
  
      // Access the main user's name
      console.log(`Main User: ${userData.user}`);
  
      // Iterate through each connection
      userData.connections.forEach(connection => {
          console.log(`\nConnection: ${connection.user}`);
          console.log(`Relationship: ${connection.relationship}`);
          console.log(`Friends: ${connection.friends.join(', ')}`);
  
          // Iterate through each post of the connection
          connection.posts.forEach(post => {
              console.log(`\n\tPost Date: ${post.timestamp}`);
              console.log(`\tContent: ${post.content}`);
              if (post.image) {
                  console.log(`\tImage: ${post.image}`);
              }
  
              // Iterate through each comment on the post
              post.comments.forEach(comment => {
                  console.log(`\n\t\tComment by: ${comment.user}`);
                  console.log(`\t\tTimestamp: ${comment.timestamp}`);
                  console.log(`\t\tText: ${comment.text}`);
                  console.log(`\t\tRating: ${comment.rating}`);
              });
          });
      });
    }

    processLinkedInSocialData(jsonData) {
      // Parse the JSON data
      const people = JSON.parse(jsonData);
  
      // Process each person in the list
      people.forEach(person => {
          console.log(`Name: ${person.name}`);
          console.log(`Title: ${person.title}`);
          console.log(`Industry: ${person.industry}`);
          console.log(`Company: ${person.company}`);
          console.log(`Employer: ${person.employer}`);
          console.log('Posts:');
  
          // Process each post
          person.posts.forEach(post => {
              console.log(`  Post ID: ${post.id}`);
              console.log(`  Content: ${post.content}`);
              console.log(`  Sentiment: ${post.sentiment}`);
              console.log('  Comments:');
  
              // Process each comment
              post.comments.forEach(comment => {
                  console.log(`    Comment ID: ${comment.id}`);
                  console.log(`    Content: ${comment.content}`);
                  console.log(`    Sentiment: ${comment.sentiment}`);
              });
          });
  
          console.log('----------------------------------');
      });
  }   
};

