import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";

import NewNote from "./pages/NewNote";
import NoteList from "./pages/NoteList";
import Note from "./pages/Note";

import { useLocalStorage } from "./hooks/useLocalStorage";
import { useNote } from "./hooks/useNote";
import { NoteLayout } from "./pages/NoteLayout";
import EditNote from "./pages/EditNote";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const { 
    notesWithTags,
    onCreateNote,
    onDeleteNote,
    onUpdateNote,
    addTag,
    deleteTag,
    updateTag
  } = useNote(notes, setNotes, tags, setTags);

  return (
    <Container className="my-4">
      <Routes>
        <Route 
          path="/" 
          element={
            <NoteList 
              notes={notesWithTags}
              availableTags={tags}
              onDeleteTag={deleteTag}
              onUpdateTag={updateTag}
            />
          }
        />
        <Route 
          path="/new" 
          element={
            <NewNote 
              onSubmit={onCreateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          } 
        />
        <Route path="/:id" element={<NoteLayout notes={notesWithTags} />}>
          <Route 
            index 
            element={
              <Note onDelete={onDeleteNote} />
            }
          />
          <Route 
            path="edit" 
            element={
              <EditNote 
                onSubmit={onUpdateNote}
                onAddTag={addTag}
                availableTag={tags}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App;