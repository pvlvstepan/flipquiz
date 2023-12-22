"use client";

import { Trash2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function DeleteAccount() {
    return (
        <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex w-40 shrink-0 flex-col gap-4 whitespace-nowrap sm:mt-4 sm:items-center">
                <Trash2Icon className="max-sm:hidden" size={32} />
                <span className="text-xl">Delete account</span>
            </div>
            <Card className="col-span-3 w-full">
                <Card.Header>
                    <Card.Title className="text-lg">
                        Permanently delete your account
                    </Card.Title>
                </Card.Header>
                <Card.Content />
                <Card.Footer>
                    <Button variant="destructive">Delete account</Button>
                </Card.Footer>
            </Card>
        </div>
    );
}
