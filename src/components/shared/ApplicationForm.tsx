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

interface ApplicationFormProps {
  setShowApplicationForm: (value: boolean) => void
}

const ApplicationForm = ({ setShowApplicationForm }: ApplicationFormProps) => {
  const { member, setMember, isLoading } = useMemberContext()

  const form = useForm<z.infer<typeof ApplicationValidation>>({
    resolver: zodResolver(ApplicationValidation),
    defaultValues: {
      workStatus: member.profile.workStatus,
      seniority: member.profile.seniority,
      roles: member.profile.roles?.map((role: string) => ({
        value: role,
        label: role,
      })),
      skills: member.profile.skills?.map((skill: string) => ({
        value: skill,
        label: skill,
      })),
      domains: member.profile.domains?.map((domain: string) => ({
        value: domain,
        label: domain,
      })),
      website: member.profile.website,
      linkedin: member.profile.linkedin,
    },
  })

  const { mutateAsync: updateMember, isPending: isLoadingUpdate } =
    useUpdateMember()

  const handleUpdate = async (
    values: z.infer<typeof ApplicationValidation>
  ) => {
    const updatedMember = await updateMember({
      memberId: member.id,
      email: member.email,
      firstName: member.firstName,
      lastName: member.lastName,
      avatarUrl: member.avatarUrl,
      avatarId: member.avatarId,
      file: [],
      profile: {
        workStatus: values.workStatus,
        seniority: values.seniority,
        roles: values.roles?.map((role) => role.value),
        skills: values.skills?.map((skill) => skill.value),
        domains: values.domains?.map((domain) => domain.value),
        website: values.website || "",
        linkedin: values.linkedin || "",
      },
    })

    setMember({
      ...member,
      profile: {
        workStatus: updatedMember?.profile.workStatus,
        seniority: updatedMember?.profile.seniority,
        roles: updatedMember?.profile.roles,
        skills: updatedMember?.profile.skills,
        domains: updatedMember?.profile.domains,
        website: updatedMember?.profile.website,
        linkedin: updatedMember?.profile.linkedin,
      },
    })

    setShowApplicationForm(false)
  }

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
        <div className="flex flex-col items-center justify-center w-full h-full">
          <h3 className="h3 mb-4">Welcome to Spark + Mint</h3>
          <p className="max-w-md mb-8 text-center text-muted-foreground">
            We're very excited to have you join our talent network. Please fill
            out the application form to get started.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)}>
            <FadeIn delay={200} className="max-w-lg mx-auto space-y-14 pt-8">
              <WorkStatusField member={member} />
              <SeniorityField member={member} />
              <RolesField />
              <SkillsField />
              <DomainsField />
              <WebsiteField member={member} />
              <LinkedInField member={member} />
              <div className="flex justify-center">
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
              </div>
            </FadeIn>
          </form>
        </Form>
      </div>
    </FadeIn>
  )
}

export default ApplicationForm
