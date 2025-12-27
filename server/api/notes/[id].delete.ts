export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  const { remove: deleteNote, get: getNote } = useNoteService()

  deleteNote(id)

  const targetNote = getNote(id)

  if (targetNote) {
    return {
      success: false,
      status: 500,
      data: targetNote,
    }
  }

  return {
    success: true,
    status: 204,
  }
})
