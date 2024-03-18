import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui"
import MultipleSelector from "@/components/ui/multi-select"
import { useFormContext } from "react-hook-form"
import { skills } from "@/lib/constants"
import { IOption } from "@/types"

const skillOptions: IOption[] = skills

const SkillsField = () => {
  const { control } = useFormContext()

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

  return (
    <FormField
      control={control}
      name="skills"
      render={({ field }) => (
        <FormItem>
          <FormLabel>What are your top skills?</FormLabel>
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
              placeholder="Search and select your skills"
              emptyIndicator={
                <p className="w-full text-center leading-10 text-white">
                  No results found.
                </p>
              }
            />
          </FormControl>
          <FormDescription>
            We'll use these to match you with clients and projects that fit you.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SkillsField
