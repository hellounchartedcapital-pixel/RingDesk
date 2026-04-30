import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How RingDesk collects, uses, and protects your information.",
  alternates: { canonical: "https://ringdesk.co/privacy" },
  robots: { index: true, follow: true },
};

const PROCESSORS: { name: string; href: string }[] = [
  { name: "Stripe", href: "https://stripe.com/privacy" },
  { name: "Vercel", href: "https://vercel.com/legal/privacy-policy" },
  { name: "Twilio", href: "https://www.twilio.com/en-us/legal/privacy" },
  { name: "Vapi", href: "https://vapi.ai/privacy" },
  { name: "Anthropic", href: "https://www.anthropic.com/legal/privacy" },
  { name: "Google Workspace", href: "https://policies.google.com/privacy" },
  { name: "Cal.com", href: "https://cal.com/privacy" },
];

const PROCESSOR_DESCRIPTIONS: Record<string, string> = {
  Stripe: "(payment processing)",
  Vercel: "(website hosting)",
  Twilio: "(telephone connectivity, SMS)",
  Vapi: "(voice AI infrastructure)",
  Anthropic: "(AI language model used by the receptionist)",
  "Google Workspace": "(email, calendar)",
  "Cal.com": "(discovery-call scheduling)",
};

export default function PrivacyPage() {
  return (
    <LegalPage crossLink={{ href: "/terms", label: "Terms of Service →" }}>
      <h1>Privacy Policy</h1>
      <p>
        <strong>Last updated: April 30, 2026</strong>
      </p>

      <p>
        RingDesk (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is a
        managed AI receptionist service operated by Anthony J. Martella, a
        sole proprietorship based in Castle Pines, Colorado, USA. This
        Privacy Policy explains what information we collect, how we use it,
        and your rights regarding that information when you visit{" "}
        <a href="https://ringdesk.co">ringdesk.co</a> or use the RingDesk
        service.
      </p>

      <p>
        If you have questions about this policy, contact us at{" "}
        <a href="mailto:tony@ringdesk.co">tony@ringdesk.co</a>.
      </p>

      <h2>1. Who this policy covers</h2>
      <p>This policy covers two groups of people:</p>
      <ul>
        <li>
          <strong>Customers</strong>: businesses that subscribe to RingDesk
          and the individuals who manage those accounts.
        </li>
        <li>
          <strong>Callers</strong>: individuals who call a phone number that
          has been forwarded to a RingDesk-operated AI receptionist on
          behalf of one of our Customers.
        </li>
      </ul>
      <p>
        Different sections below apply depending on which group you fall
        into.
      </p>

      <h2>2. Information we collect</h2>

      <h3>From Customers</h3>
      <p>When you sign up for RingDesk or contact us, we collect:</p>
      <ul>
        <li>
          <strong>Account information</strong>: name, email address,
          business name, phone number, business address, and business type.
        </li>
        <li>
          <strong>Billing information</strong>: payment is processed by
          Stripe. We do not store your full credit card number. We receive a
          transaction reference, the last four digits of the card, and
          billing status from Stripe.
        </li>
        <li>
          <strong>Service configuration data</strong>: the information you
          provide so we can configure your AI receptionist, including
          business hours, common call types, frequently asked questions, and
          any custom call-handling instructions you give us.
        </li>
        <li>
          <strong>Communications</strong>: emails, support messages,
          scheduled call notes, and any other communications you send us.
        </li>
      </ul>

      <h3>From Callers</h3>
      <p>
        When someone calls a number forwarded to a RingDesk AI receptionist,
        we collect:
      </p>
      <ul>
        <li>
          <strong>Call audio recordings</strong>: full audio of the call.
        </li>
        <li>
          <strong>Call transcripts</strong>: a text transcript generated
          from the audio.
        </li>
        <li>
          <strong>Caller-provided information</strong>: name, phone number,
          address, reason for calling, and any other information the caller
          volunteers during the conversation, as part of the lead-capture
          process for our Customer.
        </li>
        <li>
          <strong>Caller phone number</strong> as provided by the telephone
          network.
        </li>
        <li>
          <strong>Call metadata</strong>: date, time, duration, and outcome
          of the call.
        </li>
      </ul>
      <p>
        The Customer (the business whose phone line was answered) is the
        controller of caller data. RingDesk acts as the processor on the
        Customer&rsquo;s behalf.
      </p>

      <h3>
        Automatically collected when you visit{" "}
        <a href="https://ringdesk.co">ringdesk.co</a>
      </h3>
      <ul>
        <li>
          <strong>Standard web analytics</strong>: pages visited, browser
          type, approximate location based on IP address, and referring URL.
        </li>
        <li>
          <strong>Cookies</strong>: we use minimal first-party cookies for
          site functionality. We do not currently use third-party
          advertising cookies or cross-site tracking.
        </li>
      </ul>

      <h2>3. How we use information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>Provide, configure, and improve the RingDesk service.</li>
        <li>Process payments and manage subscriptions.</li>
        <li>
          Send service-related notifications, including lead alerts, weekly
          tuning reports, and account updates.
        </li>
        <li>Respond to support requests.</li>
        <li>
          Tune and improve the AI receptionist&rsquo;s performance for the
          Customer.
        </li>
        <li>Comply with legal obligations.</li>
        <li>Detect and prevent fraud, abuse, and security incidents.</li>
      </ul>
      <p>
        We do not sell personal information. We do not share personal
        information with advertisers or data brokers.
      </p>

      <h2>4. Who we share information with</h2>
      <p>
        We share information with the following categories of third parties,
        only as necessary to operate the service:
      </p>
      <ul>
        {PROCESSORS.map((p) => (
          <li key={p.name}>
            <strong>{p.name}</strong> {PROCESSOR_DESCRIPTIONS[p.name]} —{" "}
            <a href={p.href} target="_blank" rel="noopener noreferrer">
              {p.href}
            </a>
          </li>
        ))}
      </ul>
      <p>
        Each of these processors has its own privacy practices. We select
        processors that we believe handle data responsibly, but we do not
        control their internal practices.
      </p>
      <p>
        We may also disclose information when legally required (subpoena,
        court order) or to protect the safety of any person.
      </p>

      <h2>5. Data retention</h2>
      <ul>
        <li>
          <strong>Customer account data</strong>: retained for the duration
          of the subscription plus 90 days after cancellation, then deleted
          unless required to retain for tax or legal reasons (in which case
          retained for up to 7 years for accounting records).
        </li>
        <li>
          <strong>Call recordings and transcripts</strong>: retained for 90
          days by default, then automatically deleted, unless the Customer
          requests longer retention or specific calls are flagged for tuning
          purposes.
        </li>
        <li>
          <strong>Website analytics</strong>: retained for 12 months.
        </li>
      </ul>
      <p>
        Customers can request earlier deletion of their data at any time by
        emailing <a href="mailto:tony@ringdesk.co">tony@ringdesk.co</a>.
      </p>

      <h2>6. Your rights</h2>
      <p>Depending on where you live, you may have the right to:</p>
      <ul>
        <li>Access the personal information we hold about you.</li>
        <li>Request correction of inaccurate information.</li>
        <li>Request deletion of your information.</li>
        <li>Object to or restrict processing.</li>
        <li>
          Receive a copy of your information in a portable format.
        </li>
        <li>
          Withdraw consent (where processing is based on consent).
        </li>
      </ul>
      <p>
        To exercise any of these rights, email{" "}
        <a href="mailto:tony@ringdesk.co">tony@ringdesk.co</a>. We will
        respond within 30 days.
      </p>
      <p>
        If you are a California resident, you have additional rights under
        the California Consumer Privacy Act (CCPA), including the right to
        know what categories of information we collect and the right to opt
        out of any sale of personal information (we do not sell
        information).
      </p>
      <p>
        If you are in the European Economic Area or United Kingdom, you have
        rights under the General Data Protection Regulation (GDPR). RingDesk
        currently operates only in the United States and Canada and does
        not actively market to EU/UK residents, but if you have submitted
        information to us and are based in the EU/UK, the same rights and
        contact channel apply.
      </p>

      <h2>7. Caller consent and recording</h2>
      <p>
        When someone calls a phone number that has been forwarded to
        RingDesk, the call is answered by an AI receptionist that
        identifies itself as a virtual assistant. Calls are recorded for
        service quality, transcript generation, and AI tuning purposes.
      </p>
      <p>
        It is the Customer&rsquo;s responsibility to comply with applicable
        call recording and consent laws in their state and the states of
        the people calling them. Colorado is a one-party consent state.
        Some other states (including California, Florida, Pennsylvania, and
        others) require all-party consent. Customers should configure their
        RingDesk receptionist to disclose recording at the start of each
        call where required.
      </p>
      <p>
        If you are a caller and do not wish to be recorded, you may hang up
        and contact the business by another channel.
      </p>

      <h2>8. Security</h2>
      <p>
        We use industry-standard security practices to protect information,
        including encryption in transit (TLS) and encrypted storage. No
        system is perfectly secure. If we become aware of a breach
        affecting personal information, we will notify affected individuals
        as required by applicable law.
      </p>

      <h2>9. Children</h2>
      <p>
        RingDesk is a B2B service and is not directed at children under 13.
        We do not knowingly collect personal information from children
        under 13. If you believe a child has submitted information to us,
        contact <a href="mailto:tony@ringdesk.co">tony@ringdesk.co</a> and
        we will delete it.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We may update this policy from time to time. When we do, we will
        update the &ldquo;Last updated&rdquo; date at the top. For material
        changes, we will notify Customers by email.
      </p>

      <h2>11. Contact</h2>
      <p>For any questions about this Privacy Policy or our data practices:</p>
      <p>
        <strong>Anthony J. Martella, dba RingDesk</strong>
        <br />
        Email: <a href="mailto:tony@ringdesk.co">tony@ringdesk.co</a>
        <br />
        Address: 6543 Edge View Rd, Castle Pines, CO 80108, USA
      </p>
    </LegalPage>
  );
}
