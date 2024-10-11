"use client"

import { z } from "zod"
import { Input } from "../ui/input"
import { DocItemSchema } from "@/schemas/doc"
import { useFileStore } from "@/store/use-file"
import { useEffect, useState } from "react"
import { updateFileAction } from "@/action/update-file"

type Props = {
  file: z.infer<typeof DocItemSchema>
}

export const FileInput = ({ file }: Props) => {
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    setInputValue(file.name)
  }, [file.name])

  const updateCurrentEditFileId = useFileStore(s => s.updateCurrentEditFileId)

  const handleBlur = async () => {
    if (inputValue !== file.name) {
      await updateFileAction({
        id: file.id,
        name: inputValue
      })

      updateCurrentEditFileId('')
    } else {

      updateCurrentEditFileId('')
    }
  }

  return (
    <Input
      defaultValue={file.name}
      autoFocus
      onChange={e => setInputValue(e.target.value)}
      className="text-sm h-8 rounded-sm"
      onBlur={handleBlur}
    />
  )
}
