import { CircleSlash, Pickaxe, ThumbsUp } from "lucide-react"
import { Button } from "../ui"
import { TableHeader, TableRow, TableHead, TableBody, Table } from "../ui/table"
import CreateUpdate from "./CreateUpdate"
import { Card, CardContent, CardHeader } from "../ui/card"
import { Models } from "appwrite"
import Update from "./Update"
import { useGetMilestoneById } from "@/lib/react-query/queries"
import { Skeleton } from "../ui/skeleton"

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

const Milestone = ({ milestoneId }: { milestoneId: string }) => {
  const { data: milestone, isPending } = useGetMilestoneById(milestoneId)

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
                <div className="ml-4">
                  {getMilestoneStatus(milestone.status)}
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  disabled={
                    milestone.status === "approved" ||
                    milestone.updates.length === 0
                  }
                  variant="outline"
                >
                  Request approval
                </Button>
                <CreateUpdate
                  milestoneId={milestone.$id}
                  status={milestone.status}
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
