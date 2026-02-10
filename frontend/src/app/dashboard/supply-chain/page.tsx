"use client";

import { PageLayout } from "@/components/layout/page-layout";
import { SupplyChainView } from "@/components/dashboard/violation-monitoring";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function SupplyChainPage() {
    return (
        <ProtectedRoute>
            <PageLayout>
                <SupplyChainView />
            </PageLayout>
        </ProtectedRoute>
    );
}
