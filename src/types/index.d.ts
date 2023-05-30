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
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

type RawNote = {
  id: string
}

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}