"use client";

import { useState, type FormEvent } from "react";

export type LeadStatus = "idle" | "sending" | "sent" | "error" | "unconfigured";

/**
 * Endpoints receive a JSON POST with the form fields plus `origem`. Set them in the environment:
 * NEXT_PUBLIC_CONTACT_ENDPOINT (contact, demo requests and material downloads) and
 * NEXT_PUBLIC_NEWSLETTER_ENDPOINT (newsletter sign-ups).
 */
export const leadEndpoints = {
  contact: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT,
  newsletter: process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT,
};

export const leadMessages: Record<Exclude<LeadStatus, "idle" | "sending">, string> = {
  sent: "Mensagem enviada com sucesso!",
  error: "Não foi possível enviar. Tente novamente.",
  unconfigured: "O envio deste formulário ainda não está configurado.",
};

/** Submits a form as JSON to `endpoint` and tracks the request status. */
export function useLeadForm(endpoint: string | undefined, origem: string) {
  const [status, setStatus] = useState<LeadStatus>("idle");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!endpoint) {
      setStatus("unconfigured");
      return;
    }
    const form = event.currentTarget;
    setStatus("sending");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(new FormData(form)), origem }),
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return { status, onSubmit, reset: () => setStatus("idle") };
}
