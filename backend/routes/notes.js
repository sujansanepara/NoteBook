const express = require('express');
const router = express.Router();
const fetchuser=require('../middleware/fetchuser');
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route1:Get All the Notes using get "api/notes/fetchallnotes".login require
router.get('/fetchallnotes',fetchuser, async(req, res) => {
  try{
    const notes=await Note.find({user:req.user.id});
    res.json(notes)
  }
  catch(error){
    console.log(error.message);
    res.status(500).send("Some Error in Get All Note");
  }
});

//Route2:Add a New Notes using post "api/notes/addnote".login require
router.post('/addnote',fetchuser,[
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 5 }),
], async(req, res) => {
   try{
    const{title,description,tag}=req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note=new Note({
      title,description,tag,user:req.user.id
    })
    const savedNote=await note.save()
  res.json(savedNote)
   }
   catch(error){
    console.log(error.message);
    res.status(500).send("Some Error in Add Note");
   }

});

//Route3:Update Notes using put "api/notes/updatenote".login require
router.put('/updatenote/:id',fetchuser, async(req, res) => {
  try{
    const{title,description,tag}=req.body;

    //create a new object
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};

    //Find the Note to be Updated And Update It
    let note=await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not Found")};
    
    if(note.user.toString()!==req.user.id){
      return res.status(401).send("Not Allowed")
    }

    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json({note});

  }
  catch(error){
    console.log(error.message);
    res.status(500).send("Some Error in Update");
  }
});


//Route4:Delete Notes using Delete "api/notes/deletenote".login require
router.delete('/deletenote/:id',fetchuser, async(req, res) => {
  try{
    //Find the Note to be delete And Delete It
    let note=await Note.findById(req.params.id);
    if(!note){res.status(404).send("Not Found")};
    
    //Allow Deletion only if user owns this note
    if(note.user.toString()!==req.user.id){
      return res.status(401).send("Not Allowed")
    }

    note=await Note.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been deleted", note:note});

  }
  catch(error){
    console.log(error.message);
    res.status(500).send("Some Error in Delete");
  }
});
module.exports = router;
