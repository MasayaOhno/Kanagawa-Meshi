const axios = require('axios');
const cheerio = require('cheerio');

const URL = "https://hitosara.com/ranking/kanagawa/";
let restaurants = [];

axios(URL).then((response) => {
  const htmlParser = response.data;
  const $ = cheerio.load(htmlParser);
  const scriptElements = $('script[type="application/ld+json"]');
  
  scriptElements.each(function(){
    const scriptContent = $(this).html();
    const jsonData = JSON.parse(scriptContent);
    
    if(jsonData["@type"] === "ItemList") {
      const itemList = jsonData["itemListElement"];
      itemList.forEach(item => {
        restaurants.push({
          name: item.name,
          description: item.description
        });
      });
    }
  });
  
  console.log(restaurants);
})
.catch((error) => console.log(error));
