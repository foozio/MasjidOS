import { auth } from '@/auth';
import DashboardShell from '@/components/DashboardShell';

// Main Layout (Server Component)
export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    return (
        <DashboardShell user={session?.user}>
            {children}
        </DashboardShell>
    );
}
