import React,{useContext} from "react";
import NoteContext from "../context/notes/NoteContext";

function NoteItem(props) {
  const { note,updateNote } = props;
  const context=useContext(NoteContext);
  const {deleteNote}=context;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex">
          <h5 className="card-title">{note.title}</h5>
          <button className="mx-2 text-xs py-0.1 px-1 cursor-pointer rounded" onClick={()=>{deleteNote(note._id)}}>Delete</button>
          <button className="text-xs py-0.1 px-1 cursor-pointer rounded" onClick={()=>{updateNote(note)}}>Edit</button>       
          </div>
          <p className="card-text">{note.description}</p>
         </div>
      </div>
    </div>
  );
}

export default NoteItem;
