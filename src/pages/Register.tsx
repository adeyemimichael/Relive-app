import { useState, useCallback, FormEvent } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/auth";
import { auth } from "../types/firebase";

interface RegisterProps {
  handleRegistered: () => void;
  toggleLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ handleRegistered, toggleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      handleRegistered();
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred";
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "Email is already registered.";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email format.";
            break;
          case "auth/weak-password":
            errorMessage = "Password is too weak. Use at least 6 characters.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many attempts. Please try again later.";
            break;
          default:
            errorMessage = error.message;
        }
      }
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [email, password, confirmPassword, handleRegistered]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-slide-down">
      <div className="w-full max-w-md rounded-lg bg-white dark:bg-slate-800 p-6 shadow-lg border border-slate-200 dark:border-slate-700">
        {error && (
          <p id="error-message" className="mb-4 text-red-500 dark:text-red-400 text-sm">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-slate-700 dark:text-slate-200 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white p-2 focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 outline-none disabled:bg-slate-200 dark:disabled:bg-slate-600"
              required
              disabled={isLoading}
              aria-invalid={!!error}
              aria-describedby={error ? "error-message" : undefined}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-slate-700 dark:text-slate-200 font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white p-2 focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 outline-none disabled:bg-slate-200 dark:disabled:bg-slate-600"
              required
              disabled={isLoading}
              aria-invalid={!!error}
              aria-describedby={error ? "error-message" : undefined}
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-slate-700 dark:text-slate-200 font-medium mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white p-2 focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-600 outline-none disabled:bg-slate-200 dark:disabled:bg-slate-600"
              required
              disabled={isLoading}
              aria-invalid={!!error}
              aria-describedby={error ? "error-message" : undefined}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-amber-500 text-white p-2 hover:bg-amber-600 disabled:bg-amber-300 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-slate-600 dark:text-slate-300">
          Already have an account?{" "}
          <button
            onClick={toggleLogin}
            className="text-amber-600 dark:text-amber-400 hover:underline"
            disabled={isLoading}
            aria-label="Switch to login"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;