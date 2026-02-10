"use client";

import { PageLayout } from "@/components/layout/page-layout";
import { MethaneView } from "@/components/dashboard/violation-monitoring";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function MethanePage() {
    return (
        <ProtectedRoute>
            <PageLayout>
                <MethaneView />
            </PageLayout>
        </ProtectedRoute>
    );
}
