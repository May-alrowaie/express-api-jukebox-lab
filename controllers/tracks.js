// controllers/tracks.js
const Track = require("../models/track.js")
const express = require("express")
const router = express.Router()

router.post("/", async (req, res) => {
  try {
    const createTrack = await Track.create(req.body)
    res.status(201).json(createdTrack)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get("/", async (req, res) => {
  try {
    const foundTracks = await Track.find()
    res.status(200).json(foundTracks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
router.get("/:trackId", async (req, res) => {
  try {
    const foundTrack = await Track.findById(req.params.trackId)
    if (!foundTrack) {
      res.status(404)
      throw new Error("Track Not Found")
    }
    res.status(200).json(foundTrack)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.json(500).json({ error: error.message })
    }
  }
})

router.put("/:trackId", async (req, res) => {
  try {
    const updatedTrack = await Track.findByIdAndUpdate(
      req.params.trackId,
      req.body,
      {
        new: true,
      }
    )
    if (!updatedTrack) {
      res.status(404)
      throw new Error("Track not found")
    }
    res.status(200).json(updatedTrack)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

router.delete("/:trackId", async (req, res) => {
  try {
    let deletedTrack = await Track.findByIdAndDelete(req.params.trackId)
    if (!deletedTrack) {
      res.status(400)
      throw new Error("Track not found")
    }
    res.status(200).json({
      message: `successfully deleted the Track with id of ${req.params.trackId}`,
    })
  } catch (error) {}
})

module.exports = router
