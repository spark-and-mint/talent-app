import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"

const XField = ({ member }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="x"
      defaultValue={member.x}
      render={({ field }) => (
        <FormItem>
          <FormLabel>X</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="x.com/yourusername"
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

export default XField
