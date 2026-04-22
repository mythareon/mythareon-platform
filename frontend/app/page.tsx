import Link from 'next/link';
import { Manrope, Space_Grotesk } from 'next/font/google';

const heading = Space_Grotesk({ subsets: ['latin'], weight: ['500', '700'] });
const body = Manrope({ subsets: ['latin'], weight: ['400', '500', '700'] });

export default function Page() {
  return (
    <main className={`${body.className} min-h-screen bg-[#060a16] text-[#ecf2ff]`}>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-40 top-16 h-96 w-96 rounded-full bg-[#3f7bff]/25 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-64 h-[28rem] w-[28rem] rounded-full bg-[#22c9a8]/20 blur-3xl" />

        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-8 md:px-10 md:pb-24">
          <header className="mb-16 flex items-center justify-between">
            <div className={`${heading.className} text-xl font-bold tracking-tight`}>Mythareon</div>
            <nav className="hidden items-center gap-6 text-sm text-[#a8b4d5] md:flex">
              <a href="#vision" className="transition hover:text-white">Vision</a>
              <a href="#products" className="transition hover:text-white">Products</a>
              <a href="#roadmap" className="transition hover:text-white">Roadmap</a>
              <a href="#contact" className="transition hover:text-white">Contact</a>
              <Link
                href="/workspaces"
                className="rounded-lg border border-white/25 bg-white/5 px-3 py-2 font-semibold text-white transition hover:bg-white/10"
              >
                Open App
              </Link>
            </nav>
          </header>

          <section className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <span className="inline-flex rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#70e5c9]">
                Eval • Observe • Cost • Govern • Vertical AI
              </span>
              <h1 className={`${heading.className} mt-6 text-5xl font-bold leading-[1.02] tracking-tight text-white md:text-7xl`}>
                Calibrate every layer of your AI.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#b4bfdb]">
                Mythareon is a developer-first platform for testing, observing, controlling, and governing
                AI systems in production. Start with eval and regression testing, then expand into
                observability, cost intelligence, governance, and vertical AI workflows.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="rounded-xl bg-gradient-to-r from-[#29d6b0] to-[#73f2d6] px-6 py-3 font-semibold text-[#062018] transition hover:brightness-110"
                >
                  Join Design Partner Cohort
                </a>
                <a
                  href="#products"
                  className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Explore Product Roadmap
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  ['Regression-first', 'Catch prompt, model, and agent regressions before release.'],
                  ['Decision-grade', 'Turn raw eval output into a ship / warn / block verdict.'],
                  ['Built for teams', 'Designed for engineers, platform leads, and AI product owners.'],
                ].map(([title, desc]) => (
                  <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className={`${heading.className} text-sm font-semibold text-white`}>{title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#9fb0d8]">{desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#89c5ff]">Built for teams shipping real traffic</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium text-[#c7d5f7]">
                  {['SaaS copilots', 'Internal AI tools', 'Support automation', 'Knowledge assistants', 'Agent workflows'].map((item) => (
                    <span key={item} className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <aside className="rounded-3xl border border-white/15 bg-white/[0.04] p-6 shadow-2xl shadow-black/30">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7fd2ff]">POC Demo</p>
              <h2 className={`${heading.className} mt-3 text-2xl font-semibold text-white`}>Mythareon Eval</h2>
              <p className="mt-3 text-sm leading-relaxed text-[#b4bfdb]">
                Upload a dataset, define baseline and candidate versions, run an evaluation,
                compare score deltas, inspect failing test cases, and get a release verdict.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-[#d2dbf2]">
                <li>Dataset upload and version compare</li>
                <li>Row-level failure analysis</li>
                <li>Policy-driven pass/warn/fail gate</li>
              </ul>

              <div className="mt-6 rounded-2xl border border-white/10 bg-[#091127] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#71e8c9]">Release Check</p>
                <div className="mt-3 grid gap-3">
                  <div className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2">
                    <span className="text-sm text-[#c8d4f0]">Quality delta</span>
                    <span className="font-semibold text-[#73f2d6]">+7.4%</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2">
                    <span className="text-sm text-[#c8d4f0]">Latency delta</span>
                    <span className="font-semibold text-[#ffd27a]">+38ms</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-white/[0.04] px-3 py-2">
                    <span className="text-sm text-[#c8d4f0]">Ship verdict</span>
                    <span className="font-semibold text-[#73f2d6]">PASS</span>
                  </div>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </div>

      <section className="mx-auto w-full max-w-6xl px-6 py-6 md:px-10 md:py-8">
        <div className="grid gap-4 rounded-3xl border border-white/10 bg-white/[0.025] p-6 md:grid-cols-4">
          {[
            ['Baseline vs candidate', 'Run structured comparisons before every release.'],
            ['Quality, latency, cost', 'Measure the tradeoffs that actually matter in production.'],
            ['Release gates', 'Enforce policy thresholds instead of relying on intuition.'],
            ['Platform roadmap', 'Expand naturally into observe, cost, govern, and vertical AI.'],
          ].map(([title, desc]) => (
            <div key={title}>
              <p className={`${heading.className} text-base font-semibold text-white`}>{title}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#9fb0d8]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="vision" className="mx-auto w-full max-w-6xl px-6 py-8 md:px-10 md:py-12">
        <h2 className={`${heading.className} text-3xl font-semibold text-white md:text-4xl`}>Platform Vision</h2>
        <p className="mt-4 max-w-3xl text-[#b4bfdb]">
          Mythareon expands from one sharp workflow into a complete AI reliability platform.
          Every module compounds value for teams shipping high-stakes AI systems.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ['01', 'Eval', 'Test prompts, models, and agents before release.'],
            ['02', 'Observe', 'Trace production behavior and replay critical failures.'],
            ['03', 'Cost', 'Measure spend and optimize routing efficiency.'],
            ['04', 'Govern', 'Apply policies, approvals, and release controls.'],
            ['05', 'Vertical', 'Package for domain-specific production workflows.'],
          ].map(([step, title, desc]) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#71e8c9]">{step}</p>
              <h3 className={`${heading.className} mt-2 text-lg font-semibold text-white`}>{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#b4bfdb]">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="products" className="mx-auto w-full max-w-6xl px-6 py-8 md:px-10 md:py-12">
        <h2 className={`${heading.className} text-3xl font-semibold text-white md:text-4xl`}>What We Build First</h2>
        <p className="mt-4 max-w-3xl text-[#b4bfdb]">
          The wedge product is Mythareon Eval: the fastest way to show clear value to AI teams,
          prove reliability gains, and create the entry point into the rest of the platform.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ['Release Confidence', 'Know exactly when an AI change is safe to ship.'],
            ['Regression Defense', 'Catch hidden quality and behavior regressions early.'],
            ['CI Integration', 'Bring AI release checks into existing engineering workflows.'],
          ].map(([title, desc]) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className={`${heading.className} text-xl font-semibold text-white`}>{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#b4bfdb]">{desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-[#0a1531] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#71e8c9]">Why teams switch</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              ['Before', 'Ad-hoc QA and subjective release calls.'],
              ['With Mythareon', 'Repeatable evaluations and policy-based release gates.'],
              ['Outcome', 'Fewer regressions in production and faster release confidence.'],
            ].map(([title, desc]) => (
              <div key={title} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className={`${heading.className} text-base font-semibold text-white`}>{title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#b4bfdb]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-8 md:px-10 md:py-12">
        <h2 className={`${heading.className} text-3xl font-semibold text-white md:text-4xl`}>How Mythareon Works</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-4">
          {[
            ['01', 'Upload Dataset', 'Bring representative prompts, expected behavior, and metadata into one repeatable test set.'],
            ['02', 'Register Versions', 'Track the baseline and candidate prompt, model, and settings for every comparison.'],
            ['03', 'Run Evaluation', 'Execute the test set, compute scores, and surface regressions row by row.'],
            ['04', 'Gate the Release', 'Generate a pass, warn, or fail outcome based on explicit product policies.'],
          ].map(([step, title, desc]) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#71e8c9]">{step}</p>
              <h3 className={`${heading.className} mt-3 text-xl font-semibold text-white`}>{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#b4bfdb]">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="roadmap" className="mx-auto w-full max-w-6xl px-6 py-8 md:px-10 md:py-12">
        <h2 className={`${heading.className} text-3xl font-semibold text-white md:text-4xl`}>12-Week Build Plan</h2>
        <p className="mt-4 max-w-3xl text-[#b4bfdb]">
          Build one focused workflow, validate it with design partners, then expand into the broader
          Mythareon platform with a clean technical foundation.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ['Weeks 1-4', 'Foundation: auth, projects, datasets, and version management.'],
            ['Weeks 5-8', 'Eval engine, scoring layer, compare UI, and release gating.'],
            ['Weeks 9-12', 'Design partner onboarding, product polish, and beta launch.'],
          ].map(([title, desc]) => (
            <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className={`${heading.className} text-xl font-semibold text-white`}>{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#b4bfdb]">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto w-full max-w-6xl px-6 pb-20 pt-8 md:px-10 md:pb-24">
        <div className="rounded-3xl border border-white/15 bg-gradient-to-r from-[#0e1938] to-[#102148] p-8 md:p-10">
          <h2 className={`${heading.className} text-3xl font-semibold text-white md:text-4xl`}>
            Join the First Design Partner Cohort
          </h2>
          <p className="mt-4 max-w-2xl text-[#b4bfdb]">
            If your team ships LLM features and wants confidence before release, Mythareon is being built for you.
            Join early, shape the product directly, and get hands-on support as the platform matures.
          </p>
          <div className="mt-7">
            <div className="flex flex-wrap gap-3">
              <Link
                href="mailto:vsparikh1996@gmail.com"
                className="inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-[#101f46] transition hover:brightness-95"
              >
                Email Founder
              </Link>
              <a
                href="#products"
                className="inline-flex rounded-xl border border-white/20 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Review Product Scope
              </a>
            </div>
            <p className="mt-3 text-sm text-[#aebde0]">Response target: within 24 hours for design partner requests.</p>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-[#9faed3] md:px-10">
        Mythareon — built for teams that want to ship AI with precision.
      </footer>
    </main>
  );
}
