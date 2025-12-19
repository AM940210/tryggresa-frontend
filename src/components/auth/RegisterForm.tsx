import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Lösenorden matchar inte");
      return;
    }

    setIsLoading(true);

    try {
      // TODO: backend register
      const res = await fetch("http://localhost:4000/api/auth/register", {
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
        throw new Error(data.message || "Registrering misslyckades");
      }

      // Kontot skapat - tillbaka till login
      toast.success("Konto skapat! Logga in för att fortsätta");
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Kunde inte skapa konto");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="text-center space-y-2">
          <p className="text-red-500 text-sm">{error}</p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 underline text-sm hover:text-blue-800"
          >
            Gå till logga in
          </button>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium">E-post</label>
        <input
          type="email"
          className="w-full mt-1 p-2 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Lösenord</label>
        <input
          type="password"
          className="w-full mt-1 p-2 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Bekräfta lösenord
        </label>
        <input
          type="password"
          className="w-full mt-1 p-2 border rounded-lg"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50"
      >
        {isLoading ? "Skapar konto..." : "Skapa konto"}
      </button>
    </form>
  );
}
