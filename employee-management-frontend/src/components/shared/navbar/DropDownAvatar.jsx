import {Avatar, AvatarFallback } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const DropDownAvatar = () => {
    return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
            <AvatarFallback>KN</AvatarFallback>
        </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>

    
    )
}

export default DropDownAvatar