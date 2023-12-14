"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/trpc/react";

export function CreatePost() {
    const router = useRouter();
    const [name, setName] = useState("");

    const createPost = api.post.create.useMutation({
        onSuccess: () => {
            router.refresh();
            setName("");
        },
    });

    return (
        <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
                e.preventDefault();
                createPost.mutate({ name });
            }}
        >
            <Input
                onChange={(e) => {
                    setName(e.target.value);
                }}
                placeholder="Title"
                type="text"
                value={name}
            />
            <Button disabled={createPost.isLoading} type="submit">
                {createPost.isLoading ? "Submitting..." : "Submit"}
            </Button>
        </form>
    );
}
