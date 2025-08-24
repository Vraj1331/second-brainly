import z from 'zod'

export const SignUpValidation = z.object({
   fullName: z.string(),
   username: z.email(),
   password: z.string().min(8).max(20),
})

export const SignInValidation = z.object({
   username: z.email(),
   password: z.string().min(8).max(20),
})

export const ContentValidation = z.object({
   link: z.url(),
   title: z.string(),
   type: z.enum(['image', 'Twitter', 'Youtube', 'Notion']),
   tags: z.string().array(),
})
