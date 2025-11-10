export default function TermsPage() {
  return (
    <main className="min-h-screen bg-quarternary px-6 py-[6rem] font-orbitron text-tertiary">
      <div className="border-secondary/40 shadow-secondary/20 mx-auto max-w-4xl rounded-2xl border bg-[#1b1b1b]/60 p-8 shadow-lg backdrop-blur-md">
        <h1 className="pb-5 text-center text-6xl font-bold text-secondary">
          Terms and Conditions
        </h1>

        <p className="text-tertiary/80 mb-6 text-center font-mono">
          By accessing and using this website, you accept and agree to be bound
          by the terms and provisions of this agreement.
        </p>

        <div className="text-tertiary/90 space-y-6 font-mono leading-relaxed">
          <section>
            <h2 className="mb-2 font-orbitron text-2xl font-semibold text-secondary">
              1. Use of Site
            </h2>
            <p>
              You agree to use the site for lawful purposes only. You must not
              use it in a way that may harm the site, services, or other users.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-orbitron text-2xl font-semibold text-secondary">
              2. Intellectual Property
            </h2>
            <p>
              All content on this site, including logos, graphics, and text, is
              the property of the Techletics ’25 organizing committee and is
              protected under intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-orbitron text-2xl font-semibold text-secondary">
              3. User Accounts
            </h2>
            <p>
              If you create an account, you are responsible for maintaining the
              confidentiality of your account credentials and ensuring that all
              information you provide is accurate.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-orbitron text-2xl font-semibold text-secondary">
              4. Limitation of Liability
            </h2>
            <p>
              The organizers of Techletics &apos;25 are not liable for any
              damages or losses that may occur as a result of your participation
              or use of this website. All participation is at your own
              discretion.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-orbitron text-2xl font-semibold text-secondary">
              5. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify or update these terms at any time.
              Continued use of this website signifies your acceptance of any
              changes made to these terms.
            </p>
          </section>
        </div>

        <p className="text-tertiary/60 mt-10 text-center font-orbitron text-sm">
          Last updated: August 5, 2025
        </p>

        <div className="mt-8 flex justify-center">
          <div className="h-[0.2rem] w-[50%] rounded-full bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
        </div>
      </div>
    </main>
  );
}
