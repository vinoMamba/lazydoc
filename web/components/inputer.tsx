"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { KeyboardEventHandler, useEffect, useState, useTransition } from "react"
import { toast } from "sonner"

type Props = {
  value?: string
}

export const Inputer = ({ value = "" }: Props) => {

  const [isPending, setTransition] = useTransition()
  const [disabled, toggleDisabled] = useState(true)
  const [username, setUsername] = useState('')

  useEffect(() => {
    setUsername(value)
  }, [value])

  const onSave = () => setTransition(async () => {
    if (username === value) {
      toggleDisabled(true)
      return
    }
    try {
      //const { code, message } = await updateProfileAction({ username })
      //if (code === 200) {
      //  toast.success(message)
      //} else {
      //  setUsername(value)
      //  toast.error(message)
      //}
    } finally {
      toggleDisabled(true)
    }
  })

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.code === 'Enter') {
      onSave()
    }
  }

  return (
    <div className=" flex items-center gap-4">
      <Input value={username} disabled={disabled} onChange={e => setUsername(e.target.value)} onKeyDown={onKeyDown} />
      <>
        {!disabled && (<Button size="sm" onClick={onSave} disabled={isPending}>Save</Button>)}
        {disabled && (<Button variant="secondary" size="sm" onClick={() => toggleDisabled(false)}>Edit</Button>)}
      </>
    </div>
  )
}
