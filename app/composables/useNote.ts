export const useNote = () => {
  const fetching = ref<boolean>(false)
  const creating = ref<boolean>(false)

  const notes = useState<Note[]>('notes', () => [])

  const fetchNotes = async () => {
    fetching.value = true
    try {
      const { data } = await $fetch('/api/notes')
      notes.value = data
      console.log('Fetched', notes.value)
    } catch (error) {
      console.error(error)
    } finally {
      fetching.value = false
    }
  }

  const createNote = async (payload: {
    note: string
    author: string
    category: string
  }) => {
    creating.value = true
    try {
      const { data } = await $fetch('/api/notes', {
        method: 'POST',
        body: payload,
      })
      notes.value.unshift(data)
    } catch (error) {
      console.error(error)
    } finally {
      creating.value = false
    }
  }

  const removeNoteById = async (payload: { id: string }) => {
    try {
      await $fetch(`/api/notes/${payload.id}`, {
        method: 'DELETE',
      })

      notes.value = notes.value.filter((note) => note.id !== payload.id)
    } catch (error) {
      console.error(error)
    }
  }

  const editNoteById = async (payload: {
    id: string
    note?: string
    category?: string
  }) => {
    try {
      const { data } = await $fetch(`/api/notes/${payload.id}`, {
        method: 'PATCH',
        body: {
          note: payload.note,
          category: payload.category,
        },
      })

      notes.value = notes.value.map((note) =>
        note.id === data.id ? data : note
      )
    } catch (error) {
      console.error(error)
    }
  }

  return {
    notes,
    fetchNotes,
    fetching,
    createNote,
    creating,
    removeNoteById,
    editNoteById,
  }
}
