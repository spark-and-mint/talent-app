import * as z from "zod"
import { Models } from "appwrite"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  FormDescription,
} from "@/components/ui"
import { UpdateValidation } from "@/lib/validation"
import { toast } from "sonner"
import { useMemberContext } from "@/context/AuthContext"
import { useCreateUpdate, useUpdateUpdate } from "@/lib/react-query/queries"
import { RotateCw } from "lucide-react"
import { Textarea } from "../ui/textarea"

type UpdateFormProps = {
  update?: Models.Document
  action: "Create" | "Update"
  setOpen: (value: boolean) => void
  milestoneId: string
}

const UpdateForm = ({
  update,
  action,
  setOpen,
  milestoneId,
}: UpdateFormProps) => {
  const { member } = useMemberContext()

  const form = useForm<z.infer<typeof UpdateValidation>>({
    resolver: zodResolver(UpdateValidation),
    defaultValues: {
      title: update ? update?.title : "",
      link: update ? update?.link : "",
      type: update ? update?.type : "",
      milestone: update ? update?.milestone : "",
      description: update ? update?.description : "",
    },
  })

  const fileRef = form.register("file")

  const { mutateAsync: createUpdate, isPending: isLoadingCreate } =
    useCreateUpdate()
  const { mutateAsync: updateUpdate, isPending: isLoadingUpdate } =
    useUpdateUpdate()

  const handleSubmit = async (value: z.infer<typeof UpdateValidation>) => {
    // UPDATE
    if (update && action === "Update") {
      const updatedUpdate = await updateUpdate({
        ...value,
        updateId: update.$id,
        title: value.title,
      })

      if (!updatedUpdate) {
        toast.error("An error occured. Please try again.")
      } else {
        toast.success("Update modified successfully.")
        setOpen(false)
      }
    }

    // CREATE
    const newUpdate = await createUpdate({
      ...value,
      memberId: member.id,
      milestoneId,
    })

    if (!newUpdate) {
      toast.error("An error occured. Please try again.")
    } else {
      toast.success("Update created successfully.")
      setOpen(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-2 space-y-8"
      >
        <div className="grid grid-cols-2 gap-16">
          <FormField
            control={form.control}
            name="title"
            defaultValue={update?.title}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Lo-Fi wireframes"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            defaultValue={update?.type}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type of update" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="design">Design asset</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center gap-6">
          <FormField
            control={form.control}
            name="link"
            defaultValue={update?.link}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="https://example.com/lofi-wireframes"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="font-semibold pt-7">or</p>

          <FormField
            control={form.control}
            name="file"
            render={() => (
              <FormItem className="relative w-full">
                <FormLabel>File upload</FormLabel>
                <Input type="file" className="cursor-pointer" {...fileRef} />
                <FormDescription className="absolute -bottom-6 right-0 text-xs text-end">
                  Max file size: 25MB
                </FormDescription>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          defaultValue={update?.description}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  placeholder="Here is a first draft of the lo-fi wireframes. I've included a few variations for the homepage and the product page."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4 items-center justify-end pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoadingCreate || isLoadingUpdate}>
            {isLoadingCreate || isLoadingUpdate ? (
              <div className="flex items-center gap-2">
                <RotateCw className="h-4 w-4 animate-spin" />
                {action === "Create" ? "Creating..." : "Saving..."}
              </div>
            ) : (
              <>{action === "Create" ? "Create update" : "Save update"}</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default UpdateForm
