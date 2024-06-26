import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
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
import { SignInValidation } from "@/lib/validation"
import { useSignInAccount } from "@/lib/react-query/queries"
import { useMemberContext } from "@/context/AuthContext"
import { ArrowRight, RotateCw } from "lucide-react"
import { account } from "@/lib/appwrite/config"
import GoogleIcon from "@/svg/GoogleIcon"

const SignInForm = () => {
  const navigate = useNavigate()
  const { checkAuthMember, isLoading: isMemberLoading } = useMemberContext()
  const { mutateAsync: signInAccount, isPending } = useSignInAccount()

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleSignin = async (member: z.infer<typeof SignInValidation>) => {
    const session = await signInAccount(member)

    if (!session) {
      toast.error("Login failed. Please try again.")
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
  }

  const onGoogleSignIn = async () => {
    try {
      account.createOAuth2Session(
        "google",
        "https://members.teamspark.xyz/oauth2callback"
      )
    } catch (error) {
      toast.error("Login failed. Please try again.")
    }
  }

  return (
    <div className="mt-16 sm:mt-3">
      <Form {...form}>
        <h5 className="h5 mb-8 text-center">Log in to TeamSpark</h5>
        <Button
          variant="secondary"
          size="sm"
          className="flex items-center w-full h-10 text-xs font-medium"
          onClick={onGoogleSignIn}
        >
          <GoogleIcon className="w-3 h-3 mr-3 text-white" />
          Continue with Google
        </Button>

        <div className="flex items-center justify-center mt-6 mb-4">
          <div className="w-full border-b border-border"></div>
          <p className="mx-4 text-sm text-muted-foreground">or</p>
          <div className="w-full border-b border-border"></div>
        </div>
        <form onSubmit={form.handleSubmit(handleSignin)} className="space-y-4">
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
                <Link
                  to="/reset"
                  className="block text-xs font-medium text-primary text-right transition-colors hover:text-white "
                >
                  Reset password
                </Link>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button
              type="submit"
              className="mt-2 w-full"
              disabled={isPending || isMemberLoading}
            >
              {isPending || isMemberLoading ? (
                <div className="flex items-center gap-2">
                  <RotateCw className="h-4 w-4 animate-spin" />
                  Loading...
                </div>
              ) : (
                "Log in"
              )}
            </Button>
          </div>
        </form>
      </Form>

      <Link to="/sign-up" className="group">
        <div className="mt-8 py-3 border border-border rounded-md text-white transition-colors group-hover:border-accent">
          <p className="text-sm text-center transition-colors group-hover:text-primary">
            Don&apos;t have an account?
            <span className="font-semibold ml-1">
              Sign up{" "}
              <ArrowRight className="h-4 w-4 inline transition group-hover:translate-x-0.5 group-hover:text-primary" />
            </span>
          </p>
        </div>
      </Link>
    </div>
  )
}

export default SignInForm
