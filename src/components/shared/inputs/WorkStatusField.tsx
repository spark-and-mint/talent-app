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

const WorkStatusField = ({ member }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="workStatus"
      render={({ field }) => (
        <FormItem>
          <FormLabel>What is your current work status?</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={member.workStatus ?? undefined}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select your work status" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Freelancer/consultant">
                Freelancer/consultant
              </SelectItem>
              <SelectItem value="Part time employee">
                Part time employee
              </SelectItem>
              <SelectItem value="Full time employee">
                Full time employee
              </SelectItem>
              <SelectItem value="Fractional leader">
                Fractional leader
              </SelectItem>
              <SelectItem value="Consultant + employee mix">
                Consultant + employee mix
              </SelectItem>
              <SelectItem value="None of the above">
                None of the above
              </SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>
            We understand that work scenario's vary a lot today. Do your best to
            choose the scenario that best describes your current situation.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default WorkStatusField
