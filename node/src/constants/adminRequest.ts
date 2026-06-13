import type { AdminRequestStatus } from "../types/adminRequest";

export const ADMIN_REQUEST_STATUS_LABEL: Record<AdminRequestStatus, string> = {
  pending: "承認待ち",
  approved: "承認済み",
  rejected: "差し戻し",
};

export const ADMIN_REQUEST_STATUS_TABS = [
  { value: "pending", label: ADMIN_REQUEST_STATUS_LABEL.pending },
  { value: "approved", label: ADMIN_REQUEST_STATUS_LABEL.approved },
  { value: "rejected", label: ADMIN_REQUEST_STATUS_LABEL.rejected },
] as const;
