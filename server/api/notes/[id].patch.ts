import z from 'zod'

export default defineEventHandler(async (event) => {
  const { update: updateNote } = useNoteService()

  const { id } = getRouterParams(event)

  const patchBodySchema = z.object({
    note: z.string().optional(),
    category: z.string().optional(),
  })

  const { note, category } = await readValidatedBody(
    event,
    patchBodySchema.parse
  )

  return {
    success: true,
    status: 200,
    data: updateNote(id, category, note),
  }
})
