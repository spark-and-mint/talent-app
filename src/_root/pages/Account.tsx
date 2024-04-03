import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { Input, Button } from "@/components/ui"
import { Loader } from "@/components/shared"
import { AccountValidation } from "@/lib/validation"
import { useMemberContext } from "@/context/AuthContext"
import { useUpdateMember } from "@/lib/react-query/queries"
import { RotateCw } from "lucide-react"
import ImageUploader from "@/components/shared/ImageUploader"
import { useEffect } from "react"
import FadeIn from "react-fade-in"

const AccountPage = () => {
  const { member, setMember, isLoading } = useMemberContext()

  const form = useForm<z.infer<typeof AccountValidation>>({
    resolver: zodResolver(AccountValidation),
    defaultValues: {
      firstName: member.firstName,
      lastName: member.lastName,
      email: member.email,
      file: [],
    },
  })
  const { reset } = form

  const { mutateAsync: updateMember, isPending: isLoadingUpdate } =
    useUpdateMember()

  const handleUpdate = async (values: z.infer<typeof AccountValidation>) => {
    const updatedMember = await updateMember({
      ...values,
      memberId: member.id,
      avatarUrl: member.avatarUrl,
      avatarId: member.avatarId,
    })

    if (!updatedMember) {
      toast.error("Failed to update account. Please try again.")
    } else {
      toast.success("Account updated successfully!")
    }

    setMember({
      ...member,
      firstName: updatedMember?.firstName,
      lastName: updatedMember?.lastName,
      email: updatedMember?.email,
      avatarUrl: updatedMember?.avatarUrl,
    })
  }

  useEffect(() => {
    if (member.id) {
      reset({
        ...member,
        file: [],
      })
    }
  }, [member, reset])

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="pb-12">
      <FadeIn className="space-y-6">
        <div className="mb-12">
          <h3 className="text-lg font-medium mb-2">My account</h3>
          <p className="text-sm text-muted-foreground">
            Update your account settings
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile image</FormLabel>
                  <FormControl>
                    <ImageUploader
                      fieldChange={field.onChange}
                      mediaUrl={member.avatarUrl}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              defaultValue={member.firstName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              defaultValue={member.lastName}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <div className="flex gap-6 pt-8">
                <Button type="submit" disabled={isLoadingUpdate}>
                  {isLoadingUpdate ? (
                    <div className="flex items-center gap-2">
                      <RotateCw className="h-4 w-4 animate-spin" />
                      Updating...
                    </div>
                  ) : (
                    "Update account"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </FadeIn>
    </div>
  )
}

export default AccountPage
