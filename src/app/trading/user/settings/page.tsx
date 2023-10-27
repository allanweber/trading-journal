import { Separator } from '@/components/ui/separator';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account settings
        </p>
      </div>
      <Separator />
      {/* <AccountForm /> */}
    </div>
  );
}
