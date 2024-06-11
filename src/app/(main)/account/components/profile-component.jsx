import { Separator } from "@radix-ui/react-dropdown-menu";
import { ProfileForm } from "../forms/profile-form";
import LinkedAccountsComponent from "./linked-accounts-component";


export default function ProfileComponent() {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground md:min-w-[600px]">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator />
        <ProfileForm />
      </div>
    )
  }
  