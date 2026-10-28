import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignIn.css";
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
  Eye,
  EyeOff,
  ShieldCheck,
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

      navigate("/admin", { replace: true });
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
  <main className="signin-page">
    <section className="signin-left">
      <div className="signin-intro">
        <p className="signin-tagline">
          A step towards transforming and innovating every industry.
        </p>
        <div className="signin-rule" />

        <h1>
          Welcome back to the
          <br />
          <span>Wavexa</span> admin portal.
        </h1>

       
<p className="signin-description">
  Manage your conferences, registrations, abstracts &amp; attendees
  – all in one secure place.
</p>

      </div>

      <form className="signin-form" onSubmit={handleSignIn}>
        <label className="signin-input">
          <input
            type="email"
            placeholder="Admin E-mail Address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setError("");
              setResetMessage("");
            }}
            autoComplete="username"
            required
          />
          <Mail size={23} />
        </label>

        <label className="signin-input">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
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
            className="signin-eye"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>
        </label>

        <div className="signin-options">
          <label className="signin-remember">
            <input
              type="checkbox"
              checked={keepSignedIn}
              onChange={(event) => setKeepSignedIn(event.target.checked)}
            />
            <span>Keep me signed in</span>
          </label>

          <button
            type="button"
            className="signin-forgot"
            onClick={handleResetPassword}
            disabled={resetLoading}
          >
            {resetLoading ? "Sending..." : "Forgot password?"}
          </button>
        </div>

        {error && (
          <p className="signin-error" role="alert">
            {error}
          </p>
        )}

        {resetMessage && (
          <p className="signin-success" role="status">
            {resetMessage}
          </p>
        )}

        <button
          className="signin-submit"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Login to Dashboard"}
          {!loading && <ArrowRight size={21} />}
        </button>

        <div className="signin-divider">
          <span />
          <p>or</p>
          <span />
        </div>

        <p className="signin-signup">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>

      <footer className="signin-copyright">
        © {new Date().getFullYear()} Wavexa Technologies.
        All rights reserved.
      </footer>
    </section>

    <section className="signin-right">
      <div className="signin-orbit signin-orbit-one" />
      <div className="signin-orbit signin-orbit-two" />

      <div className="signin-glow">
        <ShieldCheck size={86} strokeWidth={1.2} />
      </div>

      <div className="signin-marketing">
        <p className="signin-brand-label">WAVEXA TECHNOLOGIES</p>

        <h2>
          Helping healthcare
          <br />
          organizations run 
          <br />
           smarter with advanced IT.
        </h2>

        <p className="signin-marketing-description">
          One command centre for your solutions, clients and teams –
          built for speed, security and scale.
        </p>

        <div className="signin-features">
          <div className="signin-feature">
            <strong>99.9%</strong>
            <span>Uptime</span>
          </div>

          <div className="signin-feature">
            <strong>24/7</strong>
            <span>Support</span>
          </div>

          <div className="signin-feature signin-feature-wide">
            <strong>Secure</strong>
            <span>Data protection</span>
          </div>
        </div>
      </div>
    </section>
  </main>
);
}