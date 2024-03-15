import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormLabel,
  FormMessage,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
// import { useClient } from "@/context/ClientContext"
// import { useUpdateClient } from "@/lib/react-query/queries"
// import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"
import { Separator } from "@/components/ui/separator"
import {
  MailIcon,
  Milestone,
  PlusIcon,
  // RotateCw,
  SquareArrowOutUpRight,
  Trash2,
} from "lucide-react"
import FadeIn from "react-fade-in"

const talentUpdateSchema = z.object({
  resources: z
    .array(
      z.object({
        title: z.string().min(1, { message: "Can't be empty." }),
        link: z.string().min(1, { message: "Can't be empty." }),
        type: z.enum(["design", "document", "other"]),
      })
    )
    .optional(),
})

type TalentUpdatesValues = z.infer<typeof talentUpdateSchema>

const Work = () => {
  // const client = useClient()
  const form = useForm<TalentUpdatesValues>({
    resolver: zodResolver(talentUpdateSchema),
    defaultValues: {
      // resources: [
      //   ...(client.resources?.map((resource: IResource) => ({
      //     title: resource.title ? resource.title : "",
      //     link: resource.link ? resource.link : "",
      //     type: resource.type ? resource.type : "document",
      //   })) || []),
      // ],
    },
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    name: "resources",
    control: form.control,
  })

  // const { mutateAsync: updateClient, isPending: isLoadingUpdate } =
  //   useUpdateClient()

  // const handleSubmit = async (value: TalentUpdatesValues) => {
  //   const updatedClient = await updateClient({
  //     // id: client.$id,
  //     // name: client.name,
  //     // file: [],
  //     // logoId: client.logoId,
  //     // logoUrl: client.logoUrl,
  //     // resources: value.resources,
  //   })

  //   if (!updatedClient) {
  //     toast.error("Failed to update client. Please try again.")
  //   } else {
  //     toast.success("Client updated successfully!")
  //   }
  // }

  return (
    <FadeIn>
      <div className="">
        <div className="mb-2 text-primary tracking-[0.08em] uppercase text-sm font-semibold">
          You have been assigned to
        </div>
        <h2 className="h2 mb-4">Open Campus</h2>
        <p className="text-muted-foreground">
          Open Campus utilizes a new protocol allowing communities to create,
          own, and promote content they want to see in the world and enables
          educators to earn revenue and gain recognition for their
          contributions.
        </p>
        <div className="flex gap-4">
          <Button variant="outline" size="sm" className="mt-6">
            <Milestone className="h-4 w-4 mr-2" />
            View milestones
          </Button>
          <Button variant="outline" size="sm" className="mt-6">
            <SquareArrowOutUpRight className="h-4 w-4 mr-2" />
            Open website
          </Button>
          <Button variant="outline" size="sm" className="mt-6">
            <MailIcon className="h-4 w-4 mr-2" />
            Contact client
          </Button>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="flex gap-4">
        <Button variant="secondary">Decline</Button>
        <Button>Accept opportunity</Button>
      </div>

      <Separator className="my-8" />

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-medium mb-2">Work updates</h3>
          <p className="text-sm text-muted-foreground">
            Add documents, design assets, and other updates you have for the
            client.
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={() => {}}>
            <div className="space-y-7 divide-y divide-border">
              {fields.length === 0 ? (
                <p className="py-3 text-sm">No updates added yet.</p>
              ) : (
                <>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-end gap-3 pt-5">
                      <FormField
                        control={form.control}
                        name={`resources.${index}.title`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`resources.${index}.link`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Link</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`resources.${index}.type`}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormLabel>Milestone</FormLabel>
                            <FormControl>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Select milestone..." />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="design">
                                    Design asset
                                  </SelectItem>
                                  <SelectItem value="document">
                                    Document
                                  </SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="w-24"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </>
              )}
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              className="mt-8"
              onClick={() => append({ title: "", link: "", type: "document" })}
            >
              <PlusIcon className="mr-2 h-4 w-4" />
              Add update
            </Button>
            <div className="flex justify-end mt-8">
              <Button type="submit">Save updates</Button>
            </div>
          </form>
        </Form>
      </div>
    </FadeIn>
  )
}

export default Work
