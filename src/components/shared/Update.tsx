import { Models } from "appwrite"
import { ExternalLink, MoreHorizontal } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../ui"
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { TableRow, TableCell } from "../ui/table"
import { useConfirm } from "./AlertDialogProvider"
import {
  useDeleteUpdate,
  useGetMemberById,
  useGetUpdateFeedback,
  useUpdateFeedback,
} from "@/lib/react-query/queries"
import { toast } from "sonner"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { Avatar, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useState } from "react"
import UpdateForm from "./UpdateForm"
import { useMemberContext } from "@/context/AuthContext"

const Update = ({ update }: { update: Models.Document }) => {
  const { member } = useMemberContext()
  const { data: creator } = useGetMemberById(update.creatorId)
  const { data: feedback } = useGetUpdateFeedback(update.$id)
  const { mutateAsync: deleteUpdate } = useDeleteUpdate()
  const confirm = useConfirm()
  const [openEdit, setOpenEdit] = useState(false)
  const { mutateAsync: updateFeedback } = useUpdateFeedback()

  const handleDeleteUpdate = async (updateTitle: string, updateId: string) => {
    const declineConfirmed = await confirm({
      title: `Are you sure you want to delete "${updateTitle}"?`,
      cancelButton: "Cancel",
      actionButton: "Delete",
    })

    if (!declineConfirmed) return

    try {
      await deleteUpdate({ updateId })
      toast.success("Update deleted successfully.")
    } catch (error) {
      toast.error("Could not delete update. Please try again.")
      console.error(error)
    }
  }

  const handleViewFeedback = async () => {
    if (
      !feedback ||
      (feedback &&
        feedback.length > 0 &&
        feedback[0].viewedBy.includes(member.id))
    )
      return

    try {
      await updateFeedback({
        feedbackId: feedback[0].$id,
        viewedBy: [...feedback[0].viewedBy, member.id],
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <TableRow key={update.$id}>
      <TableCell>
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="w-9 h-9 mx-auto">
                <AvatarImage src={creator?.avatarUrl} />
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {creator?.firstName} {creator?.lastName}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell className="font-medium text-sm">{update.title}</TableCell>
      <TableCell className="text-sm">
        {update.link || update.fileUrl ? (
          <Button asChild variant="link" className="p-0">
            <Link
              to={update.link ? update.link : update.fileUrl}
              target="_blank"
              className="flex items-center gap-2"
            >
              Open
              <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        ) : (
          "No link"
        )}
      </TableCell>
      <TableCell className="max-w-[16rem] text-sm truncate">
        {update.description ? <>{update.description}</> : "No description"}
      </TableCell>
      <TableCell className="flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="secondary"
              className="relative w-full max-w-[8rem]"
              disabled={feedback && feedback.length === 0}
              onClick={handleViewFeedback}
            >
              {feedback && feedback.length > 0
                ? "View feedback"
                : "No feedback"}
              {feedback &&
                feedback.length > 0 &&
                !feedback[0].viewedBy.includes(member.id) && (
                  <span className="absolute flex h-3 w-3 -top-1.5 -right-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
                  </span>
                )}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{update.title} feedback</DialogTitle>
            </DialogHeader>
            <div className="mt-5 mb-4">
              <blockquote className="relative">
                <p>
                  {feedback && feedback.length > 0 && feedback[0]?.text
                    ? feedback[0]?.text
                    : "No feedback added yet."}
                </p>
              </blockquote>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
      <TableCell>
        <div className="flex justify-end mr-4">
          <Dialog open={openEdit} onOpenChange={setOpenEdit}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DialogTrigger asChild>
                  <DropdownMenuItem>Edit update</DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => handleDeleteUpdate(update.title, update.$id)}
                >
                  <span className="font-medium text-[#e40808]">Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Edit update</DialogTitle>
              </DialogHeader>

              <UpdateForm
                action="update"
                setOpen={setOpenEdit}
                update={update}
              />
            </DialogContent>
          </Dialog>
        </div>
      </TableCell>
    </TableRow>
  )
}

export default Update
