const cron = require("node-cron");
const axios = require("axios");
const app = require("express")()

// eslint-disable-next-line no-undef
const port = process.env.PORT || 3000




app.listen(port, () => {

  cron.schedule("*/30 * * * * *", () => {
    axios.post(
      "https://script.google.com/macros/s/AKfycbxpTRsgmIxbR_MMcjUCzans00TGaHLOmIADVl1rZ9RBQbOnIFLbg6RR7O7cwr-wrhI6NA/exec",
      ["from code"]
    );
  
    console.log("running a task every 10 second");
  });

})
