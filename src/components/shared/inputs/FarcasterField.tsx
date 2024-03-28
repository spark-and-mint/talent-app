import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"

const FarcasterField = ({ member }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="farcaster"
      defaultValue={member.farcaster}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Farcaster</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="warpcast.com/yourusername"
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

export default FarcasterField
