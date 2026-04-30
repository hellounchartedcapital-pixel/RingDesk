type Row = {
  attribute: string;
  diy: string;
  human: string;
  ringdesk: string;
};

const COLUMNS = {
  diy: "DIY AI Receptionists",
  human: "Human Answering Services",
  ringdesk: "RingDesk",
};

const ROWS: Row[] = [
  {
    attribute: "Setup",
    diy: "You build it (10-30 hrs)",
    human: "Vendor configures it",
    ringdesk: "Tony installs it for you in 48 hours",
  },
  {
    attribute: "Tuning",
    diy: "You manage prompts and call flows",
    human: "Vendor charges hourly for changes",
    ringdesk: "Tony tunes it weekly based on real calls",
  },
  {
    attribute: "Per-call cost",
    diy: "Often per-minute pricing",
    human: "$1-3 per call typical",
    ringdesk: "Flat $249/month, unlimited calls",
  },
  {
    attribute: "Lock-in",
    diy: "Annual contracts common",
    human: "Monthly with notice required",
    ringdesk: "Cancel anytime, no contract",
  },
  {
    attribute: "Quality control",
    diy: "You catch the mistakes",
    human: "Outsourced to call center reps",
    ringdesk: "Tony listens to actual calls weekly",
  },
  {
    attribute: "Spanish handling",
    diy: "Configure yourself",
    human: "Often English-only",
    ringdesk: "Auto-detects and switches",
  },
];

export function Comparison() {
  return (
    <section className="bg-[color:var(--brand-bg-secondary)] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-[color:var(--brand-slate)] sm:text-4xl lg:text-5xl">
            How RingDesk compares
          </h2>
          <p className="mt-4 text-lg text-[color:var(--brand-muted)]">
            Done-for-you. Two tiers. Cancel anytime.
          </p>
        </div>

        {/* Desktop / tablet: real table at sm+ */}
        <div className="mt-12 hidden sm:block">
          <div className="overflow-hidden rounded-lg border border-[color:var(--border)] bg-white">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[color:var(--border)] bg-[color:var(--brand-bg-secondary)] text-sm font-semibold uppercase tracking-wider text-[color:var(--brand-muted)]">
                  <th
                    scope="col"
                    className="w-1/4 px-6 py-4 text-[color:var(--brand-slate)]"
                  >
                    <span className="sr-only">Attribute</span>
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {COLUMNS.diy}
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {COLUMNS.human}
                  </th>
                  <th
                    scope="col"
                    className="border-l-2 border-[color:var(--brand-indigo)] bg-white px-6 py-4 text-[color:var(--brand-indigo)]"
                  >
                    {COLUMNS.ringdesk}
                  </th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row, i) => (
                  <tr
                    key={row.attribute}
                    className={
                      i < ROWS.length - 1
                        ? "border-b border-[color:var(--border)]"
                        : ""
                    }
                  >
                    <th
                      scope="row"
                      className="px-6 py-5 align-top text-base font-semibold text-[color:var(--brand-slate)]"
                    >
                      {row.attribute}
                    </th>
                    <td className="px-6 py-5 align-top text-sm leading-relaxed text-[color:var(--brand-slate)]/80">
                      {row.diy}
                    </td>
                    <td className="px-6 py-5 align-top text-sm leading-relaxed text-[color:var(--brand-slate)]/80">
                      {row.human}
                    </td>
                    <td className="border-l-2 border-[color:var(--brand-indigo)] bg-white px-6 py-5 align-top text-sm font-medium leading-relaxed text-[color:var(--brand-slate)]">
                      {row.ringdesk}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile: each row stacks as a card with column-labeled answers */}
        <div className="mt-10 space-y-4 sm:hidden">
          {ROWS.map((row) => (
            <div
              key={row.attribute}
              className="rounded-lg border border-[color:var(--border)] bg-white p-5"
            >
              <h3 className="text-base font-semibold text-[color:var(--brand-slate)]">
                {row.attribute}
              </h3>
              <dl className="mt-3 space-y-3">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-[color:var(--brand-muted)]">
                    {COLUMNS.diy}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[color:var(--brand-slate)]/80">
                    {row.diy}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-widest text-[color:var(--brand-muted)]">
                    {COLUMNS.human}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-[color:var(--brand-slate)]/80">
                    {row.human}
                  </dd>
                </div>
                <div className="-mx-2 rounded-md border-l-2 border-[color:var(--brand-indigo)] bg-[color:var(--brand-bg-secondary)] px-2 py-2">
                  <dt className="text-xs font-semibold uppercase tracking-widest text-[color:var(--brand-indigo)]">
                    {COLUMNS.ringdesk}
                  </dt>
                  <dd className="mt-1 text-sm font-medium leading-relaxed text-[color:var(--brand-slate)]">
                    {row.ringdesk}
                  </dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
