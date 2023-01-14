const cron = require("node-cron");
const axios = require("axios");

cron.schedule("*/1 * * * * *", () => {
  axios.post(
    "https://script.google.com/macros/s/AKfycbxpTRsgmIxbR_MMcjUCzans00TGaHLOmIADVl1rZ9RBQbOnIFLbg6RR7O7cwr-wrhI6NA/exec",
    ["from code"]
  );

  console.log("running a task every 10 second");
});
