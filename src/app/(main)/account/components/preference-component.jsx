import { PreferencesForm } from "../forms/preference-form";



export default function PreferencesComponent() {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Preferences</h3>
          <p className="text-sm text-muted-foreground md:max-w-[600px]">
            Configure your account preferences below. You can choose how often you would like to be notified of rollups and how many newsletters should be contained in a single rollup.<br /><br />
            Your rollups will be delivered to your default email address in the <b>Profile</b> tab.
          </p>
        </div>
        <div className="w-[50%] space-y-4">
            <PreferencesForm />
        </div>
      </div>
    )
  }
  