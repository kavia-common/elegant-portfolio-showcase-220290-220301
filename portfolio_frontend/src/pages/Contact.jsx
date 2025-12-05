import { useState } from "react";
import { postContact } from "../services/api";

/**
 * Contact form with client-side validation, accessible labels, and success/error states.
 */
export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.name.trim()) return "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "A valid email is required.";
    if (form.message.trim().length < 10) return "Message must be at least 10 characters.";
    return "";
    };

  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }
    setStatus("submitting");
    postContact(form)
      .then(() => {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setStatus("error");
        setError("Failed to send. Please try again later.");
      });
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Contact</h1>
        <p className="mt-1 text-sm text-gray-600">
          I’d love to hear from you. Fill in the form and I’ll get back soon.
        </p>
      </header>

      <form onSubmit={onSubmit} className="card p-6 max-w-2xl">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={onChange}
              required
              className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Your name"
              autoComplete="name"
            />
          </div>
          <div className="sm:col-span-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              required
              className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={onChange}
              required
              rows={6}
              className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="How can I help?"
            />
          </div>
        </div>

        {error ? <p className="mt-3 text-sm text-error">{error}</p> : null}

        <div className="mt-5 flex items-center gap-3">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-primary disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Send Message"}
          </button>
          {status === "success" ? (
            <p role="status" className="text-sm text-success">
              Thanks! Your message has been sent.
            </p>
          ) : status === "error" ? (
            <p role="status" className="text-sm text-error">There was an error sending your message.</p>
          ) : null}
        </div>
      </form>
    </div>
  );
}
