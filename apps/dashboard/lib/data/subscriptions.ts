import { MOCK_SITES } from "@/lib/data/sites";
import type { Site } from "@/lib/data/sites";

export interface Subscription {
  id: string;
  customer?: string;
  customerEmail?: string;
  status: string;
  subscriptionDate: string;
  renewalDate: string | null;
  product?: string;
  productDescription?: string;
  stripeSubscriptionId: string | null;
  cancelAtPeriodEnd: boolean;
  trialEnd: string | null;
  trialStart?: string | null;
  canceledAt?: string | null;
  amount: number;
  currency: string;
  interval: string;
  packageName?: string | null;
  businessField?: string[];
  domainName?: string | null;
  hasDomain?: string | null;
  socialMediaAccounts?: string[];
}

const raw = MOCK_SITES.filter(
  (s): s is Site & { orderId: string } => Boolean(s.orderId)
).map((s) => ({
  id: `sub-${s.id}`,
  customer: s.name,
  customerEmail: undefined as string | undefined,
  status: "active",
  subscriptionDate: new Date(s.createdAt).toISOString(),
  renewalDate: s.estimatedDelivery?.toISOString() ?? null,
  product: s.packageName,
  packageName: s.packageName,
  stripeSubscriptionId: s.orderId ? `sub_${s.orderId.slice(-12)}` : null,
  cancelAtPeriodEnd: false,
  trialEnd: null as string | null,
  trialStart: null as string | null,
  canceledAt: null as string | null,
  amount: s.totalPrice ?? 0,
  currency: "TRY",
  interval: "month",
  productDescription: undefined,
  businessField: [] as string[],
  domainName: s.domain ?? null,
  hasDomain: s.domain ? "yes" : null,
  socialMediaAccounts: [] as string[],
}));

export const MOCK_SUBSCRIPTIONS: Subscription[] = raw;

export function getSubscriptionById(id: string): Subscription | undefined {
  return MOCK_SUBSCRIPTIONS.find((s) => s.id === id);
}
