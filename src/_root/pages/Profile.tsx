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
import StarSvg from "@/svg/StarSvg"
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
import FadeIn from "react-fade-in/lib/FadeIn"
import { useState } from "react"

const ProfilePage = () => {
  const { member, setMember } = useMemberContext()
  const { mutateAsync: updateMember, isPending: isLoadingUpdate } =
    useUpdateMember()
  const { data: typeFormAnswers, isLoading } = useGetTypeFormAnswersByEmail(
    member.email
  )
  const [loadingImport, setLoadingImport] = useState(false)
  const [importedAnswers, setImportedAnswers] = useState(false)

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
    },
  })

  const handleUpdate = async (values: z.infer<typeof ProfileValidation>) => {
    const updatedMember = await updateMember({
      ...values,
      memberId: member.id,
      importedAnswers: member.importedAnswers || importedAnswers,
      avatarUrl: member.avatarUrl,
      avatarId: member.avatarId,
      skills: values.skills?.map((skill) => skill.value),
      domains: values.domains?.map((domain) => domain.value),
      file: [],
    })

    if (!updatedMember) {
      toast.error("Failed to update profile. Please try again.")
    } else {
      toast.success("Profile updated successfully!")
    }

    setMember({
      ...member,
      importedAnswers: updatedMember?.importedAnswers,
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

  const { setValue } = form

  if (isLoading) {
    return <FormLoader />
  }

  const mapRefToFieldName = (ref: string) => {
    switch (ref) {
      case "6bca3a14-27ca-46a4-a6fd-e10c02f587fd":
        return "seniority"
      case "36063908-04b1-41c3-af3b-f15bf3a64466":
        return "workStatus"
      case "0de0d035-ef1b-4922-9751-590d182b3722":
        return "rate"
      case "7f58c40f-3aae-4469-a12a-cc44f97fe943":
        return "domains"
      case "2baba816-411b-4ae4-aa52-1488ccc74e69":
        return "availability"
      case "a3d9811f-ec97-4330-9b9f-b68f6ec6b32d":
        return "website"
      default:
        return ""
    }
  }

  const handleImport = async () => {
    const answers = typeFormAnswers[0]?.answers
    if (!answers) return

    setLoadingImport(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoadingImport(false)
    setImportedAnswers(true)

    toast.success("Profile imported successfully!")

    answers.forEach(
      (answer: {
        field: { ref: string }
        type: string
        text?: string
        email?: string
        choice?: { label: string }
        choices?: { labels: string[]; other?: string }
      }) => {
        const { field, type } = answer
        let value: string | string[] | undefined

        switch (type) {
          case "text":
            value = answer[type]
            break
          case "choice":
            value = answer[type]?.label
            break
          case "choices":
            if (answer[type]?.other) {
              value = ["Other"]
            } else {
              value = answer[type]?.labels
            }
            break
          default:
            value = ""
        }

        const fieldName = mapRefToFieldName(field.ref)

        if (fieldName) {
          if (Array.isArray(value)) {
            console.log(fieldName, value)
            setValue(
              fieldName,
              value.map((v) => ({ value: v.trim(), label: v.trim() }))
            )
          } else {
            setValue(fieldName, value?.trim())
          }
        }
      }
    )
  }

  return (
    <FadeIn className="pb-24">
      <div className="space-y-6">
        {typeFormAnswers && !member.importedAnswers && !importedAnswers ? (
          <Alert className="relative mt-2 mb-14">
            <StarSvg className="w-4 h-4" />
            <AlertTitle className="mb-3 font-semibold">
              We found you in our database!
            </AlertTitle>
            <AlertDescription>
              Click to import some of your previous answers from TypeForm.
            </AlertDescription>
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              <Button disabled={loadingImport} onClick={handleImport}>
                {loadingImport ? (
                  <div className="flex items-center gap-2">
                    <RotateCw className="h-4 w-4 animate-spin" />
                    Importing...
                  </div>
                ) : (
                  "Import profile"
                )}
              </Button>
            </div>
          </Alert>
        ) : (
          <div className="mb-12">
            <h3 className="text-lg font-medium mb-2">My profile</h3>
            <p className="text-sm text-muted-foreground">
              We will use this information to match you with potential clients
            </p>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)}>
            <FadeIn className="space-y-14">
              <WorkStatusField member={member} />
              <SeniorityField member={member} />
              <AvailabilityField member={member} />
              <RateField member={member} />
              <SkillsField />
              <DomainsField />
              <TimezoneField member={member} />
              <WebsiteField member={member} />
              <LinkedInField member={member} />
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
