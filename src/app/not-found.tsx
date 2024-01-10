import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="container flex flex-1 flex-col items-center justify-center gap-8 text-center">
            <Image
                alt="404"
                height={300}
                src="/images/not-found.svg"
                width={300}
            />
            <p className="text-xl sm:text-2xl">
                The page you are looking for does not exist.
            </p>
            <Button asChild size="lg">
                <Link href="/">Return Home</Link>
            </Button>
        </div>
    );
}
