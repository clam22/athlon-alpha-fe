
import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";

interface SiteHeaderProps {
    pageName: string
}

export default function SiteHeader({pageName} : SiteHeaderProps) {
  return (
    <header className="flex justify-between w-full">
        <div className="flex gap-3 pb-4">
            <SidebarTrigger size="lg"/>
            <Separator orientation="vertical"/>
            <h1 className="heading3">{pageName}</h1>
        </div>
    </header>
  )
}
