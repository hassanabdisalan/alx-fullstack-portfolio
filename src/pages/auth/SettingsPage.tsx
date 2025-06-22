interface SettingsPageProps {}

export function SettingsPage({}: SettingsPageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Settings</h1>
      <p className="text-gray-500">Manage your settings here.</p>
      {/* Add your settings management UI here */}
    </div>
  );
}
