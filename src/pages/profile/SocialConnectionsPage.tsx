import { ConnectedAccounts } from "@/components/authz/ConnectedAccounts";

export function SocialConnectionsPage() {
  return (
    <div className="container mx-auto max-w-5xl py-8">
      <h1 className="mb-8 text-2xl font-bold tracking-tight">Social Media Connections</h1>
      
      <div className="mb-8 rounded-md border bg-card p-6">
        <h2 className="mb-4 text-xl font-semibold">Connect Your Social Media Accounts</h2>
        <p className="mb-6 text-card-foreground/80">
          Connect your social media accounts to enhance your presence on our platform.
          This allows you to manage your social media marketing campaigns, track performance,
          and engage with your audience all in one place.
        </p>
        
        <ConnectedAccounts />
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="rounded-md border bg-card p-6">
          <h3 className="mb-3 text-lg font-semibold">Why Connect Social Accounts?</h3>
          <ul className="space-y-2 text-card-foreground/80">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span> 
              <span>Post directly to multiple platforms from our dashboard</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span> 
              <span>Schedule content in advance across all your channels</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span> 
              <span>Track engagement and performance analytics in one place</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span> 
              <span>Respond to comments and messages without switching apps</span>
            </li>
          </ul>
        </div>
        
        <div className="rounded-md border bg-card p-6">
          <h3 className="mb-3 text-lg font-semibold">Connection Security</h3>
          <ul className="space-y-2 text-card-foreground/80">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span> 
              <span>All connections use secure OAuth authentication protocols</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span> 
              <span>We never store your social media passwords</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span> 
              <span>Connection tokens expire automatically for security</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span> 
              <span>You can disconnect at any time</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
