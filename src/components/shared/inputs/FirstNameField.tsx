import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"

const LookingForField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="firstName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>First name</FormLabel>
          <FormControl>
            <Input type="text" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default LookingForField
