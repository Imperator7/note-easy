export default defineEventHandler((event) => {
  const { id } = getRouterParams(event)

  const { get: getNote } = useNoteService()

  return {
    success: true,
    status: 200,
    data: getNote(id),
  }
})
