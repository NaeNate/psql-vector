"use server"

import { postsTable } from "@/drizzle/schema"
import { cohere } from "@/lib/cohere"
import { db } from "@/lib/drizzle"
import { cosineDistance } from "drizzle-orm"

export const getPosts = async (state: any, fd: FormData) => {
  const embed = await cohere.v2.embed({
    texts: [fd.get("query") as string],
    model: "embed-english-light-v3.0",
    inputType: "search_query",
    embeddingTypes: ["float"],
  })

  return await db.query.postsTable.findMany({
    orderBy: cosineDistance(postsTable.vector, embed.embeddings.float![0]),
    limit: 5,
  })
}
