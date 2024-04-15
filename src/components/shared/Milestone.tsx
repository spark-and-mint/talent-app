import { CircleSlash, Pickaxe, RotateCw, ThumbsUp, X } from "lucide-react"
import { Button } from "../ui"
import { TableHeader, TableRow, TableHead, TableBody, Table } from "../ui/table"
import CreateUpdate from "./CreateUpdate"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Models } from "appwrite"
import Update from "./Update"
import {
  useGetMilestoneById,
  useUpdateMilestone,
} from "@/lib/react-query/queries"
import { Skeleton } from "../ui/skeleton"
import { toast } from "sonner"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { useState } from "react"

const Milestone = ({ milestoneId }: { milestoneId: string }) => {
  const { data: milestone, isPending } = useGetMilestoneById(milestoneId)
  const { mutateAsync: updateMilestone } = useUpdateMilestone()
  const [requestLoading, setRequestLoading] = useState(false)
  const [withdrawLoading, setWithdrawLoading] = useState(false)

  const requestApproval = async () => {
    if (!milestone) return

    if (milestone.status === "approval requested") {
      setWithdrawLoading(true)

      await updateMilestone({
        milestoneId: milestone.$id,
        title: milestone.title,
        status: "in progress",
      })

      setWithdrawLoading(false)

      return
    }

    try {
      setRequestLoading(true)
      await updateMilestone({
        milestoneId: milestone.$id,
        title: milestone.title,
        status: "approval requested",
      })
      toast.success("Approval requested.")
      setRequestLoading(false)
    } catch (error) {
      toast.error("Could not request approval. Please try again.")
      console.error(error)
    }
  }

  const getMilestoneStatus = (feedback: string) => {
    switch (feedback) {
      case "approved":
        return (
          <span className="flex items-center  px-1.5 py-1 text-green-500 font-medium text-sm bg-green-400/20 border border-green-400/20 rounded-md">
            Approved <ThumbsUp className="w-4 h-4 ml-1.5 pb-0.25" />
          </span>
        )
      case "in progress":
        return (
          <span className="flex items-center  px-1.5 py-1 text-yellow-500 font-medium text-sm bg-amber-400/20 border border-amber-400/20 rounded-md">
            In progress <Pickaxe className="w-4 h-4 ml-1.5 pb-0.25" />
          </span>
        )
      case "approval requested":
        return (
          <span className="flex items-center pl-2 py-0 text-cyan-400 font-medium text-sm bg-muted border border-cyan-400/30 rounded-md">
            Approval requested
            <Tooltip delayDuration={100}>
              <TooltipTrigger>
                <Button
                  size="icon"
                  variant="link"
                  className="group flex items-center py-4 w-8 h-6 rounded-l-none rounded-r-md hover:bg-cyan-600/20"
                  onClick={requestApproval}
                >
                  <span className="">
                    {withdrawLoading ? (
                      <RotateCw className="h-4 w-4 text-cyan-500 animate-spin" />
                    ) : (
                      <X className="w-4 h-4 text-cyan-500 group-hover:text-white transition-colors" />
                    )}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm">Withdraw request</p>
              </TooltipContent>
            </Tooltip>
          </span>
        )
      case "approval rejected":
        return (
          <span className="flex items-center  px-1.5 py-1 text-red-500 font-medium text-sm bg-red-400/20 border border-red-400/20 rounded-md">
            Approval rejected <CircleSlash className="w-4 h-4 ml-1.5 pb-0.25" />
          </span>
        )
      default:
        return (
          <span className="flex items-center  px-1.5 py-1 text-gray-400 font-medium text-sm bg-muted border border-gray-400/20 rounded-md">
            Not started
          </span>
        )
    }
  }

  return (
    <Card className="p-2">
      {!milestone || isPending ? (
        <Skeleton className="w-full h-[16rem]" />
      ) : (
        <>
          <CardHeader>
            <div className="flex flex-col gap-4 justify-between lg:flex-row lg:items-center mb-4">
              <div className="flex items-center">
                <h5 className="h5">{milestone.title}</h5>
                <div className="flex items-center gap-2 ml-4">
                  {getMilestoneStatus(milestone.status)}
                </div>
              </div>

              <div className="flex gap-4">
                {milestone.status !== "approval requested" && (
                  <Button
                    disabled={
                      requestLoading ||
                      !milestone ||
                      milestone.status === "approved" ||
                      milestone.updates.length === 0
                    }
                    variant="outline"
                    onClick={requestApproval}
                  >
                    {requestLoading ? (
                      <div className="flex items-center gap-2">
                        <RotateCw className="h-4 w-4 animate-spin" />
                        Requesting...
                      </div>
                    ) : (
                      "Request approval"
                    )}
                  </Button>
                )}
                <CreateUpdate
                  milestone={milestone}
                  disabled={
                    milestone.status === "approved" ||
                    milestone.status === "approval requested"
                  }
                />
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {milestone.updates.length === 0 ? (
              <Card className="flex flex-col items-center justify-center h-full pt-14 pb-16">
                <h4 className="h4 text-[1.325rem] mt-3 text-center">
                  No updates added
                </h4>
                <p className="mt-2 text-muted-foreground text-center">
                  When updates are added by the team, they will be listed here.
                </p>
              </Card>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">Creator</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Link</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Feedback</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {milestone.updates.map((update: Models.Document) => (
                      <Update key={update.$id} update={update} />
                    ))}
                  </TableBody>
                </Table>
              </>
            )}
          </CardContent>
        </>
      )}
    </Card>
  )
}

export default Milestone
