import NoteForm from "../Components/NoteForm";
import { useNoteLayout } from "./NoteLayout";

export default function EditNote({
  onSubmit,
  onAddTag,
  availableTag
}: EditNoteProps) {
  const note = useNoteLayout();
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
        <NoteForm
          title={note.title}
          markdown={note.markdown}
          tags={note.tags}
          onSubmit={data => onSubmit(note.id, data)}
          onAddTag={onAddTag}
          availableTags={availableTag}
        />
    </>
  )
}