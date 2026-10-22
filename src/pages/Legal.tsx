import { useSeo } from "@/lib/seo";
import { business, fullAddress } from "@/content/site";

type Kind = "privacy" | "terms";

const Legal = ({ kind }: { kind: Kind }) => {
  const isPrivacy = kind === "privacy";
  useSeo({
    title: `${isPrivacy ? "Privacy Policy" : "Terms of Use"} | True Connect`,
    description: isPrivacy
      ? "How True Connect collects and uses the details you send through our website forms."
      : "Terms for using the True Connect website.",
    path: isPrivacy ? "/privacy" : "/terms",
  });

  return (
    <div className="bg-white text-tc-navy font-sans pt-28 md:pt-36 pb-16 md:pb-20">
      <div className="container-tc max-w-[820px] prose prose-headings:text-[#0b1f3f]">
        {isPrivacy ? (
          <>
            <h1>Privacy Policy</h1>
            <p>This policy explains what {business.name} does with the details you send us through this website.</p>
            <h2>What we collect</h2>
            <p>Only what you type into our forms or send us on WhatsApp: your name, phone number, email, company, and your message.</p>
            <h2>How we use it</h2>
            <p>To reply to your enquiry and, if you become a client, to deliver the work. We do not sell your details.</p>
            <h2>Who sees it</h2>
            <p>Our team, and the email service we use to deliver form messages to us. We share details with others only where the law requires it.</p>
            <h2>Your choices</h2>
            <p>To see, correct or delete what we hold about you, email <a href={business.emailHref}>{business.email}</a>.</p>
            <h2>Contact</h2>
            <p>{business.legalName}, {fullAddress}.</p>
          </>
        ) : (
          <>
            <h1>Terms of Use</h1>
            <p>By using this website you agree to these terms.</p>
            <h2>Information on this site</h2>
            <p>We aim to keep it accurate, but it is general information and not an offer. Scope and prices are agreed in writing for each project.</p>
            <h2>Enquiries</h2>
            <p>Sending an enquiry does not create a contract. A project begins only after a written proposal is accepted.</p>
            <h2>Ownership</h2>
            <p>Content on this site belongs to {business.name} unless stated otherwise. Please ask before reusing it.</p>
            <h2>Contact</h2>
            <p>{business.legalName}, {fullAddress}. <a href={business.emailHref}>{business.email}</a></p>
          </>
        )}
      </div>
    </div>
  );
};

export default Legal;
