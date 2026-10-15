import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
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
  ShieldCheck,
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
  <main className="signin-page signup-page">
    <section className="signin-left signup-left">
      <div className="signin-intro signup-intro">
        <p className="signin-tagline">
          A step towards transforming and innovating every industry.
        </p>
        <div className="signin-rule" />

<h1 className="signup-heading">
  Create Your <span>Wavexa Account</span>
</h1>

        <p className="signin-description">
          Manage your conferences, registrations, abstracts
          &amp; attendees – all in one secure place.
        </p>
      </div>

      <form className="signin-form signup-form" onSubmit={handleSignUp} noValidate>
        <label className={`signin-input signup-input ${errors.fullName ? "signup-has-error" : ""}`}>
          <UserRound size={22} />
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(event) => {
              setFullName(event.target.value.replace(/[^A-Za-z ]/g, ""));
              setErrors((prev) => ({ ...prev, fullName: "" }));
              setMessage("");
            }}
            onBlur={() =>
              setErrors((prev) => ({
                ...prev,
                fullName: validateName(fullName),
              }))
            }
            autoComplete="name"
            aria-invalid={Boolean(errors.fullName)}
            required
          />
        </label>
        {errors.fullName && <p className="signup-field-error">{errors.fullName}</p>}

        <label className={`signin-input signup-input ${errors.email ? "signup-has-error" : ""}`}>
          <Mail size={22} />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value.toLowerCase());
              setErrors((prev) => ({ ...prev, email: "" }));
              setMessage("");
            }}
            onBlur={() =>
              setErrors((prev) => ({ ...prev, email: validateEmail(email) }))
            }
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            required
          />
        </label>
        {errors.email && <p className="signup-field-error">{errors.email}</p>}

        <label className={`signin-input signup-input ${errors.phone ? "signup-has-error" : ""}`}>
          <Phone size={22} />
          <input
            type="tel"
            inputMode="numeric"
            placeholder="10-digit Phone Number"
            value={phone}
            onChange={(event) => {
              setPhone(event.target.value.replace(/\D/g, "").slice(0, 10));
              setErrors((prev) => ({ ...prev, phone: "" }));
              setMessage("");
            }}
            onBlur={() =>
              setErrors((prev) => ({ ...prev, phone: validatePhone(phone) }))
            }
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            required
          />
        </label>
        {errors.phone && <p className="signup-field-error">{errors.phone}</p>}

        <label className={`signin-input signup-input ${errors.password ? "signup-has-error" : ""}`}>
          <LockKeyhole size={22} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setErrors((prev) => ({
                ...prev,
                password: "",
                confirmPassword: "",
              }));
              setMessage("");
            }}
            onBlur={() =>
              setErrors((prev) => ({
                ...prev,
                password: validatePassword(password),
              }))
            }
            autoComplete="new-password"
            aria-invalid={Boolean(errors.password)}
            required
          />
          <button
            type="button"
            className="signin-eye"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
          </button>
        </label>
        {errors.password && <p className="signup-field-error">{errors.password}</p>}

        <label className={`signin-input signup-input ${errors.confirmPassword ? "signup-has-error" : ""}`}>
          <LockKeyhole size={22} />
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
              setErrors((prev) => ({ ...prev, confirmPassword: "" }));
              setMessage("");
            }}
            onBlur={() =>
              setErrors((prev) => ({
                ...prev,
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
            className="signin-eye"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
          >
            {showConfirmPassword ? <EyeOff size={21} /> : <Eye size={21} />}
          </button>
        </label>
        {errors.confirmPassword && (
          <p className="signup-field-error">{errors.confirmPassword}</p>
        )}

        <div className="signup-terms">
          <label>
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => {
                setAcceptedTerms(event.target.checked);
                setErrors((prev) => ({ ...prev, terms: "" }));
              }}
            />
            <span>
              I agree to the{" "}
              <Link to="/business/terms-conditions">Terms &amp; Conditions</Link>
              {" "}and{" "}
              <Link to="/business/privacy-policy">Privacy Policy</Link>.
            </span>
          </label>
        </div>
        {errors.terms && <p className="signup-field-error">{errors.terms}</p>}

        {message && (
          <p className="signin-error" role="alert">{message}</p>
        )}

        <button className="signin-submit" type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
          {!loading && <ArrowRight size={21} />}
        </button>

        <div className="signin-divider">
          <span />
          <p>or</p>
          <span />
        </div>

        <p className="signin-signup">
          Already have an account? <Link to="/signin">Sign In</Link>
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
          Every conference
          <br />
          starts with a
          <br />
          smarter connection.
        </h2>

        <p className="signin-marketing-description">
          One platform to manage conferences, registrations,
          abstract submissions and attendees – built for
          simplicity, security and scale.
        </p>

        <div className="signin-features">
          <div className="signin-feature">
            <strong>Easy</strong>
            <span>Registration</span>
          </div>
          <div className="signin-feature">
            <strong>Secure</strong>
            <span>Data management</span>
          </div>
          <div className="signin-feature signin-feature-wide">
            <strong>Unified</strong>
            <span>Conference tools</span>
          </div>
        </div>
      </div>
    </section>
  </main>
);

}