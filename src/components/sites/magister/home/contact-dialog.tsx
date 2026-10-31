"use client";

import { useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { CloseIcon } from "../icons";
import { inputClass as field, Magis } from "./ui";
import { leadEndpoints, leadMessages, useLeadForm } from "./use-lead-form";

/** "Leve para sua escola ou órgão": a trigger button plus the contact form dialog it opens. */
export function ContactDialog({ className, children }: { className?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { status, onSubmit, reset } = useLeadForm(leadEndpoints.contact, "popup-leve-para-sua-rede");

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          reset();
          setOpen(true);
        }}
        className={className}
      >
        {children}
      </button>

      {/*
        Portaled to <body>: triggers sit inside animated (transformed) and overflow-hidden blocks,
        which would otherwise trap this fixed overlay inside them.
      */}
      {open &&
        createPortal(
          <div
            className="mg-popup-in fixed inset-0 z-[9999] flex overflow-y-auto bg-mg-night/60 px-4 pt-24 pb-6 font-lexend text-mg-ink backdrop-blur-sm"
            onClick={() => setOpen(false)}
            role="presentation"
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="mg-contact-title"
              className="mg-swap-in relative m-auto w-full max-w-[600px] rounded-[32px] bg-white p-6 text-left shadow-[0_40px_80px_-30px_rgba(26,11,69,0.6)] tablet:p-10"
              onClick={(event) => event.stopPropagation()}
            >
              <Magis
                pose="piscando"
                sizes="120px"
                className="pointer-events-none absolute -top-[72px] right-6 w-[110px] tablet:-top-[86px] tablet:w-[130px]"
              />
              <button
                type="button"
                aria-label="Fechar"
                onClick={() => setOpen(false)}
                className="absolute top-5 right-5 z-10 grid size-10 place-items-center rounded-full bg-mg-lilac text-mg-purple transition-colors hover:bg-mg-line"
              >
                <CloseIcon className="size-4 fill-current" />
              </button>
              <h2 id="mg-contact-title" className="pr-12 text-[28px] font-bold leading-tight text-mg-ink">
                Leve a Sapion Magister para sua rede
              </h2>
              <p className="mt-3 mb-6 text-[16px] leading-[1.6] text-mg-muted">
                Transforme a educação com um simples passo! Complete o formulário e nossa equipe entrará em contato
                com você o mais rápido possível.
              </p>
              <form onSubmit={onSubmit} className="grid gap-3 tablet:grid-cols-2">
                <input name="name" required placeholder="Nome" aria-label="Nome" className={cn(field, "tablet:col-span-2")} />
                <input name="email" type="email" required placeholder="E-mail" aria-label="E-mail" className={field} />
                <input name="phone" type="tel" required placeholder="Telefone" aria-label="Telefone" className={field} />
                <input name="organization" required placeholder="Nome do órgão" aria-label="Nome do órgão" className={field} />
                <input name="department" required placeholder="Departamento" aria-label="Departamento" className={field} />
                <textarea
                  name="message"
                  rows={3}
                  placeholder="Mensagem (opcional)"
                  aria-label="Mensagem (opcional)"
                  className={cn(field, "tablet:col-span-2")}
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="rounded-full bg-mg-purple py-4 text-[16px] font-semibold text-white transition-colors duration-300 hover:bg-[#7433d9] disabled:opacity-70 tablet:col-span-2"
                >
                  {status === "sending" ? "Enviando…" : "Enviar"}
                </button>
                <p role="status" className="text-[14px] text-mg-muted empty:hidden tablet:col-span-2">
                  {status !== "idle" && status !== "sending" && leadMessages[status]}
                </p>
              </form>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
