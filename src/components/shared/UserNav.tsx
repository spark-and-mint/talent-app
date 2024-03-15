import { useMemberContext } from "@/context/AuthContext"
import { useSignOutAccount } from "@/lib/react-query/queries"
import { useNavigate } from "react-router-dom"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect } from "react"

export function UserNav() {
  const { member } = useMemberContext()
  const { mutate: signOut, isSuccess } = useSignOutAccount()
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) navigate(0)
  }, [isSuccess, navigate])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 p-0 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={member.avatarUrl} alt="avatar" />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {member.firstName} {member.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {member.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
