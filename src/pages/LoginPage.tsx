import LoginForm from "../components/auth/LoginForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
                <h1 className="text-2xl font-bold text-center mb-6 ">
                    Logga in
                </h1>

                <LoginForm />
            </div>
        </div>
    )
}