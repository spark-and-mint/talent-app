import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { toast } from "sonner"
import { Button, Input } from "@/components/ui"
import { ProfileValidation } from "@/lib/validation"
import { useMemberContext } from "@/context/AuthContext"
import { useUpdateMember } from "@/lib/react-query/queries"
import { ExternalLinkIcon, RotateCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import StarSvg from "@/svg/StarSvg"
import { useEffect, useState } from "react"
import MultipleSelector from "@/components/ui/multi-select"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { skills, domains } from "@/lib/constants"
import { IOption } from "@/types"
import Calendly from "@/components/shared/Calendly"
import FormLoader from "@/components/shared/FormLoader"

const skillOptions: IOption[] = skills
const domainOptions: IOption[] = domains

const mockSearch = async (value: string): Promise<IOption[]> => {
  return new Promise((resolve) => {
    if (!value) {
      resolve(skillOptions)
    }
    const res = skillOptions.filter((option) =>
      option.value.toLowerCase().includes(value.toLowerCase())
    )
    resolve(res)
  })
}

const ProfilePage = () => {
  const profileFound = true
  const { member, setMember, isLoading } = useMemberContext()
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

  const { mutateAsync: updateMember, isPending: isLoadingUpdate } =
    useUpdateMember()

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

  return (
    <div className="pb-24">
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
          <form
            onSubmit={form.handleSubmit(handleUpdate)}
            className="space-y-14 pt-8"
          >
            <FormField
              control={form.control}
              name="seniority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    What is your current level of seniority?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={member.seniority}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your work level..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Executive">Executive</SelectItem>
                      <SelectItem value="Senior">Senior</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Junior">Junior</SelectItem>
                      <SelectItem value="Student">Student</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the option that best describes your current
                    professional level. This helps us understand your experience
                    and how you might fit into projects.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your current work status?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={member.workStatus}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your work status..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Freelancer/consultant">
                        Freelancer/consultant
                      </SelectItem>
                      <SelectItem value="Part time employee">
                        Part time employee
                      </SelectItem>
                      <SelectItem value="Full time employee">
                        Full time employee
                      </SelectItem>
                      <SelectItem value="Fractional leader">
                        Fractional leader
                      </SelectItem>
                      <SelectItem value="Consultant + employee mix">
                        Consultant + employee mix
                      </SelectItem>
                      <SelectItem value="None of the above">
                        None of the above
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    We understand that work scenario's vary a lot today. Do your
                    best to choose the scenario that best describes your current
                    situation.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What are your top skills?</FormLabel>
                  <FormDescription>
                    We'll use these to match you with clients and projects that
                    fit you.
                  </FormDescription>
                  <FormControl>
                    <MultipleSelector
                      value={field.value}
                      onChange={field.onChange}
                      defaultOptions={skillOptions}
                      onSearch={async (value) => {
                        const res = await mockSearch(value)
                        return res
                      }}
                      hidePlaceholderWhenSelected
                      triggerSearchOnFocus
                      placeholder="Search and select your skills..."
                      emptyIndicator={
                        <p className="w-full text-center leading-10 text-white">
                          No results found.
                        </p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domains"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Share more about the domains you've worked in
                  </FormLabel>
                  <FormDescription>
                    We recommend selecting domains you're fairly comfortable in
                    vs. ones your only dabbled in.
                  </FormDescription>
                  <FormControl>
                    <MultipleSelector
                      value={field.value}
                      onChange={field.onChange}
                      defaultOptions={domainOptions}
                      hidePlaceholderWhenSelected
                      placeholder="Choose as many as you like..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What is your hourly rate in USD?</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={member.rate}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your hourly rate..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="50-75">50-75</SelectItem>
                      <SelectItem value="75-100">75-100</SelectItem>
                      <SelectItem value="100-125">100-125</SelectItem>
                      <SelectItem value="125-150">125-150</SelectItem>
                      <SelectItem value="150+">150+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Which timezone are you mostly working in?
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={member.timezone}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a timezone..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>North America</SelectLabel>
                        <SelectItem value="est">
                          Eastern Standard Time (EST)
                        </SelectItem>
                        <SelectItem value="cst">
                          Central Standard Time (CST)
                        </SelectItem>
                        <SelectItem value="mst">
                          Mountain Standard Time (MST)
                        </SelectItem>
                        <SelectItem value="pst">
                          Pacific Standard Time (PST)
                        </SelectItem>
                        <SelectItem value="akst">
                          Alaska Standard Time (AKST)
                        </SelectItem>
                        <SelectItem value="hst">
                          Hawaii Standard Time (HST)
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Europe & Africa</SelectLabel>
                        <SelectItem value="gmt">
                          Greenwich Mean Time (GMT)
                        </SelectItem>
                        <SelectItem value="cet">
                          Central European Time (CET)
                        </SelectItem>
                        <SelectItem value="eet">
                          Eastern European Time (EET)
                        </SelectItem>
                        <SelectItem value="west">
                          Western European Summer Time (WEST)
                        </SelectItem>
                        <SelectItem value="cat">
                          Central Africa Time (CAT)
                        </SelectItem>
                        <SelectItem value="eat">
                          East Africa Time (EAT)
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Asia</SelectLabel>
                        <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
                        <SelectItem value="ist">
                          India Standard Time (IST)
                        </SelectItem>
                        <SelectItem value="cst_china">
                          China Standard Time (CST)
                        </SelectItem>
                        <SelectItem value="jst">
                          Japan Standard Time (JST)
                        </SelectItem>
                        <SelectItem value="kst">
                          Korea Standard Time (KST)
                        </SelectItem>
                        <SelectItem value="ist_indonesia">
                          Indonesia Central Standard Time (WITA)
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Australia & Pacific</SelectLabel>
                        <SelectItem value="awst">
                          Australian Western Standard Time (AWST)
                        </SelectItem>
                        <SelectItem value="acst">
                          Australian Central Standard Time (ACST)
                        </SelectItem>
                        <SelectItem value="aest">
                          Australian Eastern Standard Time (AEST)
                        </SelectItem>
                        <SelectItem value="nzst">
                          New Zealand Standard Time (NZST)
                        </SelectItem>
                        <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>South America</SelectLabel>
                        <SelectItem value="art">
                          Argentina Time (ART)
                        </SelectItem>
                        <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
                        <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
                        <SelectItem value="clt">
                          Chile Standard Time (CLT)
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="availability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    How many hours per week are you available?
                  </FormLabel>
                  <FormDescription>
                    Indicate your general availability for work each week.
                    Please note that the mininum required availability is 10
                    hours per week.
                  </FormDescription>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={member.availability}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your hourly rate..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="10">10 hrs/week</SelectItem>
                      <SelectItem value="20">20 hrs/week</SelectItem>
                      <SelectItem value="30">30 hrs/week</SelectItem>
                      <SelectItem value="40">40 hrs/week</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="website"
              defaultValue={member.website}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Do you have a portfolio or personal website you can share?
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="https://vitalik.ca"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="linkedin"
              defaultValue={member.linkedin}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Please share your LinkedIn profile address if you have one
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="https://linkedin.com/in/barmstrong/"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="meeting"
              defaultValue={member.meeting}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {meetingBooked
                      ? "Meeting booked!"
                      : "Book a meeting with Jason to discuss your profile"}
                  </FormLabel>
                  <FormControl>
                    <div>
                      <Input
                        type="text"
                        {...field}
                        value={field.value || ""}
                        className="hidden"
                      />
                      {meetingBooked ? (
                        <Button variant="secondary">
                          Link to meeting
                          <ExternalLinkIcon className="h-4 w-4 ml-2" />
                        </Button>
                      ) : (
                        <Calendly setMeetingBooked={setMeetingBooked} />
                      )}
                    </div>
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
                    "Update profile"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ProfilePage
