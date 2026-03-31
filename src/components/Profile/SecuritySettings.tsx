export default function SecuritySettings() {
  return (
    <div className="space-y-4">
      <div className="p-6 rounded-xl border border-border">
        <h3 className="font-semibold mb-2">Change Password</h3>

        <p className="text-sm text-muted-foreground">
          Update your account password
        </p>
      </div>

      <div className="p-6 rounded-xl border border-border">
        <h3 className="font-semibold mb-2">Two Factor Authentication</h3>
      </div>
    </div>
  );
}
