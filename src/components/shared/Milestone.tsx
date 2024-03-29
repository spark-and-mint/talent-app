import { IUpdate } from "@/types"
import {
  CircleSlash,
  ExternalLink,
  MoreHorizontal,
  Pickaxe,
  ThumbsUp,
} from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "../ui"
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../ui/table"
import CreateUpdate from "./CreateUpdate"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Card, CardContent, CardHeader } from "../ui/card"

interface MilestoneProps {
  title: string
  status: string
  updates: IUpdate[]
}

const getMilestoneStatus = (feedback: string) => {
  switch (feedback) {
    case "approved":
      return (
        <span className="flex items-center  px-1.5 py-1 text-green-500 font-medium text-sm bg-green-400/20 border border-green-400/20 rounded-md">
          Approved <ThumbsUp className="w-4 h-4 ml-1.5 pb-0.25" />
        </span>
      )
    case "in-progress":
      return (
        <span className="flex items-center  px-1.5 py-1 text-yellow-500 font-medium text-sm bg-amber-400/20 border border-amber-400/20 rounded-md">
          In progress <Pickaxe className="w-4 h-4 ml-1.5 pb-0.25" />
        </span>
      )
    default:
      return (
        <span className="flex items-center  px-1.5 py-1 text-cyan-500 font-medium text-sm bg-muted border border-cyan-400/20 rounded-md">
          Not started <CircleSlash className="w-4 h-4 ml-1.5 pb-0.25" />
        </span>
      )
  }
}

const Milestone = ({ title, status, updates }: MilestoneProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <h5 className="h5">{title}</h5>
            <div className="ml-4">{getMilestoneStatus(status)}</div>
          </div>

          <div className="flex gap-4">
            <Button
              disabled={status === "approved" || updates.length === 0}
              variant="secondary"
            >
              Request approval
            </Button>
            <CreateUpdate status={status} />
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {updates.length === 0 ? (
          <p className="pt-6 pb-14 text-sm text-center">
            No updates added yet.
          </p>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Link</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {updates.map((update) => (
                  <TableRow key={update.updateId}>
                    <TableCell className="font-medium text-sm">
                      {update.title}
                    </TableCell>
                    <TableCell className="text-sm">{update.type}</TableCell>
                    <TableCell className="text-sm">
                      <Button asChild variant="link" className="p-0">
                        <Link
                          to={update.link ?? "#"}
                          className="flex items-center gap-2"
                        >
                          Open
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                    <TableCell className="max-w-[20rem] text-sm truncate">
                      {update.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end mr-4">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-6 w-6" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit update</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <span className="font-medium text-[#e40808]">
                                Delete
                              </span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </CardContent>
    </Card>
  )
}

export default Milestone
