import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"

const LookingForField = ({ member }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="lookingFor"
      defaultValue={member.lookingFor}
      render={({ field }) => (
        <FormItem>
          <FormLabel>What are you looking for?</FormLabel>
          <FormControl>
            <Input type="text" {...field} />
          </FormControl>
          <FormDescription>
            Full-time employment, part-time gigs, freelance opportunities, or
            something else?
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default LookingForField
