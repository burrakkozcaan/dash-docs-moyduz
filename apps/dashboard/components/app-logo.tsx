import AppLogoIcon from "@/components/app-logo-icon"

export default function AppLogo() {
  return (
    <>
      <AppLogoIcon size={20} />
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-tight font-semibold">moy</span>
      </div>
    </>
  )
}
