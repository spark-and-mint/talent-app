import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"

const GitHubField = ({ member }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="github"
      defaultValue={member.github}
      render={({ field }) => (
        <FormItem>
          <FormLabel>GitHub</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="github.com/yourusername"
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

export default GitHubField
