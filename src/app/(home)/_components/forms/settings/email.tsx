"use client";

import { MailIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function ChangeEmail() {
    return (
        <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex w-40 shrink-0 flex-col gap-4 whitespace-nowrap sm:mt-4 sm:items-center">
                <MailIcon className="max-sm:hidden" size={32} />
                <span className="text-xl">Email address</span>
            </div>
            <Card className="col-span-3 w-full">
                <Card.Header>
                    <Card.Title className="text-lg">
                        Change your email address
                    </Card.Title>
                </Card.Header>
                <Card.Content>
                    <Input
                        className="md:max-w-sm"
                        placeholder="example@email.com"
                    />
                </Card.Content>
                <Card.Footer>
                    <Button>Submit</Button>
                </Card.Footer>
            </Card>
        </div>
    );
}
