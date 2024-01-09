import { faker } from "@faker-js/faker";

import { Spinner } from "@/components/ui/spinner";
import { loadingScreenTitles } from "@/lib/const";

export default function Loading() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center py-10 text-primary">
            <Spinner className="text-2xl" />
            <span className="mt-4 max-w-lg text-center text-lg text-muted-foreground">
                {faker.helpers.arrayElement(loadingScreenTitles)}
            </span>
        </div>
    );
}
