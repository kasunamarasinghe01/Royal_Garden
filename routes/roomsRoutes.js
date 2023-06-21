const express = require("express");
const router = express.Router();

const Room = require('../models/room')

router.get("/getallrooms", async(req, res) => {

  try {
    const rooms = await Room.find({})
    //return res.status(200).json({rooms});
    res.status(200).json({message: 'success', rooms: rooms});
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({message : error});
  }

});


router.post("/getallrooms", async(req, res) => {

  try {
    const rooms = await Room.find({})
    //return res.status(200).json({rooms});
    res.status(200).json({message: 'success', rooms: rooms});
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({message : error});
  }

});

router.get('/getroombyid/:roomid', async (req, res) => {
  const roomid = req.params.roomid;

  

  try {
    const room = await Room.findById(roomid);
    res.status(200).json({message: 'success', room});
  } catch (err) {
    return res.status(400).json({message : error});
  }
})

module.exports = router;