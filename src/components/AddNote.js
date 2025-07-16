import React, { useState, useContext } from 'react'
import NoteContext from "../context/notes/NoteContext";

function AddNote() {
    const context = useContext(NoteContext);
    const { addNote } = context;
    const [note, setnotes] = useState({ title: "", description: "", tag: "" })
    
    const handleclick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setnotes({ title: "", description: "", tag: "" })
    }
    const onchange = (e) => {
        setnotes({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className="container my-3">
                <h2>Add a Note</h2>
                <form className="my-3">
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={note.title}
                            aria-describedby="emailHelp"
                            onChange={onchange}
                        />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                            Description
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            name="description"
                            value={note.description}
                            onChange={onchange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">
                            Tag
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="tag"
                            name="tag"
                            value={note.tag}
                            onChange={onchange}
                        />
                    </div>
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" onClick={handleclick} className="btn btn-primary">
                        Add Note
                    </button>
                </form>
            </div>

        </div>
    )
}

export default AddNote
