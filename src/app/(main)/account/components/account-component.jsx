import { Separator } from "@radix-ui/react-dropdown-menu";
import { ProfileForm } from "../forms/profile-form";
import LinkedAccountsComponent from "./linked-accounts-component";


export default function AccountComponent() {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Accounts</h3>
          <p className="text-sm text-muted-foreground md:max-w-[600px]">
            You can link as many email accounts as you want to clean up.<br /><br />
            Please note that we only support <b>Gmail</b> accounts at the moment, but we're working on adding support for other mail clients soon.
          </p>
        </div>
        <Separator />
        <LinkedAccountsComponent />
      </div>
    )
  }
  