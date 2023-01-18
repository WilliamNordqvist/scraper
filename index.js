/* eslint-disable no-undef */
const cron = require("node-cron");
const axios = require("axios");
const app = require("express")();
const cheerio = require("cheerio");
const { format } = require("date-fns");

require("dotenv").config();

const port = process.env.PORT || 3000;

const scraper = async () => {
  const response = await axios.get("https://www.klart.se/se/");

  const html = response.data;
  const $ = cheerio.load(html);
  const allCities = $(".place-item div");

  const mappedCities = allCities.map((i, city) => {
    const cityName = $(city).find("h4").text();
    const temp = $(city).find(".temp").text().replace(/°/g, "");

    return {
      name: cityName,
      temp,
    };
  });

  return {
    data: mappedCities.toArray(),
    date: format(new Date(), "yyyy/MM/dd"),
  };
};

app.listen(port, () => {
  console.log("SERVER STARTED");

  cron.schedule( "00 30 15 * * *", async () => {
      console.log("Fetching data");
      const res = await scraper(); 
      axios.post(process.env.URL, res);
    },
    {
      scheduled: true,
      timezone: "Europe/Stockholm",
    }
  );
});
