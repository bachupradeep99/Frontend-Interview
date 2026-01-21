import { useState } from "react"
import BlogList from "./components/BlogList"
import BlogDetail from "./components/BlogDetail"
import CreateBlogForm from "./components/CreateBlogForm"

export default function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      <div className="col-span-1 space-y-4">
        <CreateBlogForm />
        <BlogList onSelect={setSelectedId} />
      </div>

      <div className="col-span-2">
        {selectedId && <BlogDetail id={selectedId} />}
      </div>
    </div>
  )
}
