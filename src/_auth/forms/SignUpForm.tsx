import * as z from "zod"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  useCreateMemberAccount,
  useSignInAccount,
} from "@/lib/react-query/queries"
import { SignUpValidation } from "@/lib/validation"
import { useMemberContext } from "@/context/AuthContext"
import { ArrowRight, RotateCw } from "lucide-react"

const SignUpForm = () => {
  const navigate = useNavigate()
  const { checkAuthMember, isLoading: isMemberLoading } = useMemberContext()

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  })

  const { mutateAsync: createMemberAccount, isPending: isCreatingAccount } =
    useCreateMemberAccount()
  const { mutateAsync: signInAccount, isPending: isSigningInMember } =
    useSignInAccount()

  const handleSignUp = async (member: z.infer<typeof SignUpValidation>) => {
    try {
      const newMember = await createMemberAccount(member)

      if (!newMember) {
        toast.error("Sign up failed. Please try again.")
        return
      }

      const session = await signInAccount({
        email: member.email,
        password: member.password,
      })

      if (!session) {
        toast.error("Something went wrong. Please try again.")
        return
      }

      const isLoggedIn = await checkAuthMember()

      if (isLoggedIn) {
        form.reset()
        navigate("/")
      } else {
        toast.error("Login failed. Please try again.")
        return
      }
    } catch (error) {
      console.log({ error })
    }
  }

  return (
    <div className="mt-8 sm:mt-0 pb-16">
      <Form {...form}>
        <h1 className="h5 mb-8 text-center">Create your account</h1>
        <form onSubmit={form.handleSubmit(handleSignUp)} className="space-y-4">
          <FormField
            control={form.control}
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

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-1">
            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={
                isCreatingAccount || isSigningInMember || isMemberLoading
              }
            >
              {isCreatingAccount || isSigningInMember || isMemberLoading ? (
                <div className="flex items-center gap-2">
                  <RotateCw className="h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : (
                "Sign up"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <Link to="/sign-in" className="group">
        <div className="mt-10 py-3 border border-border rounded-md text-primary transition-colors group-hover:border-accent">
          <p className="text-sm text-center transition-colors group-hover:text-white">
            Already have an account?
            <span className="font-semibold ml-1">
              Log in{" "}
              <ArrowRight className="h-4 w-4 inline transition group-hover:translate-x-0.5 group-hover:text-white" />
            </span>
          </p>
        </div>
      </Link>
    </div>
  )
}

export default SignUpForm
