import { useFormContext } from "react-hook-form"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui"
import MultipleSelector from "@/components/ui/multi-select"
import { domains } from "@/lib/constants"
import { IOption } from "@/types"

const domainOptions: IOption[] = domains

const DomainsField = () => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="domains"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Share more about the domains you've worked in</FormLabel>
          <FormDescription>
            We recommend selecting domains you're fairly comfortable in vs. ones
            your only dabbled in.
          </FormDescription>
          <FormControl>
            <MultipleSelector
              value={field.value}
              onChange={field.onChange}
              defaultOptions={domainOptions}
              hidePlaceholderWhenSelected
              placeholder="Choose as many as you like..."
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default DomainsField
