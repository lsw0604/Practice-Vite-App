import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./pages/NewNote";
import NoteList from "./Components/NoteList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useMemo } from "react";
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

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag]);
  }

  function updateTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string) {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id);
    })
  }

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