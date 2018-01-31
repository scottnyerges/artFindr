var router = require("express").Router();
var fetchRoutes = require("./fetch");
var headlineRoutes = require("./headlines");

router.use("/fetch", fetchRoutes);
router.use("/headlines", headlineRoutes);

module.exports = router;
