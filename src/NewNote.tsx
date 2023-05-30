import NoteForm from "./Components/NoteForm";

export function NewNote ({ onSubmit }: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={onSubmit} />
    </>
  )
}