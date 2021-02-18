import express from "express";
const router = express.Router();

// define a route handler for the default home page
router.post("/", async (req, res) => {});
router.get("/:feedName", async (req, res) => {});

module.exports = router;
