"use client"

import { Input } from "../ui/input"
import { DocItemType } from "@/schemas/doc"
import { useEffect, useState } from "react"
import { updateFileAction } from "@/action/update-file"
import { NodeApi } from "react-arborist"

type Props = {
  node: NodeApi<DocItemType>
}

export const FileInput = ({ node }: Props) => {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setInputValue(node.data.name)
  }, [node.data.name])

  const handleBlur = async () => {
    if (inputValue !== node.data.name) {
      await updateFileAction({
        id: node.data.id,
        name: inputValue,
        parentId: node.data.parentId
      })
      node.submit(inputValue)
    } else {
      node.submit(inputValue)
    }
  }

  return (
    <Input
      defaultValue={node.data.name}
      autoFocus
      onChange={e => setInputValue(e.target.value)}
      className="text-sm h-8 rounded-sm"
      onBlur={handleBlur}
    />
  )
}
