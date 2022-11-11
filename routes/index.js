var express = require("express");
var router = express.Router();
const antaresApi = require("../service/antaresAPI");
/* GET home page. */
router.get("/", async function (req, res, next) {
  const dataCar = await antaresApi.getLatestData(process.env.deviceNameCar);
  const dataGarage = await antaresApi.getLatestData(
    process.env.deviceNameGarage
  );
  const data = {
    car: dataCar.car === 0 ? "Terisi" : "Kosong",
    garage: dataGarage.garasi,
  };

  res.render("index", { title: "Express", ...data });
});

router.post("/postData", async function (req, res, next) {
  const data = {
    "m2m:cin": {
      con: JSON.stringify(req.body),
    },
  };
  await antaresApi
    .postData(data)
    .then((response) => {
      res.status(200).json(response.data);
    });
});

module.exports = router;
