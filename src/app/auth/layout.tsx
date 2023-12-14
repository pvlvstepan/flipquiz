import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import authCover from "public/auth-cover.png";

import { getServerAuthSession } from "@/server/auth";

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
    const session = await getServerAuthSession();

    if (session) {
        return redirect("/");
    }

    return (
        <div className="flex h-full flex-col lg:overflow-hidden">
            <div className="flex-1 lg:grid lg:grid-cols-2 lg:overflow-hidden">
                <div className="relative hidden flex-col justify-between bg-muted p-10 lg:flex">
                    <Image
                        alt="woman in blue long sleeve shirt and blue denim jeans sitting on bed using laptop"
                        className="object-cover object-left"
                        fill
                        placeholder="blur"
                        sizes="(max-width: 1023px) 100vw, 1024px"
                        src={authCover}
                    />
                    <h1 className="relative text-4xl text-white">
                        Quiz
                        <br />
                        Smarter,
                        <br />
                        Not
                        <br />
                        Harder
                    </h1>
                    <Link className="relative text-5xl text-white" href="/">
                        FlipQuiz
                    </Link>
                </div>
                <div className="flex flex-col overflow-y-auto p-4 pb-10 sm:p-10">
                    <div className="mx-auto w-full max-w-lg">{children}</div>
                </div>
            </div>
        </div>
    );
}
