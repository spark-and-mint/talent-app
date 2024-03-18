import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { toast } from "sonner"
import { Button } from "@/components/ui"
import { ProfileValidation } from "@/lib/validation"
import { useMemberContext } from "@/context/AuthContext"
import {
  useGetTypeFormAnswersByEmail,
  useUpdateMember,
} from "@/lib/react-query/queries"
import { RotateCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import StarSvg from "@/svg/StarSvg"
import { useEffect, useState } from "react"
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
  MeetingField,
} from "@/components/shared/inputs"
import FadeIn from "react-fade-in/lib/FadeIn"

const ProfilePage = () => {
  const profileFound = true
  const { member, setMember } = useMemberContext()
  const { mutateAsync: updateMember, isPending: isLoadingUpdate } =
    useUpdateMember()
  const { data: typeFormAnswers, isLoading } = useGetTypeFormAnswersByEmail(
    member.email
  )
  const [meetingBooked, setMeetingBooked] = useState<string | null>(null)

  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      primaryRole: member.primaryRole,
      seniority: member.seniority,
      workStatus: member.workStatus,
      rate: member.rate,
      timezone: member.timezone,
      skills: member.skills?.map((skill: string) => ({
        value: skill,
        label: skill,
      })),
      domains: member.domains?.map((domain: string) => ({
        value: domain,
        label: domain,
      })),
      availability: member.availability,
      website: member.website,
      linkedin: member.linkedin,
      meeting: member.meeting,
      file: [],
    },
  })
  const { reset, clearErrors, setValue } = form

  const handleUpdate = async (values: z.infer<typeof ProfileValidation>) => {
    const updatedMember = await updateMember({
      ...values,
      memberId: member.id,
      avatarUrl: member.avatarUrl,
      avatarId: member.avatarId,
      skills: values.skills?.map((skill) => skill.value),
      domains: values.domains?.map((domain) => domain.value),
    })

    if (!updatedMember) {
      toast.error("Failed to update profile. Please try again.")
    } else {
      toast.success("Profile updated successfully!")
    }

    setMember({
      ...member,
      firstName: updatedMember?.firstName,
      lastName: updatedMember?.lastName,
      email: updatedMember?.email,
      seniority: updatedMember?.seniority,
      workStatus: updatedMember?.workStatus,
      rate: updatedMember?.rate,
      timezone: updatedMember?.timezone,
      availability: updatedMember?.availability,
      website: updatedMember?.website,
      linkedin: updatedMember?.linkedin,
      skills: updatedMember?.skills,
      domains: updatedMember?.domains,
      primaryRole: updatedMember?.primaryRole,
      avatarUrl: updatedMember?.avatarUrl,
      avatarId: updatedMember?.avatarId,
    })
  }

  useEffect(() => {
    if (member.id) {
      reset({
        ...member,
        file: [],
        skills: member.skills?.map((skill: string) => ({
          value: skill,
          label: skill,
        })),
        domains: member.domains?.map((domain: string) => ({
          value: domain,
          label: domain,
        })),
      })
    }
  }, [member, reset])

  useEffect(() => {
    if (meetingBooked) {
      setValue("meeting", meetingBooked, { shouldValidate: true })
    }
  }, [meetingBooked, clearErrors, setValue])

  if (isLoading) {
    return <FormLoader />
  }

  console.log(typeFormAnswers)

  return (
    <FadeIn className="pb-24">
      <div className="space-y-6">
        {profileFound ? (
          <Alert className="relative mt-2 mb-6">
            <StarSvg className="w-4 h-4" />
            <AlertTitle className="mb-2 font-semibold">
              We found you in our database!
            </AlertTitle>
            <AlertDescription>
              Click to import your profile and get started
            </AlertDescription>
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Button>Import profile</Button>
            </div>
          </Alert>
        ) : (
          <>
            <div>
              <h3 className="text-lg font-medium mb-2">My profile</h3>
              <p className="text-sm text-muted-foreground">
                Update your profile information
              </p>
            </div>
            <Separator />
          </>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)}>
            <FadeIn className="space-y-14 pt-8">
              <SeniorityField member={member} />
              <WorkStatusField member={member} />
              <SkillsField />
              <RateField member={member} />
              <TimezoneField member={member} />
              <DomainsField />
              <AvailabilityField member={member} />
              <WebsiteField member={member} />
              <LinkedInField member={member} />
              <MeetingField
                member={member}
                meetingBooked={meetingBooked}
                setMeetingBooked={setMeetingBooked}
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
                      "Update profile"
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

export default ProfilePage
