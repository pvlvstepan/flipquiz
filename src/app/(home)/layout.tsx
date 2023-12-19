import Link from "next/link";

import { Header } from "@/components/layouts/home/header";

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <div className="flex flex-1 flex-col bg-primary/5">
            <Header />
            <div className="flex-1 overflow-x-hidden">
                <div className="flex h-full flex-col">
                    <main className="container flex-1 py-8">{children}</main>
                </div>
            </div>
            <div className="container mt-auto">
                <div className="flex flex-wrap justify-between gap-8 py-8 text-muted-foreground">
                    <span>&copy; {new Date().getFullYear()} FlipQuiz</span>
                    <span>
                        Built with 👽 by{" "}
                        <Link
                            className="hover:text-primary hover:underline"
                            href="https://stepanpavlov.com"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Stepan Pavlov
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}
