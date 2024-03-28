import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"

const BehanceField = ({ member }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="behance"
      defaultValue={member.behance}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Behance</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="behance.net/yourusername"
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

export default BehanceField
