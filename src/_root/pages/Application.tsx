import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui"
import { ProfileValidation } from "@/lib/validation"
import { useMemberContext } from "@/context/AuthContext"
import { useUpdateMember } from "@/lib/react-query/queries"
import { RotateCw } from "lucide-react"
import FormLoader from "@/components/shared/FormLoader"
import {
  SeniorityField,
  WorkStatusField,
  RateField,
  TimezoneField,
  SkillsField,
  DomainsField,
  AvailabilityField,
  WebsiteField,
  LinkedInField,
} from "@/components/shared/inputs"
import FadeIn from "react-fade-in"

const ApplicationForm = () => {
  const { member, setMember, isLoading } = useMemberContext()

  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      workStatus: member.workStatus,
      seniority: member.seniority,
      availability: member.availability,
      skills: member.skills?.map((skill: string) => ({
        value: skill,
        label: skill,
      })),
      domains: member.domains?.map((domain: string) => ({
        value: domain,
        label: domain,
      })),
      rate: member.rate,
      timezone: member.timezone,
      website: member.website,
      linkedin: member.linkedin,
      file: [],
    },
  })

  const { mutateAsync: updateMember, isPending: isLoadingUpdate } =
    useUpdateMember()

  const handleUpdate = async (values: z.infer<typeof ProfileValidation>) => {
    const updatedMember = await updateMember({
      ...values,
      memberId: member.id,
      status: "form completed",
      avatarUrl: member.avatarUrl,
      avatarId: member.avatarId,
      skills: values.skills?.map((skill) => skill.value),
      domains: values.domains?.map((domain) => domain.value),
    })

    setMember({
      ...member,
      status: updatedMember?.status,
      workStatus: updatedMember?.workStatus,
      seniority: updatedMember?.seniority,
      availability: updatedMember?.availability,
      skills: updatedMember?.skills,
      domains: updatedMember?.domains,
      rate: updatedMember?.rate,
      timezone: updatedMember?.timezone,
      website: updatedMember?.website,
      linkedin: updatedMember?.linkedin,
    })
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
              <AvailabilityField member={member} />
              <SkillsField />
              <DomainsField />
              <RateField member={member} />
              <TimezoneField member={member} />
              <WebsiteField member={member} />
              <LinkedInField member={member} />
              <div className="flex justify-end">
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
