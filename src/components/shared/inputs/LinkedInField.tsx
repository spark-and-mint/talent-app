import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"

const LinkedInField = ({ member }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
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
  )
}

export default LinkedInField
