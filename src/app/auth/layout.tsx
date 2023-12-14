import Link from "next/link";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <section className="flex flex-1 flex-col bg-primary/20">
            <div className="mx-auto flex w-full flex-1 flex-col items-center justify-center px-4 py-8 sm:px-6">
                <Link
                    className="mb-6 flex items-center gap-2 text-2xl font-semibold"
                    href="/"
                >
                    <span>FlipQuiz</span>
                </Link>
                {children}
            </div>
        </section>
    );
}
