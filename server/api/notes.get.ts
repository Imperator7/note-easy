export default defineEventHandler((event) => {
  const { getAll: getNotes } = useNoteService()

  return { success: true, status: 200, data: getNotes() }
})
