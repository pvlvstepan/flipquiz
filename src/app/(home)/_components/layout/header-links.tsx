"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

const ListItem = forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className,
                    )}
                    ref={ref}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {children}
                    </div>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

interface HeaderLinksProps {
    signedIn: boolean;
}

export function HeaderLinks({ signedIn }: HeaderLinksProps) {
    const pathname = usePathname();

    console.log(pathname);

    const areasMeta = api.meta.getAreas.useQuery(undefined, {
        staleTime: Infinity,
    });

    return (
        <div className="ml-8 mr-auto flex h-full gap-8 max-sm:hidden">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link
                            href={signedIn ? "/latest" : "/"}
                            legacyBehavior
                            passHref
                        >
                            <NavigationMenuLink
                                aria-selected={
                                    signedIn
                                        ? pathname === "/latest"
                                        : pathname === "/"
                                }
                                className={navigationMenuTriggerStyle()}
                            >
                                Home
                                <div className="absolute inset-x-0 bottom-0 hidden h-1 rounded-t-full bg-primary/50 group-aria-selected:block" />
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/profile" legacyBehavior passHref>
                            <NavigationMenuLink
                                aria-selected={pathname === "/profile"}
                                className={navigationMenuTriggerStyle()}
                            >
                                My library
                                <div className="absolute inset-x-0 bottom-0 hidden h-1 rounded-t-full bg-primary/50 group-aria-selected:block" />
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger
                            aria-selected={pathname === "/explore"}
                        >
                            Explore
                            <div className="absolute inset-x-0 bottom-0 hidden h-1 rounded-t-full bg-primary/50 group-aria-selected:block" />
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="max-h-96 overflow-y-auto">
                            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                {areasMeta.data?.map((area) => (
                                    <ListItem
                                        href={`/explore?area=${area.id}`}
                                        key={area.id}
                                    >
                                        {area.name}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
