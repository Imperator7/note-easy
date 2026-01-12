import z from 'zod'

export default defineEventHandler(async (event) => {
  const { create: createNote } = useNoteService()

  const postBodySchema = z.object({
    note: z.string().min(1),
    category: z.string().min(1),
  })

  const { note, category } = await readValidatedBody(
    event,
    postBodySchema.parse
  )

  const session = await getUserSession(event)
  if (!session.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized request, please login and try again',
    })
  }

  return {
    success: true,
    status: 201,
    data: createNote(note, category, session.user.name, session.user.userId),
  }
})
