import AppHeader from "./app-header";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeader />
            {children}
        </>
    );
}