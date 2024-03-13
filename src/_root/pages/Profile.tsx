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
import { Button } from "@/components/ui"
import { Loader } from "@/components/shared"
import { ProfileValidation } from "@/lib/validation"
import { useMemberContext } from "@/context/AuthContext"
import { useUpdateMember } from "@/lib/react-query/queries"
import { RotateCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import StarSvg from "@/svg/StarSvg"
import { useEffect } from "react"
import MultipleSelector, { Option } from "@/components/ui/multi-select"
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
import { Checkbox } from "@/components/ui/checkbox"

const OPTIONS: Option[] = skills

const mockSearch = async (value: string): Promise<Option[]> => {
  return new Promise((resolve) => {
    if (!value) {
      resolve(OPTIONS)
    }
    const res = OPTIONS.filter((option) =>
      option.value.toLowerCase().includes(value.toLowerCase())
    )
    resolve(res)
  })
}

const ProfilePage = () => {
  const profileFound = true
  const { member, setMember, isLoading } = useMemberContext()

  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      primaryRole: member.primaryRole,
      seniority: member.seniority,
      workStatus: member.workStatus,
      rate: member.rate,
      timezone: member.timezone,
      skills: member.skills?.map((skill: Option) => ({
        value: skill.value,
        label: skill.label,
      })),
      file: [],
    },
  })
  const { reset } = form

  const { mutateAsync: updateMember, isPending: isLoadingUpdate } =
    useUpdateMember()

  const handleUpdate = async (values: z.infer<typeof ProfileValidation>) => {
    const updatedMember = await updateMember({
      ...values,
      memberId: member.id,
      avatarUrl: member.avatarUrl,
      avatarId: member.avatarId,
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
      primaryRole: updatedMember?.primaryRole,
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
                      defaultOptions={OPTIONS}
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
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      Share more about the domains you've worked in
                    </FormLabel>
                    <FormDescription>
                      We recommend selecting domains you're fairly comfortable
                      in vs. ones your only dabbled in.
                    </FormDescription>
                  </div>
                  {domains.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="domains"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-center space-x-3 space-y-0 pb-1"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                // onCheckedChange={(checked) => {
                                //   return checked
                                //     ? field.onChange([...field.value, item.id])
                                //     : field.onChange(
                                //         field.value?.filter(
                                //           (value) => value !== item.id
                                //         )
                                //       )
                                // }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
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
