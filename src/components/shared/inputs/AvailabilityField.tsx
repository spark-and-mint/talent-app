import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui"
import { useFormContext } from "react-hook-form"

const AvailabilityField = ({ member }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="availability"
      render={({ field }) => (
        <FormItem>
          <FormLabel>How many hours per week are you available?</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={member.availability ?? undefined}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select your availability" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="10">10 hrs/week</SelectItem>
              <SelectItem value="20">20 hrs/week</SelectItem>
              <SelectItem value="30">30 hrs/week</SelectItem>
              <SelectItem value="40">40 hrs/week</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>
            Indicate your general availability for work each week. Please note
            that the mininum required availability is 10 hours per week.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default AvailabilityField
