import { useState } from "react";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
        ) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // TODO: koppla till backend
            console.log({ email, password });
        } catch (err) {
            setError("Fel e-post eller lösenord");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}

            <div>
                <label className="block text-sm font-medium">
                    E-post
                </label>
                <input 
                    type="email"
                    className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium">
                    Lösenord
                </label>
                <input 
                    type="password"
                    className="w-full mt-1 p-2 border rounded-lg focus:outline-none focus:ring"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
                {isLoading ? "Loggar in..." : "Logga in"}
            </button>

            <p className="text-center text-sm">
                Har du inget konto?{" "}
                <a href="/register" className="text-blue-600 underline">
                    Skapa konto
                </a>
            </p>
        </form>
    );
}