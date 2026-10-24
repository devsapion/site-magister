"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CloseIcon } from "./icons";

const field =
  "min-h-[47px] w-full rounded-[5px] bg-white px-[16px] py-[6px] text-[16px] leading-[1.4] text-mg-gray placeholder:text-[#a0a0a0] focus:outline-none";

// The source form posts to WordPress (admin-ajax). Set NEXT_PUBLIC_CONTACT_ENDPOINT to a URL that
// accepts a JSON POST to receive submissions from this clone.
const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;

type Status = "idle" | "sending" | "sent" | "error" | "unconfigured";

/** "Leve para sua escola ou órgão" button and the contact popup it opens (Elementor popup 2854). */
export function ContactPopup() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!endpoint) {
      setStatus("unconfigured");
      return;
    }
    setStatus("sending");
    try {
      const data = Object.fromEntries(new FormData(event.currentTarget));
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(String(response.status));
      event.currentTarget?.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setStatus("idle");
          setOpen(true);
        }}
        className="inline-block rounded-[10px] border border-white bg-mg-secondary px-[24px] py-[12px] text-[16px] font-bold leading-none text-mg-violet transition-all duration-300 hover:border-mg-secondary tablet:text-[18px]"
      >
        Leve para sua escola ou órgão
      </button>

      {open && (
        <div
          className="mg-popup-in fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/80"
          onClick={() => setOpen(false)}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mg-contact-title"
            className="relative m-[20px] w-[640px] max-w-[calc(100%-40px)] p-[10px] tablet:m-0 tablet:max-w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Fechar"
              onClick={() => setOpen(false)}
              className="absolute top-[34px] right-[8%] z-10 text-[30px] text-mg-secondary"
            >
              <CloseIcon className="size-[1em] fill-current" />
            </button>
            <div className="flex flex-col rounded-[10px] bg-mg-violet px-[25px] py-[50px] text-left">
              <h2 id="mg-contact-title" className="mb-[10px] text-[30px] font-bold leading-none text-mg-secondary">
                Contato
              </h2>
              <p className="mb-5 font-roboto text-[18px] leading-[22px] text-white">
                Transforme a educação com um simples passo! Complete o formulário abaixo e dê início à uma
                incrível jornada. Nossa equipe entrará em contato com você o mais rápido possível.
              </p>
              <form onSubmit={onSubmit} className="-mx-[7.5px] flex flex-wrap">
                <div className="mb-[15px] w-full px-[7.5px]">
                  <input name="name" required placeholder="Nome" aria-label="Nome" className={field} />
                </div>
                <div className="mb-[15px] w-full px-[7.5px] tablet:w-1/2">
                  <input name="email" type="email" required placeholder="E-mail" aria-label="E-mail" className={field} />
                </div>
                <div className="mb-[15px] w-full px-[7.5px] tablet:w-1/2">
                  <input name="phone" type="tel" required placeholder="Telefone" aria-label="Telefone" className={field} />
                </div>
                <div className="mb-[15px] w-full px-[7.5px] tablet:w-1/2">
                  <input name="organization" required placeholder="Nome do órgão" aria-label="Nome do órgão" className={field} />
                </div>
                <div className="mb-[15px] w-full px-[7.5px] tablet:w-1/2">
                  <input name="department" required placeholder="Departamento" aria-label="Departamento" className={field} />
                </div>
                <div className="mb-[15px] w-full px-[7.5px]">
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Mensagem (opcional)"
                    aria-label="Mensagem (opcional)"
                    className={field}
                  />
                </div>
                <div className="w-full px-[7.5px]">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full rounded-[10px] bg-mg-secondary p-[20px] text-[15px] font-medium leading-none text-black transition-colors duration-300 hover:bg-[#7ce68e] disabled:opacity-70"
                  >
                    Enviar
                  </button>
                </div>
                <p role="status" className="mt-[10px] w-full px-[7.5px] text-[14px] text-white empty:hidden">
                  {status === "sent" && "Mensagem enviada com sucesso!"}
                  {status === "error" && "Não foi possível enviar sua mensagem. Tente novamente."}
                  {status === "unconfigured" && "O envio deste formulário ainda não está configurado."}
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
