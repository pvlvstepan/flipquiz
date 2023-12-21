import { AuthLinks } from "../_components";
import { SignUpForm } from "../_components/forms";

export default async function SignUpPage() {
    return (
        <div className="flex flex-1 flex-col">
            <AuthLinks current="sign-up" />
            <div className="my-auto">
                <SignUpForm />
            </div>
        </div>
    );
}
