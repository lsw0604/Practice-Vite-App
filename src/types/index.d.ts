type Note = {
  id: string
} & NoteData

type RawNote = {
  id: string;
} & RawNoteData

type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
}

type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
}

type Tag = {
  id: string;
  label: string;
}

type NoteFormProps = {
  onSubmit: (data: NoteData) => void
}

type RawNote = {
  id: string
}

type newNoteProps = {
  onSubmit: (data: NoteData) => void;
}