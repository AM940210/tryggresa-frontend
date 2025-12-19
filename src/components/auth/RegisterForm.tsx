import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      console.log({ email, password });

      navigate("/login");
    } catch {
      setError("Kunde inte skapa konto");
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
