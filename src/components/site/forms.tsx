import { useState, type FormEvent, type ReactNode } from "react";
import { toast } from "sonner";
import { contact, whatsappHref } from "@/content/site";
import { sendEnquiry, type EnquiryInput } from "@/lib/enquiry";

const label = "text-xs font-medium uppercase tracking-[0.18em] text-gray-500 mb-2 block";
const input =
  "w-full bg-white border border-gray-300 px-4 py-3 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0b1f3f]/20 focus:border-[#0b1f3f] font-medium transition-all";

const Field = ({ id, text, required, children }: { id: string; text: string; required?: boolean; children: ReactNode }) => (
  <div>
    <label htmlFor={id} className={label}>
      {text}
      {required ? " *" : ""}
    </label>
    {children}
  </div>
);

const Honeypot = () => (
  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
    <label>
      Leave this empty
      <input type="text" name="tc_hp_check" tabIndex={-1} autoComplete="new-password" data-lpignore="true" data-1p-ignore="true" defaultValue="" />
    </label>
  </div>
);

/** Shared submit handling: honeypot, loading state, success and error feedback. */
function useEnquiry(build: (data: FormData) => EnquiryInput) {
  const [sending, setSending] = useState(false);
  const [doneName, setDoneName] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("tc_hp_check")) return; // bot
    setSending(true);
    try {
      await sendEnquiry(build(data));
      setDoneName(String(data.get("name") || "").trim() || "there");
      form.reset();
    } catch (err) {
      console.error("Enquiry failed", err);
      toast.error("Could not send your enquiry. Please try again or message us on WhatsApp.");
    } finally {
      setSending(false);
    }
  };

  return { sending, doneName, onSubmit };
}

const Success = ({ name }: { name: string }) => (
  <div role="status" className="bg-gray-50 rounded-xl p-8 md:p-10 text-center border border-gray-200">
    <p className="text-gray-700 max-w-md mx-auto leading-relaxed">{contact.success(name)}</p>
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-6 text-sm font-semibold text-[#0b1f3f] underline underline-offset-4 hover:decoration-tc-yellow hover:decoration-2"
    >
      Message us on WhatsApp
    </a>
  </div>
);

const SubmitButton = ({ sending, children }: { sending: boolean; children: ReactNode }) => (
  <button
    type="submit"
    disabled={sending}
    className="bg-[#0b1f3f] hover:bg-tc-yellow hover:text-tc-navy disabled:opacity-60 text-white font-semibold text-sm px-10 py-4 rounded-full transition-colors inline-flex items-center justify-center"
  >
    {sending ? "Sending…" : children}
  </button>
);

/* ── Partner application form ── */
export const PartnerForm = ({ button }: { button: string }) => {
  const [kind, setKind] = useState<"Company" | "Individual">("Company");
  const { sending, doneName, onSubmit } = useEnquiry((d) => ({
    formType: "Partner application",
    name: String(d.get("name")),
    phone: String(d.get("phone")),
    email: String(d.get("email") || ""),
    company: kind === "Company" ? String(d.get("org") || "") : "",
    extra: {
      Applying: kind,
      City: String(d.get("city") || ""),
      "What they do": String(d.get("does") || ""),
      "Businesses they work with": String(d.get("clients") || ""),
    },
  }));

  if (doneName) return <Success name={doneName} />;

  return (
    <form onSubmit={onSubmit} className="space-y-5 relative">
      <Honeypot />
      <div role="radiogroup" aria-label="Applying as" className="inline-flex rounded-full bg-gray-100 p-1">
        {(["Company", "Individual"] as const).map((k) => (
          <button
            key={k}
            type="button"
            role="radio"
            aria-checked={kind === k}
            onClick={() => setKind(k)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${kind === k ? "bg-[#0b1f3f] text-white" : "text-gray-600"}`}
          >
            {k === "Company" ? "Company" : "Individual"}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {kind === "Company" && (
          <Field id="p-org" text="Company name" required>
            <input id="p-org" name="org" required autoComplete="organization" className={input} />
          </Field>
        )}
        <Field id="p-name" text="Name" required>
          <input id="p-name" name="name" required autoComplete="name" className={input} />
        </Field>
        <Field id="p-phone" text="Phone" required>
          <input id="p-phone" name="phone" type="tel" required autoComplete="tel" className={input} />
        </Field>
        <Field id="p-email" text="Email" required>
          <input id="p-email" name="email" type="email" required autoComplete="email" className={input} />
        </Field>
        <Field id="p-city" text="City" required>
          <input id="p-city" name="city" required className={input} />
        </Field>
      </div>
      <Field id="p-does" text="What you do" required>
        <input id="p-does" name="does" required className={input} />
      </Field>
      <Field id="p-clients" text="Type of businesses you work with">
        <input id="p-clients" name="clients" className={input} />
      </Field>
      <SubmitButton sending={sending}>{button}</SubmitButton>
    </form>
  );
};
