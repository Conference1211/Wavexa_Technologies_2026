import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { auth, db } from "@/firebase";


export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Do not automatically change the user's name capitalization.
  const validateName = (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) return "Please enter your full name.";
    if (!/^[A-Za-z]+(?: [A-Za-z]+)+$/.test(trimmed)) {
      return "Enter your first and last name using letters and spaces only.";
    }
    if (!/^[A-Z][a-z]*(?: [A-Z][a-z]*)+$/.test(trimmed)) {
      return "Each name must start with a capital letter, followed by lowercase letters.";
    }

    return "";
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) return "Please enter your email address.";

    if (value !== value.toLowerCase()) {
      return "Use lowercase letters in your email address.";
    }

    if (
      !/^[a-z0-9]+(?:[._+-][a-z0-9]+)*@[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z]{2,})+$/.test(
        value
      )
    ) {
      return "Enter a valid email address using lowercase letters.";
    }

    return "";
  };

  const validatePhone = (value: string) => {
    if (!value) return "Please enter your phone number.";
    if (!/^[0-9]{10}$/.test(value)) {
      return "Phone number must contain exactly 10 digits.";
    }

    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) return "Please enter a password.";
    if (value.length < 8) return "Password must contain at least 8 characters.";
    if (!/[A-Z]/.test(value)) return "Include at least one uppercase letter.";
    if (!/[a-z]/.test(value)) return "Include at least one lowercase letter.";
    if (!/[0-9]/.test(value)) return "Include at least one number.";
    if (!/[^A-Za-z0-9]/.test(value)) {
      return "Include at least one special character.";
    }

    return "";
  };

  const validateForm = () => {
    const nextErrors: Record<string, string> = {
      fullName: validateName(fullName),
      email: validateEmail(email),
      phone: validatePhone(phone),
      password: validatePassword(password),
    };

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!acceptedTerms) {
      nextErrors.terms = "Please accept the Terms & Conditions and Privacy Policy.";
    }

    Object.keys(nextErrors).forEach((key) => {
      if (!nextErrors[key]) delete nextErrors[key];
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      const cleanName = fullName.trim();
      const cleanEmail = email.trim();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        cleanEmail,
        password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: cleanName,
      });

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName: cleanName,
        email: cleanEmail,
        phone,
        createdAt: serverTimestamp(),
      });

      navigate("/signin", {
        state: { signupSuccess: true },
      });
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };

      console.error("Sign-up error:", err);

      switch (firebaseError.code) {
        case "auth/email-already-in-use":
          setMessage("An account already exists with this email address.");
          break;

        case "auth/invalid-email":
          setMessage("Please enter a valid email address.");
          break;

        case "auth/weak-password":
          setMessage("Please choose a stronger password.");
          break;

        case "auth/network-request-failed":
          setMessage("Network error. Please check your internet connection.");
          break;

        case "permission-denied":
        case "firestore/permission-denied":
          setMessage(
            "Account created, but saving profile details was denied. Please check your Firestore Rules."
          );
          break;

        default:
          setMessage("Unable to create your account. Please try again.");
      }
    } finally {
      setLoading(false);
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
        <div className="auth-heading signup-heading">
          <h2>Create Account</h2>
          <p>Join Wavexa Technologies to get started.</p>
        </div>

        <form className="auth-form" onSubmit={handleSignUp} noValidate>
          <div className="auth-field">
            <label htmlFor="signup-name">Full Name</label>
            <div
              className={`auth-input-wrap ${errors.fullName ? "has-error" : ""}`}
            >
              <UserRound aria-hidden="true" />
              <input
                id="signup-name"
                type="text"
                placeholder="Enter your first and last name"
                value={fullName}
                onChange={(event) => {
                  const value = event.target.value.replace(/[^A-Za-z ]/g, "");
                  setFullName(value);
                  setErrors((previous) => ({ ...previous, fullName: "" }));
                  setMessage("");
                }}
                onBlur={() =>
                  setErrors((previous) => ({
                    ...previous,
                    fullName: validateName(fullName),
                  }))
                }
                autoComplete="name"
                aria-invalid={Boolean(errors.fullName)}
                required
              />
            </div>
            {errors.fullName && (
              <p className="field-error">{errors.fullName}</p>
            )}
          </div>

          <div className="auth-field">
            <label htmlFor="signup-email">Email Address</label>
            <div
              className={`auth-input-wrap ${errors.email ? "has-error" : ""}`}
            >
              <Mail aria-hidden="true" />
              <input
                id="signup-email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value.toLowerCase());
                  setErrors((previous) => ({ ...previous, email: "" }));
                  setMessage("");
                }}
                onBlur={() =>
                  setErrors((previous) => ({
                    ...previous,
                    email: validateEmail(email),
                  }))
                }
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                required
              />
            </div>
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <div className="auth-field">
            <label htmlFor="signup-phone">Phone Number</label>
            <div
              className={`auth-input-wrap ${errors.phone ? "has-error" : ""}`}
            >
              <Phone aria-hidden="true" />
              <input
                id="signup-phone"
                type="tel"
                inputMode="numeric"
                placeholder="Enter your 10-digit phone number"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value.replace(/\D/g, "").slice(0, 10));
                  setErrors((previous) => ({ ...previous, phone: "" }));
                  setMessage("");
                }}
                onBlur={() =>
                  setErrors((previous) => ({
                    ...previous,
                    phone: validatePhone(phone),
                  }))
                }
                autoComplete="tel"
                aria-invalid={Boolean(errors.phone)}
                required
              />
            </div>
            {errors.phone && <p className="field-error">{errors.phone}</p>}
          </div>

          <div className="auth-field">
            <label htmlFor="signup-password">Password</label>
            <div
              className={`auth-input-wrap ${errors.password ? "has-error" : ""}`}
            >
              <LockKeyhole aria-hidden="true" />
              <input
                id="signup-password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a strong password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setErrors((previous) => ({
                    ...previous,
                    password: "",
                    confirmPassword: "",
                  }));
                  setMessage("");
                }}
                onBlur={() =>
                  setErrors((previous) => ({
                    ...previous,
                    password: validatePassword(password),
                  }))
                }
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
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
            {errors.password && (
              <p className="field-error">{errors.password}</p>
            )}
          </div>

          <div className="auth-field">
            <label htmlFor="signup-confirm-password">Confirm Password</label>
            <div
              className={`auth-input-wrap ${
                errors.confirmPassword ? "has-error" : ""
              }`}
            >
              <LockKeyhole aria-hidden="true" />
              <input
                id="signup-confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  setErrors((previous) => ({
                    ...previous,
                    confirmPassword: "",
                  }));
                  setMessage("");
                }}
                onBlur={() =>
                  setErrors((previous) => ({
                    ...previous,
                    confirmPassword: !confirmPassword
                      ? "Please confirm your password."
                      : password !== confirmPassword
                        ? "Passwords do not match."
                        : "",
                  }))
                }
                autoComplete="new-password"
                aria-invalid={Boolean(errors.confirmPassword)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword((current) => !current)
                }
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="field-error">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="auth-field">
            <label className="auth-checkbox">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => {
                  setAcceptedTerms(event.target.checked);
                  setErrors((previous) => ({ ...previous, terms: "" }));
                }}
              />
              <span>
                I agree to the{" "}
                <Link to="/business/terms-conditions">Terms &amp; Conditions</Link>
                {" "}and{" "}
                <Link to="/business/privacy-policy">Privacy Policy</Link>.
              </span>
            </label>
            {errors.terms && <p className="field-error">{errors.terms}</p>}
          </div>

          {message && (
            <p className="auth-message auth-error" role="alert">
              {message}
            </p>
          )}

          <button className="auth-button" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
            {!loading && <ArrowRight aria-hidden="true" />}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </section>

      <footer className="auth-copyright">
        © {new Date().getFullYear()} Wavexa Technologies. All rights reserved.
      </footer>
    </main>
  );
}