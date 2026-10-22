import emailjs from "@emailjs/browser";

// EmailJS public identifiers (safe to ship in the browser). Override in .env if they change.
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID ?? "service_ojf96cm";
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID ?? "template_wa9gvmt";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY ?? "XR7hy2NvuKPVARIUd";

export interface EnquiryInput {
  /** Which form on the site the enquiry came from. Shown in the email subject area. */
  formType: "Contact";
  name: string;
  phone: string;
  email?: string;
  company?: string;
  needs?: string[];
  budget?: string;
  message?: string;
  /** Extra labelled lines appended to the message body. */
  extra?: Record<string, string | undefined>;
}

/** Sends an enquiry through EmailJS. The recipient is set in the EmailJS template. */
export async function sendEnquiry(input: EnquiryInput): Promise<void> {
  const extraLines = Object.entries(input.extra ?? {})
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `${k}: ${v}`);

  const body = [input.message?.trim() || "(no message)", ...extraLines]
    .filter(Boolean)
    .join("\n");

  await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    {
      from_name: input.name,
      name: input.name, // alias used in the template subject / From Name
      from_email: input.email?.trim() || "not provided",
      email: input.email?.trim() || "", // alias used for Reply-To
      mobile: input.phone,
      project_type: input.needs?.length ? input.needs.join(", ") : input.formType,
      budget_range: input.budget || "—",
      message: body,
    },
    { publicKey: PUBLIC_KEY }
  );
}
