import z from 'zod'

export default defineEventHandler(async (event) => {
  const { create: createNote } = useNoteService()

  const postBodySchema = z.object({
    note: z.string().min(1),
    author: z.string().min(1),
    category: z.string().min(1),
  })

  const { note, author, category } = await readValidatedBody(
    event,
    postBodySchema.parse
  )

  return {
    success: true,
    status: 201,
    data: createNote(note, category, author),
  }
})
