import { Separator } from "@radix-ui/react-dropdown-menu";
import { ProfileForm } from "../forms/profile-form";
import LinkedAccountsComponent from "./linked-accounts-component";
import { ResetPasswordForm } from "../forms/reset-password-form";


export default function SecurityComponent() {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Security</h3>
          <p className="text-sm text-muted-foreground md:min-w-[600px]">
            Manage your account security here, change your <b>Password</b> or <b>Delete</b> your account.
          </p>
        </div>
        <Separator />
        <ResetPasswordForm />
      </div>
    )
  }
  