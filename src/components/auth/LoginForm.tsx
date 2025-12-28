import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const API_URL = import.meta.env.VITE_API_URL;


    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
        ) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            // TODO: koppla till backend
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Fel e-post eller lösenord");
            }

            // Spara token via AuthContext
            login(data.token);

            // Redirect till startsidan
            navigate("/");

            toast.success("Du är nu inloggad");
        } catch (err: any) {
            setError(err.message || "Fel e-post eller lösenord");
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
                <Link 
                    to="/register"
                    className="text-blue-600 underline hover:text-blue-800 "
                >
                    Skapa konto
                </Link>
            </p>
        </form>
    );
}