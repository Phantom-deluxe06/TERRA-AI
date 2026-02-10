"use client";

import { PageLayout } from "@/components/layout/page-layout";
import { WaterStressView } from "@/components/dashboard/violation-monitoring";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function WaterStressPage() {
    return (
        <ProtectedRoute>
            <PageLayout>
                <WaterStressView />
            </PageLayout>
        </ProtectedRoute>
    );
}
