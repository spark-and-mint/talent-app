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
  RolesField,
  LookingForField,
  GitHubField,
  XField,
  FarcasterField,
  DribbbleField,
  BehanceField,
} from "@/components/shared/inputs"
import FadeIn from "react-fade-in/lib/FadeIn"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"

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
      timezone: member.timezone,
      lookingFor: member.profile.lookingFor,
      availability: member.profile.availability,
      rate: member.profile.rate,
      website: member.profile.website,
      linkedin: member.profile.linkedin,
      github: member.profile.github,
      x: member.profile.x,
      farcaster: member.profile.farcaster,
      dribbble: member.profile.dribbble,
      behance: member.profile.behance,
    },
  })

  const handleUpdate = async (values: z.infer<typeof ProfileValidation>) => {
    const updatedMember = await updateMember({
      memberId: member.id,
      email: member.email,
      firstName: member.firstName,
      lastName: member.lastName,
      avatarUrl: member.avatarUrl,
      avatarId: member.avatarId,
      file: [],
      importedAnswers: member.importedAnswers || importedAnswers,
      timezone: values.timezone,
      profile: {
        workStatus: values.workStatus,
        seniority: values.seniority,
        roles: values.roles?.map((role) => role.value),
        skills: values.skills?.map((skill) => skill.value),
        domains: values.domains?.map((domain) => domain.value),
        lookingFor: values.lookingFor,
        availability: values.availability,
        rate: values.rate,
        website: values.website || "",
        linkedin: values.linkedin || "",
        github: values.github || "",
        x: values.x || "",
        farcaster: values.farcaster || "",
        dribbble: values.dribbble || "",
        behance: values.behance || "",
      },
    })

    if (!updatedMember) {
      toast.error("Failed to update profile. Please try again.")
    } else {
      toast.success("Profile updated successfully!")
    }

    setMember({
      ...member,
      importedAnswers: updatedMember?.importedAnswers,
      timezone: updatedMember?.timezone,
      profile: {
        workStatus: updatedMember?.profile.workStatus,
        seniority: updatedMember?.profile.seniority,
        roles: updatedMember?.profile.roles,
        skills: updatedMember?.profile.skills,
        domains: updatedMember?.profile.domains,
        lookingFor: updatedMember?.profile.lookingFor,
        availability: updatedMember?.profile.availability,
        rate: updatedMember?.profile.rate,
        website: updatedMember?.profile.website,
        linkedin: updatedMember?.profile.linkedin,
        github: updatedMember?.profile.github,
        x: updatedMember?.profile.x,
        farcaster: updatedMember?.profile.farcaster,
        dribbble: updatedMember?.profile.dribbble,
        behance: updatedMember?.profile.behance,
      },
    })
  }

  const { setValue } = form

  if (isLoading) {
    return <FormLoader />
  }

  const mapRefToFieldName = (ref: string) => {
    switch (ref) {
      case "36063908-04b1-41c3-af3b-f15bf3a64466":
        return "workStatus"
      case "6bca3a14-27ca-46a4-a6fd-e10c02f587fd":
        return "seniority"
      case "c7e32d35-35da-4e37-be98-78f770170f52":
        return "roles"
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

    setLoadingImport(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setLoadingImport(false)

    if (!answers) {
      toast.error("Could not import profile. Please try again.")
      return
    }

    setImportedAnswers(true)
    toast.success("Parts of your profile imported successfully!")

    answers.forEach(
      (answer: {
        field: { ref: string }
        type: string
        text?: string
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
          if (Array.isArray(value) && value !== undefined) {
            setValue(
              fieldName,
              value.map((v) => ({ value: v.trim(), label: v.trim() }))
            )
          } else if (value !== undefined) {
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
        ) : null}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)}>
            <FadeIn className="space-y-8 lg:space-y-14">
              <div className="mb-12">
                <h3 className="text-lg font-medium mb-2">
                  Professional details
                </h3>
                <p className="text-sm text-muted-foreground">
                  Please tell us more about your professional background and
                  skills.
                </p>
              </div>

              <WorkStatusField member={member} />
              <SeniorityField member={member} />
              <RolesField />
              <SkillsField />
              <DomainsField />
              <TimezoneField member={member} />

              <Separator />

              <div className="mb-12">
                <h3 className="text-lg font-medium mb-2">Work preferences</h3>
                <p className="text-sm text-muted-foreground">
                  Help us understand your availability and what type of roles
                  you're seeking.
                </p>
              </div>

              <LookingForField member={member} />
              <AvailabilityField member={member} />
              <RateField member={member} />

              <Separator />

              <div className="mb-12">
                <h3 className="text-lg font-medium mb-2">Online presence</h3>
                <p className="text-sm text-muted-foreground">
                  Sharing a portfolio, personal website, or online profiles
                  helps potential clients get to know you better, providing
                  credibility to your skills and experiences.
                </p>
              </div>

              <WebsiteField member={member} />

              <div className="grid gap-8 lg:grid-cols-2 lg:gap-y-14 lg:gap-x-12">
                <LinkedInField member={member} />
                <GitHubField member={member} />
                <XField member={member} />
                <FarcasterField member={member} />
                <DribbbleField member={member} />
                <BehanceField member={member} />
              </div>

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
