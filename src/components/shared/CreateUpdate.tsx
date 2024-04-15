import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusIcon } from "lucide-react"
import UpdateForm from "./UpdateForm"
import { useState } from "react"
import { Models } from "appwrite"

const CreateUpdate = ({
  milestone,
  disabled,
}: {
  milestone?: Models.Document
  disabled: boolean
}) => {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button type="button" disabled={disabled}>
          <PlusIcon className="mr-2 h-5 w-5" />
          Add update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create a new update</DialogTitle>
        </DialogHeader>

        <UpdateForm action="create" setOpen={setOpen} milestone={milestone} />
      </DialogContent>
    </Dialog>
  )
}

export default CreateUpdate
