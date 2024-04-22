import { Static, t } from "elysia"
import { IdTokenPayload, auth } from "../lib/authPlugin"
import { database } from "../database/setup"
import { profiles } from "../database/schema"
import { eq } from "drizzle-orm"

const SessionSchema = t.Object({
  id: t.String(),
  name: t.Optional(t.String()),
  email: t.Optional(t.String()),
})

type Session = Static<typeof SessionSchema>

const login = async (payload: IdTokenPayload): Promise<Session | null> => {
  
  const result = await database.select().from(profiles).where(eq(profiles.googleId, payload.sub))
  if (!result.length) {
    await database
      .insert(profiles)
      .values({ googleId: payload.sub, username: payload.name || "" })
      .returning()
  }

  return {
    id: payload.sub,
    name: payload.name,
    email: payload.email
  }
}

export const authPlugin = auth(SessionSchema, login)
