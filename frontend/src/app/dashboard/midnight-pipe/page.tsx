"use client";

import { PageLayout } from "@/components/layout/page-layout";
import { MidnightPipeView } from "@/components/dashboard/violation-monitoring";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function MidnightPipePage() {
    return (
        <ProtectedRoute>
            <PageLayout>
                <MidnightPipeView />
            </PageLayout>
        </ProtectedRoute>
    );
}
