"use client";

import { Magis, SparkleIcon } from "../home/ui";
import { leadEndpoints, leadMessages, useLeadForm } from "../home/use-lead-form";

/** Purple card resting on the footer, like the closing CTA of the home. */
export function NewsletterSection() {
  const { status, onSubmit } = useLeadForm(leadEndpoints.newsletter, "newsletter-blog");

  return (
    <section className="relative bg-white px-5 pt-24 tablet:pt-28">
      <div className="relative mx-auto max-w-[1160px]">
        <div className="relative overflow-hidden rounded-t-[40px] bg-[radial-gradient(90%_120%_at_0%_100%,#3d0b8a_0%,rgba(61,11,138,0)_60%),linear-gradient(120deg,#8443ea_0%,#9b5cf6_50%,#b07cff_100%)] px-6 pt-14 pb-14 text-white tablet:rounded-t-[56px] tablet:px-14 tablet:pt-16">
          <SparkleIcon className="mg-twinkle absolute top-10 right-[10%] size-6 text-white/60" />
          <SparkleIcon className="mg-twinkle absolute bottom-10 left-[46%] size-3 text-mg-mint [animation-delay:1.2s]" />
          <div className="grid items-center gap-8 desktop:grid-cols-[1fr_1.15fr]">
            <div className="flex items-center gap-5">
              <Magis pose="selfie" sizes="160px" className="mg-bob hidden w-[140px] shrink-0 tablet:block" />
              <div>
                <p className="text-[14px] font-semibold text-mg-mint">Inscreva-se gratuitamente</p>
                <h2 className="mt-2 text-[30px] font-bold leading-[1.1] tracking-[-0.02em] tablet:text-[38px]">
                  Participe da nossa newsletter
                </h2>
                <p className="mt-3 text-[16px] leading-[1.6] text-white/85">
                  Formação de professores, novidades da plataforma e materiais gratuitos direto no seu e-mail.
                </p>
              </div>
            </div>
            <form onSubmit={onSubmit} className="w-full">
              <div className="flex flex-col gap-2 rounded-[28px] bg-white p-2 shadow-[0_20px_40px_-20px_rgba(20,0,60,0.6)] tablet:flex-row tablet:rounded-full">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Seu melhor e-mail"
                  aria-label="Seu melhor e-mail"
                  className="min-h-[52px] flex-1 rounded-full bg-transparent px-5 text-[16px] text-mg-ink placeholder:text-mg-muted/70 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="min-h-[52px] rounded-full bg-mg-purple px-8 text-[16px] font-semibold text-white transition-colors duration-300 hover:bg-[#7433d9] disabled:opacity-70"
                >
                  {status === "sending" ? "Enviando…" : "Inscrever"}
                </button>
              </div>
              <p role="status" className="mt-3 px-4 text-[14px] text-white/90 empty:hidden">
                {status === "sent" ? "Inscrição confirmada! Até a próxima edição." : null}
                {status === "error" || status === "unconfigured" ? leadMessages[status] : null}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
