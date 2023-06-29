import React from "react"

export default function Button({ text, onClick }) {
  return (
    <div onClick={onClick} className="px-6 py-4 text-4xl border bg-yellow-400 text-slate-700">
      {text}
    </div>
  )
}
