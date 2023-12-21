import { AuthLinks } from "../_components";
import { SignInForm } from "../_components/forms";

export default async function SignInPage() {
    return (
        <div className="flex flex-1 flex-col">
            <AuthLinks current="sign-in" />
            <div className="my-auto">
                <SignInForm />
            </div>
        </div>
    );
}
