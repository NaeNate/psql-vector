"use client"

import { useActionState } from "react"
import { getPosts } from "./actions"

export default function Form() {
  const [state, action] = useActionState(getPosts, [])

  return (
    <div className="max-w-[50rem] mx-auto mt-20 text-xl">
      <h1 className="text-4xl font-semibold mb-4">Search</h1>

      <form action={action} className="flex flex-col gap-2">
        <input
          name="query"
          placeholder="Query"
          className="border-2 border-blue-400 rounded p-2"
        />

        <button className="bg-blue-400 rounded p-2 text-white">Submit</button>
      </form>

      <div className="space-y-2 mt-2">
        {state.map(({ id, title, body, created }) => {
          return (
            <div className="border-2 border-blue-500 p-2 rounded" key={id}>
              <p>{title}</p>
              <p>{created.toDateString()}</p>

              <p className="mt-2">{body}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}


