import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid";

export function useNote(
  notes: RawNote[], 
  setNote: React.Dispatch<React.SetStateAction<RawNote[]>>,
  tags: Tag[],
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>,
) {
  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { 
        ...note,
        tags: tags.filter(
          tag => note.tagIds.includes(tag.id)
        )
      }
    })
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNote(prevNote => {
      return [
        ...prevNote, 
        {
          ...data, 
          id: uuidV4(), 
          tagIds: tags.map(
            tag => tag.id
          )
        },
      ]
    })
  }

  function onUpdateNote(id: string, { tags, ...data }: NoteData) {
    setNote(prevNote => {
      return prevNote.map(note => {
        if (note.id === id) {
          return { 
            ...note, 
            ...data, 
            tagIds: tags.map(
              tag => tag.id
            )
          };
        } else {
          return note;
        }
      })
    })
  }

  function onDeleteNote(id: string) {
    setNote(prevNote => {
      return prevNote.filter(note => note.id !== id);
    })
  }

  function addTag(tag: Tag) {
    setTags(prevTag => [...prevTag, tag]);
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
    setTags(prevTag => {
      return prevTag.filter(tag => tag.id !== id);
    })
  }
  return {
    notesWithTags,
    onCreateNote,
    onUpdateNote,
    onDeleteNote,
    addTag,
    updateTag,
    deleteTag
  } as const
}