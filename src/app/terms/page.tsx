import type { Metadata } from "next";

import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of RingDesk's AI receptionist service.",
  alternates: { canonical: "https://ringdesk.co/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage crossLink={{ href: "/privacy", label: "Privacy Policy →" }}>
      <h1>Terms of Service</h1>
      <p>
        <strong>Last updated: April 29, 2026</strong>
      </p>

      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your use of
        RingDesk (&ldquo;Service&rdquo;), operated by Anthony J. Martella, a
        sole proprietorship based in Castle Pines, Colorado, USA
        (&ldquo;RingDesk&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;,
        &ldquo;our&rdquo;).
      </p>
      <p>
        By signing up for or using the Service, you agree to these Terms. If
        you do not agree, do not use the Service.
      </p>
      <p>
        If you have questions, contact{" "}
        <a href="mailto:tony@ringdesk.co">tony@ringdesk.co</a>.
      </p>

      <h2>1. The Service</h2>
      <p>
        RingDesk is a managed AI receptionist service. We install,
        configure, and tune AI-powered phone receptionists that answer
        inbound calls on behalf of our customers&rsquo; businesses. The
        Service includes:
      </p>
      <ul>
        <li>Initial setup of an AI receptionist tailored to your business.</li>
        <li>
          Ongoing tuning of the receptionist based on real call performance.
        </li>
        <li>Daily call summaries and lead alerts.</li>
        <li>Customer support via email.</li>
      </ul>
      <p>
        The specific features included depend on your subscription tier as
        published on <a href="https://ringdesk.co">ringdesk.co</a>.
      </p>

      <h2>2. Eligibility</h2>
      <p>
        You must be at least 18 years old and authorized to enter into
        contracts on behalf of the business signing up. By signing up, you
        represent that you meet these requirements.
      </p>
      <p>
        The Service is currently available only to businesses located in the
        United States and Canada.
      </p>

      <h2>3. Subscription and billing</h2>

      <h3>Plans and pricing</h3>
      <p>
        Pricing is published at{" "}
        <a href="https://ringdesk.co">ringdesk.co</a>. Current plans are
        RingDesk Standard at $249/month and RingDesk Premium at $499/month.
        Subscriptions are billed monthly in advance, beginning on the date
        of sign-up.
      </p>
      <p>
        We may change pricing for new subscribers at any time. For existing
        subscribers, we will provide at least 30 days&rsquo; notice of any
        price increase by email.
      </p>

      <h3>Payment</h3>
      <p>
        Payments are processed by Stripe. By providing payment information,
        you authorize us to charge the applicable subscription fee on a
        recurring monthly basis until the subscription is canceled.
      </p>
      <p>
        If a payment fails, we will retry the charge over the following
        several days. If payment is not received within 14 days of the due
        date, we may suspend or cancel the Service.
      </p>

      <h3>Cancellation</h3>
      <p>
        You may cancel your subscription at any time via the Stripe Customer
        Portal link in any RingDesk billing email or by emailing{" "}
        <a href="mailto:tony@ringdesk.co">tony@ringdesk.co</a>. Cancellation
        takes effect at the end of the current billing period — you will
        retain access through the end of the period you have already paid
        for.
      </p>

      <h3>Refunds</h3>
      <p>Subscription fees are non-refundable, except:</p>
      <ul>
        <li>
          If we materially fail to deliver the Service as described and do
          not cure the failure within 14 days of written notice, you may
          request a prorated refund for unused portions of the current
          billing period.
        </li>
        <li>
          New customers on a &ldquo;First 90 Days&rdquo; promotional offer
          (where stated explicitly at sign-up) may receive a refund of all
          subscription fees paid if RingDesk has materially failed to answer
          and qualify calls as described, within 90 days of activation.
          This offer is system-performance based, not outcome-based; it
          does not guarantee a specific number of leads, conversions, or
          revenue outcomes.
        </li>
      </ul>

      <h2>4. Customer responsibilities</h2>
      <p>You agree to:</p>
      <ul>
        <li>
          Provide accurate information during sign-up and keep it up to
          date.
        </li>
        <li>
          Provide accurate business configuration information (call
          scripts, hours, services, FAQ) so we can configure your
          receptionist effectively.
        </li>
        <li>
          Comply with all applicable laws when using the Service, including
          call recording and consent laws (see Section 5).
        </li>
        <li>
          Not use the Service for any illegal, fraudulent, abusive, or
          harmful purpose.
        </li>
        <li>
          Not attempt to reverse-engineer, scrape, or otherwise extract the
          underlying technology.
        </li>
        <li>
          Not resell the Service or use it on behalf of third parties
          without our written consent.
        </li>
      </ul>
      <p>
        You are responsible for the actions of users you authorize to
        access your RingDesk account.
      </p>

      <h2>5. Call recording and consent</h2>
      <p>
        The RingDesk receptionist records and transcribes calls. You are
        responsible for ensuring that your use of the Service complies with
        applicable call recording and consent laws, which vary by state and
        country.
      </p>
      <p>
        Colorado is a one-party consent state. Some other states (including
        California, Florida, Pennsylvania, Illinois, and others) require
        all-party consent. We will work with you to configure your
        receptionist to disclose recording at the start of calls where
        applicable.
      </p>
      <p>
        You agree to indemnify and hold harmless RingDesk from any claims
        arising from your failure to comply with applicable call recording
        or consent laws.
      </p>

      <h2>6. Phone numbers and forwarding</h2>
      <p>
        The Service uses phone numbers and call forwarding to route calls
        to the AI receptionist. You may either keep your existing business
        number and forward calls to a RingDesk-provisioned number, or use a
        RingDesk-provisioned number directly.
      </p>
      <p>
        If you provide a RingDesk-provisioned number, that number remains
        the property of RingDesk&rsquo;s telephony provider (Twilio) and
        may be reclaimed if your subscription ends. You may port out a
        number you brought to the Service, subject to standard porting
        procedures.
      </p>

      <h2>7. AI limitations and acknowledgment</h2>
      <p>The Service is powered by AI language models. You acknowledge that:</p>
      <ul>
        <li>
          AI receptionists are not perfect. They may occasionally
          misunderstand callers, give imperfect answers, or fail to capture
          information accurately.
        </li>
        <li>
          We tune the receptionist over time, but no AI system can
          guarantee 100% accuracy.
        </li>
        <li>
          The Service is provided as an aid to handling inbound calls, not
          as a replacement for licensed professional advice (medical,
          legal, financial, etc.).
        </li>
        <li>
          You should not configure the receptionist to make legally
          consequential decisions or commitments on behalf of your
          business.
        </li>
      </ul>

      <h2>8. Intellectual property</h2>
      <p>
        RingDesk and all associated trademarks, logos, software,
        documentation, and content are owned by Anthony J. Martella, dba
        RingDesk. You receive a limited, non-exclusive, non-transferable
        license to use the Service for your business during your
        subscription, and no other rights.
      </p>
      <p>
        You retain ownership of your business data, including call
        recordings, transcripts, and configuration data, subject to our
        license to use that data to provide and improve the Service as
        described in our Privacy Policy.
      </p>

      <h2>9. Service availability</h2>
      <p>
        We aim to provide the Service continuously, but we do not guarantee
        100% uptime. The Service depends on third-party providers (Twilio,
        Vapi, Anthropic, Vercel, Stripe) whose availability we do not
        control. We will use reasonable efforts to address outages
        promptly.
      </p>
      <p>
        We may perform scheduled maintenance and will provide advance
        notice when reasonable.
      </p>

      <h2>10. Disclaimers</h2>
      <p>
        THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
        AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING WITHOUT LIMITATION ANY WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR
        NON-INFRINGEMENT.
      </p>
      <p>
        WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED,
        ERROR-FREE, OR THAT IT WILL MEET YOUR SPECIFIC BUSINESS
        REQUIREMENTS.
      </p>

      <h2>11. Limitation of liability</h2>
      <p>
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, RINGDESK&rsquo;S TOTAL
        LIABILITY TO YOU FOR ANY CLAIM ARISING OUT OF OR RELATING TO THESE
        TERMS OR THE SERVICE IS LIMITED TO THE AMOUNT YOU HAVE PAID TO
        RINGDESK IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE
        TO THE CLAIM.
      </p>
      <p>
        IN NO EVENT WILL RINGDESK BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
        CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST
        PROFITS, LOST REVENUE, LOST BUSINESS OPPORTUNITY, OR LOSS OF DATA,
        EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
      </p>
      <p>
        Some jurisdictions do not allow the exclusion or limitation of
        certain damages. In those jurisdictions, the limitations above
        apply to the maximum extent permitted.
      </p>

      <h2>12. Indemnification</h2>
      <p>
        You agree to indemnify, defend, and hold harmless RingDesk from any
        claims, damages, or expenses (including reasonable attorneys&rsquo;
        fees) arising out of:
      </p>
      <ul>
        <li>Your use of the Service.</li>
        <li>Your violation of these Terms.</li>
        <li>
          Your violation of any applicable law (including call recording
          and consent laws).
        </li>
        <li>
          Any content or instructions you provide to the AI receptionist
          that result in third-party claims.
        </li>
      </ul>

      <h2>13. Termination</h2>
      <p>
        We may suspend or terminate your access to the Service if you
        materially breach these Terms, including non-payment, abuse of the
        Service, or violation of applicable law. Where reasonable, we will
        provide notice and an opportunity to cure.
      </p>
      <p>You may terminate at any time per Section 3.</p>
      <p>
        Sections that by their nature should survive termination —
        including Sections 8 (IP), 10 (Disclaimers), 11 (Limitation of
        Liability), 12 (Indemnification), 14 (Governing Law), and 15
        (Disputes) — survive.
      </p>

      <h2>14. Governing law</h2>
      <p>
        These Terms are governed by the laws of the State of Colorado, USA,
        without regard to conflict-of-laws principles.
      </p>

      <h2>15. Disputes</h2>
      <p>
        Any dispute arising out of or relating to these Terms or the
        Service will be resolved as follows:
      </p>
      <ol>
        <li>
          <strong>Informal resolution</strong>: First, contact{" "}
          <a href="mailto:tony@ringdesk.co">tony@ringdesk.co</a>. We will
          attempt to resolve the dispute informally within 30 days.
        </li>
        <li>
          <strong>Binding arbitration</strong>: If informal resolution
          fails, the dispute will be resolved by binding arbitration
          administered by the American Arbitration Association under its
          Commercial Arbitration Rules. The arbitration will be conducted
          in Denver, Colorado, in English, by a single arbitrator. Judgment
          on the award may be entered in any court of competent
          jurisdiction.
        </li>
        <li>
          <strong>Exceptions</strong>: Either party may bring claims in
          small-claims court if eligible, or seek injunctive relief in
          court for intellectual property infringement.
        </li>
      </ol>
      <p>
        YOU AND RINGDESK AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER
        ONLY IN AN INDIVIDUAL CAPACITY AND NOT AS A PLAINTIFF OR CLASS
        MEMBER IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING.
      </p>

      <h2>16. Changes to these Terms</h2>
      <p>
        We may update these Terms from time to time. We will update the
        &ldquo;Last updated&rdquo; date at the top, and for material
        changes we will notify Customers by email at least 14 days before
        the change takes effect. Continued use of the Service after the
        effective date constitutes acceptance.
      </p>

      <h2>17. Miscellaneous</h2>
      <ul>
        <li>
          <strong>Entire agreement</strong>: These Terms, together with the
          Privacy Policy, constitute the entire agreement between you and
          RingDesk regarding the Service.
        </li>
        <li>
          <strong>Severability</strong>: If any provision is found
          unenforceable, the remaining provisions remain in effect.
        </li>
        <li>
          <strong>No waiver</strong>: Failure to enforce any provision is
          not a waiver of the right to enforce it later.
        </li>
        <li>
          <strong>Assignment</strong>: You may not assign these Terms
          without our written consent. We may assign in connection with a
          sale of the business.
        </li>
        <li>
          <strong>Independent contractors</strong>: Nothing in these Terms
          creates a partnership, joint venture, or employment
          relationship.
        </li>
      </ul>

      <h2>18. Contact</h2>
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
