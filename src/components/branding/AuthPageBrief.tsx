interface AuthPageBriefProps {}

export function AuthPageBrief({}: AuthPageBriefProps) {
  return (
    <div className=" md:bg-muted flex w-full rounded-lg overflow-y-scroll lg:overflow-y-hidden lg:h-screen lg:py-[4%]">
      <div className="flex w-full max-w-xl flex-col items-center gap-6 rounded-lg p-[4%]">
        <div className="mb-1 flex w-full items-center gap-3">
          <div className="bg-primary flex size-10 items-center justify-center rounded-lg">
            <div className="bg-background size-6 rounded-full" />
          </div>
          <p className="text-2xl font-bold">Flowbiz CRM</p>
        </div>

        <div className="mt-2 hidden w-full items-center gap-4 sm:flex">
          <p className="mb-4 text-[36px] leading-[150%] font-[600]">
            Empower Your Business with Unified, Intelligent Customer
            Relationships.
          </p>
        </div>

        <div className="mt-2 hidden w-full flex-col gap-4 p-2 md:flex">
          <FeatureItem
            icon={<img src="/icons/360.png" className="size-12" />}
            title="360° Customer View"
            description="Consolidate data from sales, marketing, and support into one comprehensive dashboard for deeper insights."
          />

          <FeatureItem
            icon={<img src="/icons/auto.png" className="size-12" />}
            title="Automated Sales Process"
            description="Accelerate lead conversion with AI-driven automation that streamlines your sales pipeline."
          />

          <FeatureItem
            icon={<img src="/icons/loud.png" className="size-12" />}
            title="Personalized Marketing Campaigns"
            description="Tailor your messaging across email, SMS, and digital channels to boost engagement and conversion rates."
          />

          <FeatureItem
            icon={<img src="/icons/support.png" className="size-12" />}
            title="Enhanced Customer Support"
            description="Equip your support teams with full customer histories and automated tools to resolve issues faster."
          />

          <FeatureItem
            icon={<img src="/icons/analytics.png" className="size-12" />}
            title="Actionable Analytics"
            description="Leverage real-time insights and predictive analytics to drive informed, strategic business decisions."
          />
        </div>
      </div>
    </div>
  );
}

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 flex-shrink-0">{icon}</div>
      <div>
        <h3 className="t mb-1 text-lg font-semibold">{title}</h3>
        <span className="text-sm" color="text.secondary">
          {description}
        </span>
      </div>
    </div>
  );
}
