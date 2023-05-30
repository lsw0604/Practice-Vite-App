import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import { NewNote } from "./NewNote";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMemo, useEffect } from "react";
import { v4 as uuidV4 } from "uuid";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNote => {
      return [...prevNote, { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }, ]
    })
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>HOME</h1>} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote}/>} />
        <Route path="/:id">
          <Route index element={<h1>SHOW</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App;