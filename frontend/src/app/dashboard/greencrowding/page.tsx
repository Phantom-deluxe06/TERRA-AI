"use client";

import { PageLayout } from "@/components/layout/page-layout";
import { GreencrowdingView } from "@/components/dashboard/violation-monitoring";
import { ProtectedRoute } from "@/components/auth/protected-route";

export default function GreencrowdingPage() {
    return (
        <ProtectedRoute>
            <PageLayout>
                <GreencrowdingView />
            </PageLayout>
        </ProtectedRoute>
    );
}
