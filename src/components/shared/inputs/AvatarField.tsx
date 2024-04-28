import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"
import AvatarUploader from "../AvatarUploader"

const LookingForField = ({ member }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="file"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Profile image</FormLabel>
          <FormControl>
            <AvatarUploader
              fieldChange={field.onChange}
              avatarUrl={member.avatarUrl}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default LookingForField
