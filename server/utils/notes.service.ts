let notes: Note[] = []

export const useNoteService = () => {
  return {
    getAll: (): Note[] => notes,
    create: (note: string, category: string, author: string): Note => {
      const newNote = {
        id: crypto.randomUUID(),
        author: author,
        note: note,
        history: [],
        createdAt: Date.now(),
        category: category,
      }

      notes.push(newNote)

      return newNote
    },
    update: (id: string, category?: string, note?: string): Note => {
      if (!category && !note) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Bad Request',
        })
      }

      const targetNoteIndex = notes.findIndex((note) => note.id === id)

      if (targetNoteIndex === -1) {
        throw createError({ statusCode: 404, statusMessage: 'Not found' })
      }

      const lastHistory = {
        note: notes[targetNoteIndex].note,
        category: notes[targetNoteIndex].category,
        createdAt: notes[targetNoteIndex].createdAt,
      }

      const editedNote: Note = {
        ...notes[targetNoteIndex],
        history: [...notes[targetNoteIndex].history, lastHistory],
        note: note ?? notes[targetNoteIndex].note,
        category: category ?? notes[targetNoteIndex].category,
        createdAt: Date.now(),
      }

      notes[targetNoteIndex] = editedNote

      return editedNote
    },
    remove: (id: string) => {
      notes = notes.filter((note) => note.id !== id)
    },
  }
}
