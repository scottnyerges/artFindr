// scrape script
// =============
// add "https://www.austinchronicle.com" to the href attrib
// 
// =============



// Require axios and cheerio, making our scrapes possible
var axios = require("axios");
var cheerio = require("cheerio");

// This function will scrape the NYTimes website
var scrape = function() {
  // Scrape the NYTimes website
  return axios.get("https://www.austinchronicle.com/calendar/arts/").then(function(res) {
    var $ = cheerio.load(res.data);
    // Make an empty array to save our article info
    var articles = [];

    // Now, find and loop through each element that has the "list-item" class
    // (i.e, the section holding the articles)
    $(".list-item").each(function(i, element) {
    	console.log(element.children[1].attribs);
      // In each .list-item, we grab the child with the class story-heading

      // Then we grab the inner text of the this element and store it
      // to the head variable. This is the article headline
      var head = $(this)
        .children(".event-text")
        .children("h2")
        .children("a")
        .text()
        .trim();


      // Grab the URL of the article
      var url = $(this)
        .children(".event-text")
        .children("h2")
        .children("a")
        .attr("href");


      // Then we grab any children with the class of summary and then grab it's inner text
      // We store this to the sum variable. This is the article summary
      var sum = $(this)
        .children(".event-text")
        .children(".description")
        .text()
        .trim();


  	  var date =  $(this)
  	  	.children(".event-text")
  	  	.children(".date-time")
  	  	.text()
 		.trim();


  	  var venue =  $(this)
  	  	.children(".event-text")
  	  	.children(".venue")
  	  	.children("a")
  	  	.text()
  	  	.trim();

      console.log(head + "/n" + sum + "/n" + url + "/n" + date + "/n" + venue);
      // So long as our headline and sum and url aren't empty or undefined, do the following
      if (head && sum && url && date && venue) {
        // This section uses regular expressions and the trim function to tidy our headlines and summaries
        // We're removing extra lines, extra spacing, extra tabs, etc.. to increase to typographical cleanliness.
        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var venueNeat = venue.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var dateNeat = date.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        // Initialize an object we will push to the articles array

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: url,
          venue: venueNeat,
          date: dateNeat
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};

// Export the function, so other files in our backend can use it
module.exports = scrape;
