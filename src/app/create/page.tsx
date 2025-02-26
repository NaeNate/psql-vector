import { postsTable } from "@/drizzle/schema"
import { cohere } from "@/lib/cohere"
import { db } from "@/lib/drizzle"

export default function Create() {
  return (
    <div className="max-w-[50rem] mx-auto mt-20 text-xl">
      <h1 className="text-4xl font-semibold mb-4">Create</h1>

      <form
        action={async (fd) => {
          "use server"

          const { title, body } = Object.fromEntries(fd) as {
            [k: string]: string
          }

          const embed = await cohere.v2.embed({
            texts: [body],
            model: "embed-english-light-v3.0",
            inputType: "search_document",
            embeddingTypes: ["float"],
          })

          await db
            .insert(postsTable)
            .values({ title, body, vector: embed.embeddings.float![0] })
        }}
        className="flex flex-col gap-2"
      >
        <input
          name="title"
          placeholder="Title"
          className="border-2 border-blue-400 rounded p-2"
        />

        <textarea
          name="body"
          placeholder="Body"
          className="border-2 border-blue-400 rounded p-2 resize-none h-80"
        />

        <button className="bg-blue-400 rounded p-2 text-white">Submit</button>
      </form>
    </div>
  )
}
