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
} & Partial<NoteData>

type RawNote = {
  id: string
}

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
}

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
}

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
}

type EditTagsModalProps = {
  show: boolean;
  availableTags: Tag[];
  handleClose: () => void;
  onDeleteTag: (id: string) => void;
  onUpdateTag: (id: string, label: string) => void;
}

type NoteLayoutProps = {
  notes: Note[]
}

type NoteProps = {
  onDelete: (id: string) => void;
}

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTag: Tag[];
}