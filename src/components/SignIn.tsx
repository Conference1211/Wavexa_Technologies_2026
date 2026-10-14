import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { auth, db } from "@/firebase";


export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setResetMessage("");
    setLoading(true);

    try {
      await setPersistence(
        auth,
        keepSignedIn
          ? browserLocalPersistence
          : browserSessionPersistence
      );

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      const user = userCredential.user;
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          fullName: user.displayName || "",
          email: user.email,
          createdAt: serverTimestamp(),
        });
      }

      navigate("/");
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };

      console.error("Sign-in / Firestore error:", err);

      switch (firebaseError.code) {
        case "auth/invalid-credential":
        case "auth/wrong-password":
        case "auth/user-not-found":
          setError("Incorrect email or password. Please try again.");
          break;

        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/too-many-requests":
          setError("Too many attempts. Please try again later.");
          break;

        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection.");
          break;

        case "permission-denied":
        case "firestore/permission-denied":
          setError(
            "Sign-in may have succeeded, but Firestore access was denied. Please check Firestore Rules."
          );
          break;

        default:
          setError("Unable to complete sign-in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setError("");
    setResetMessage("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError("Please enter your email address first.");
      return;
    }

    if (
      !/^[a-z0-9]+(?:[._+-][a-z0-9]+)*@[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z]{2,})+$/.test(
        trimmedEmail
      )
    ) {
      setError("Please enter a valid lowercase email address.");
      return;
    }

    setResetLoading(true);

    try {
      await sendPasswordResetEmail(auth, trimmedEmail);
      setResetMessage(
        "If an account exists for this email, a password reset link will be sent."
      );
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };

      console.error("Password reset error:", err);

      switch (firebaseError.code) {
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;

        case "auth/too-many-requests":
          setError("Too many requests. Please try again later.");
          break;

        case "auth/network-request-failed":
          setError("Network error. Please check your internet connection.");
          break;

        default:
          setError("Unable to send the reset email. Please try again later.");
      }
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-brand">
        <h1>
          WAVE<span>XA</span>
        </h1>
        <p>TECHNOLOGIES</p>
      </div>

      <section className="auth-card">
        <div className="auth-heading">
          <h2>Welcome Back</h2>
          <p>
            Sign in to your account to continue
            <br />
            your journey with Wavexa Technologies.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSignIn}>
          <div className="auth-field">
            <label htmlFor="signin-email">Email Address</label>
            <div className="auth-input-wrap">
              <Mail aria-hidden="true" />
              <input
                id="signin-email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setError("");
                  setResetMessage("");
                }}
                autoComplete="email"
                required
              />
            </div>
          </div>

          <div className="auth-field">
            <label htmlFor="signin-password">Password</label>
            <div className="auth-input-wrap">
              <LockKeyhole aria-hidden="true" />
              <input
                id="signin-password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>

          <div className="signin-options">
            <label className="auth-checkbox">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(event) => setKeepSignedIn(event.target.checked)}
              />
              <span>Keep me signed in</span>
            </label>

            <button
              type="button"
              className="forgot-password"
              onClick={handleResetPassword}
              disabled={resetLoading}
            >
              {resetLoading ? "Sending..." : "Forgot password?"}
            </button>
          </div>

          {error && (
            <p className="auth-message auth-error" role="alert">
              {error}
            </p>
          )}

          {resetMessage && (
            <p className="auth-message auth-success" role="status">
              {resetMessage}
            </p>
          )}

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
            {!loading && <ArrowRight aria-hidden="true" />}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </section>

      <footer className="auth-copyright">
        © {new Date().getFullYear()} Wavexa Technologies. All rights reserved.
      </footer>
    </main>
  );
}