import { redirect } from "next/navigation";

type Params = Record<string, string | string[] | undefined>;

export default function OnboardingSummaryRedirect({
  searchParams,
}: {
  searchParams: Params;
}) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams || {})) {
    if (value == null) continue;
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
    } else {
      params.append(key, value);
    }
  }

  params.set("flowStep", "summary");
  redirect(`/onboarding/scan?${params.toString()}`);
}
