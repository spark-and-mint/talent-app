import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"

const DribbbleField = ({ member }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="dribbble"
      defaultValue={member.dribbble}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Dribbble</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="dribbble.com/yourusername"
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

export default DribbbleField
