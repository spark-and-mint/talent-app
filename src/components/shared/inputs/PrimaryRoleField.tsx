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

const PrimaryRoleField = ({ member }) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name="primaryRole"
      render={({ field }) => (
        <FormItem>
          <FormLabel>What role best describes you?</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={member.primaryRole ?? undefined}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select your primary role" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="Graphic Designer">Graphic Designer</SelectItem>
              <SelectItem value="Content Creator">Content Creator</SelectItem>
              <SelectItem value="Product Designer">Product Designer</SelectItem>
              <SelectItem value="Developer">Developer</SelectItem>
              <SelectItem value="Marketer">Marketer</SelectItem>
              <SelectItem value="Product Manager">Product Manager</SelectItem>
              <SelectItem value="Project Manager">Project Manager</SelectItem>
              <SelectItem value="Operation/Sales">Operation/Sales</SelectItem>
              <SelectItem value="Blockchain Developer">
                Blockchain Developer
              </SelectItem>
              <SelectItem value="NFT Artist">NFT Artist</SelectItem>
              <SelectItem value="DeFi Specialist">DeFi Specialist</SelectItem>
              <SelectItem value="Tokenomics Expert">
                Tokenomics Expert
              </SelectItem>
              <SelectItem value="Crypto Analyst">Crypto Analyst</SelectItem>
              <SelectItem value="DAO Manager">DAO Manager</SelectItem>
              <SelectItem value="Community Manager">
                Community Manager
              </SelectItem>
              <SelectItem value="Machine Learning Engineer">
                Machine Learning Engineer
              </SelectItem>
              <SelectItem value="Growth Hacker">Growth Hacker</SelectItem>
              <SelectItem value="AI Ethics Researcher">
                AI Ethics Researcher
              </SelectItem>
              <SelectItem value="Prompt Engineer">Prompt Engineer</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>
            We know these can be over-simplified, but it helps us understand
            your general focus.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default PrimaryRoleField
