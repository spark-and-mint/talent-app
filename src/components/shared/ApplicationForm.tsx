import * as z from "zod"
import { useForm } from "react-hook-form"
import FadeIn from "react-fade-in"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui"
import { ApplicationValidation } from "@/lib/validation"
import { useMemberContext } from "@/context/AuthContext"
import { useUpdateMember } from "@/lib/react-query/queries"
import { RotateCw } from "lucide-react"
import FormLoader from "@/components/shared/FormLoader"
import {
  SeniorityField,
  WorkStatusField,
  SkillsField,
  RolesField,
  DomainsField,
  WebsiteField,
  LinkedInField,
} from "@/components/shared/inputs"
import { useEffect } from "react"

interface ApplicationFormProps {
  setShowApplicationForm: (value: boolean) => void
}

const ApplicationForm = ({ setShowApplicationForm }: ApplicationFormProps) => {
  const { member, setMember, isLoading } = useMemberContext()

  const form = useForm<z.infer<typeof ApplicationValidation>>({
    resolver: zodResolver(ApplicationValidation),
  })

  const {
    formState: { errors },
  } = form

  const { mutateAsync: updateMember, isPending: isLoadingUpdate } =
    useUpdateMember()

  const handleUpdate = async (
    values: z.infer<typeof ApplicationValidation>
  ) => {
    const updatedMember = await updateMember({
      memberId: member.id,
      profileId: member.profileId,
      email: member.email,
      firstName: member.firstName,
      lastName: member.lastName,
      avatarUrl: member.avatarUrl,
      avatarId: member.avatarId,
      file: [],
      status: "in review",
      profile: {
        workStatus: values.workStatus,
        seniority: values.seniority,
        roles: values.roles?.map((role) => role.value),
        skills: values.skills?.map((skill) => skill.value),
        domains: values.domains?.map((domain) => domain.value),
        website: values.website,
        linkedin: values.linkedin,
      },
    })

    setMember({
      ...member,
      ...updatedMember,
    })

    setShowApplicationForm(false)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (isLoading) {
    return (
      <div className="container">
        <div className="max-w-lg mx-auto">
          <FormLoader />
        </div>
      </div>
    )
  }

  return (
    <FadeIn delay={200} className="container pb-24">
      <div className="space-y-4">
        <div className="flex flex-col items-center justify-center w-full h-full mt-4 sm:mt-0 text-center">
          <h3 className="text-2xl font-semibold sm:h3 mb-4">
            Welcome to Spark + Mint
          </h3>
          <p className="max-w-md sm:mb-6 text-center text-muted-foreground">
            We're very excited to have you join our talent network. Please fill
            out the application form to get started.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)}>
            <FadeIn delay={200} className="max-w-lg mx-auto space-y-14 pt-8">
              <WorkStatusField />
              <SeniorityField />
              <RolesField />
              <SkillsField />
              <DomainsField />
              <WebsiteField />
              <LinkedInField />
              <div className="flex flex-col items-center justify-center">
                <div className="flex gap-6 pt-8">
                  <Button type="submit" disabled={isLoadingUpdate}>
                    {isLoadingUpdate ? (
                      <div className="flex items-center gap-2">
                        <RotateCw className="h-4 w-4 animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      "Submit application"
                    )}
                  </Button>
                </div>
                {Object.keys(errors).length > 0 && (
                  <div className="mt-4 space-y-2 text-center">
                    {Object.keys(errors).map((key) => (
                      <div key={key}>
                        <p className="text-sm font-medium">
                          {errors[key]?.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </FadeIn>
          </form>
        </Form>
      </div>
    </FadeIn>
  )
}

export default ApplicationForm
