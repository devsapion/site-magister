"use client";

import { Check, ChevronDown, Download } from "lucide-react";
import { useState, type ReactNode, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { FreeMaterial } from "@/lib/magister/materials";
import { buttonStyles, inputClass } from "../home/ui";
import { leadEndpoints, leadMessages, useLeadForm } from "../home/use-lead-form";

const roles = [
  "Professor(a)",
  "Coordenador(a) pedagógico(a)",
  "Diretor(a)",
  "Secretário(a) de Educação",
  "Técnico(a) da secretaria",
  "Outro",
];

const interests = [
  "Levar a Sapion Magister para minha rede ou escola",
  "Assinar a plataforma como professor(a)",
  "Suporte para acessar a plataforma ou o aplicativo",
  "Parcerias e imprensa",
  "Outro assunto",
];

function Select({ children, className, ...props }: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <div className={cn("relative", className)}>
      <select {...props} className={cn(inputClass, "appearance-none pr-10 invalid:text-mg-muted/70")}>
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-mg-muted" />
    </div>
  );
}

/** Dark card that holds the lead forms on the material and contact pages. */
export function FormCard({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[32px] bg-[radial-gradient(120%_80%_at_100%_0%,rgba(155,92,246,0.55)_0%,rgba(155,92,246,0)_55%),linear-gradient(160deg,#2c0f73,#1a0b45)] p-6 text-white shadow-[0_40px_80px_-40px_rgba(26,11,69,0.9)] tablet:p-9">
      <h2 className="text-[22px] font-bold leading-tight">{title}</h2>
      <p className="mt-2 text-[15px] leading-[1.55] text-white/75">{description}</p>
      <div className="mt-6">{children}</div>
    </div>
  );
}

const submitClass = cn(buttonStyles.base, buttonStyles.mint, "mt-2 w-full py-[16px] disabled:opacity-70");

export function MaterialForm({ material }: { material: FreeMaterial }) {
  const { status, onSubmit } = useLeadForm(leadEndpoints.contact, `material-gratuito:${material.slug}`);
  const [institution, setInstitution] = useState<"sim" | "nao" | null>(null);
  const unlocked = status === "sent" || status === "unconfigured";

  if (unlocked) {
    return (
      <div className="mg-swap-in flex flex-col items-start gap-4">
        <span className="grid size-12 place-items-center rounded-full bg-mg-mint text-mg-ink">
          <Check className="size-6" strokeWidth={3} />
        </span>
        <p className="text-[20px] font-bold">Pronto! Seu material está liberado.</p>
        {material.fileUrl ? (
          <a href={material.fileUrl} target="_blank" rel="noopener noreferrer" className={cn(submitClass, "mt-0")}>
            <Download className="size-5" />
            Baixar agora
          </a>
        ) : (
          <p className="text-[15px] leading-[1.6] text-white/80">
            Enviamos o material para o e-mail que você informou. Confira também a caixa de spam.
          </p>
        )}
        {status === "unconfigured" && <p className="text-[13px] text-white/60">{leadMessages.unconfigured}</p>}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <input type="hidden" name="material" value={material.title} />
      <input name="nome" required placeholder="Seu nome completo" aria-label="Nome completo" autoComplete="name" className={inputClass} />
      <input name="email" type="email" required placeholder="Seu melhor e-mail" aria-label="E-mail" autoComplete="email" className={inputClass} />
      <input name="celular" type="tel" required placeholder="Seu celular" aria-label="Celular" autoComplete="tel" className={inputClass} />
      <fieldset className="mt-1">
        <legend className="text-[15px] font-semibold">Trabalho em uma instituição de ensino*</legend>
        <div className="mt-2 flex gap-2">
          {(["sim", "nao"] as const).map((value) => (
            <label
              key={value}
              className={cn(
                "flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[15px] transition-colors",
                institution === value ? "border-mg-mint bg-mg-mint text-mg-ink" : "border-white/25 hover:border-white/60",
              )}
            >
              <input
                type="radio"
                name="instituicao_ensino"
                value={value}
                required
                className="sr-only"
                onChange={() => setInstitution(value)}
              />
              {value === "sim" ? "Sim" : "Não"}
            </label>
          ))}
        </div>
      </fieldset>
      {institution === "sim" && (
        <div className="mg-swap-in grid gap-3">
          <input name="instituicao" required placeholder="Nome da instituição ou rede" aria-label="Nome da instituição ou rede" className={inputClass} />
          <Select name="cargo" required defaultValue="" aria-label="Cargo">
            <option value="" disabled>
              Seu cargo
            </option>
            {roles.map((role) => (
              <option key={role}>{role}</option>
            ))}
          </Select>
        </div>
      )}
      <button type="submit" disabled={status === "sending"} className={submitClass}>
        {status === "sending" ? "Enviando…" : "Baixar agora"}
      </button>
      {status === "error" && (
        <p role="status" className="text-[14px] text-white/85">
          {leadMessages.error}
        </p>
      )}
    </form>
  );
}

export function ContactForm() {
  const { status, onSubmit } = useLeadForm(leadEndpoints.contact, "pagina-contato");

  if (status === "sent") {
    return (
      <div className="mg-swap-in flex flex-col items-start gap-4">
        <span className="grid size-12 place-items-center rounded-full bg-mg-mint text-mg-ink">
          <Check className="size-6" strokeWidth={3} />
        </span>
        <p className="text-[20px] font-bold">Mensagem enviada!</p>
        <p className="text-[15px] leading-[1.6] text-white/80">
          Um consultor da Sapion Magister vai entrar em contato com você em breve.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 tablet:grid-cols-2">
      <input name="nome" required placeholder="Seu nome completo" aria-label="Nome completo" autoComplete="name" className={cn(inputClass, "tablet:col-span-2")} />
      <input name="email" type="email" required placeholder="Seu melhor e-mail" aria-label="E-mail" autoComplete="email" className={inputClass} />
      <input name="celular" type="tel" required placeholder="Seu celular" aria-label="Celular" autoComplete="tel" className={inputClass} />
      <input name="instituicao" required placeholder="Escola, rede ou órgão" aria-label="Escola, rede ou órgão" className={inputClass} />
      <Select name="tipo_instituicao" required defaultValue="" aria-label="Tipo da instituição">
        <option value="" disabled>
          Tipo da instituição
        </option>
        <option>Pública</option>
        <option>Privada</option>
      </Select>
      <Select name="interesse" required defaultValue="" aria-label="Interesse" className="tablet:col-span-2">
        <option value="" disabled>
          Como podemos ajudar?
        </option>
        {interests.map((interest) => (
          <option key={interest}>{interest}</option>
        ))}
      </Select>
      <textarea
        name="mensagem"
        rows={3}
        placeholder="Mensagem (opcional)"
        aria-label="Mensagem (opcional)"
        className={cn(inputClass, "tablet:col-span-2")}
      />
      <button type="submit" disabled={status === "sending"} className={cn(submitClass, "tablet:col-span-2")}>
        {status === "sending" ? "Enviando…" : "Solicitar contato"}
      </button>
      {(status === "error" || status === "unconfigured") && (
        <p role="status" className="text-[14px] text-white/85 tablet:col-span-2">
          {leadMessages[status]}
        </p>
      )}
    </form>
  );
}
