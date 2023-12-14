import { Header } from "./components/header";

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <div className="flex flex-1 flex-col bg-secondary">
            <Header />
            <main className="container my-8">{children}</main>
        </div>
    );
}
