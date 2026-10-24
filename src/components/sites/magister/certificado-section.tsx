import Image from "next/image";
import { cn } from "@/lib/utils";
import { ASSETS, certificateLaws, links } from "./content";
import { whiteCta } from "./hero-section";
import { StarIcon } from "./icons";
import { Sparkle } from "./sparkle";
import { WaveDivider } from "./wave-divider";

interface CertificadoSectionProps {
  /** Certificate artwork; each track has its own colored version. */
  certificate?: string;
  /** The home tucks the section 46px into the arches on mobile; track pages keep desktop spacing. */
  variant?: "home" | "trilha";
}

export function CertificadoSection({
  certificate = `${ASSETS}/certificado.png`,
  variant = "home",
}: CertificadoSectionProps) {
  return (
    <>
      {/* The purple arches the certificate section grows out of. */}
      <WaveDivider className="bg-[#d6e8fa] bg-[url(/sites/magister/images/certificado-wave-bg.png)] bg-[position:top_center] tablet:bg-[position:0_0]" />

      <section
        className={cn(
          "relative bg-mg-primary pb-[95px]",
          variant === "home" && "-mt-[46px] pb-[60px] tablet:mt-0 tablet:pb-[95px]",
        )}
      >
        <div className="mx-auto flex max-w-[1140px] flex-col gap-5 tablet:flex-row">
          <div className="relative px-[10px] py-[10px] tablet:w-1/2">
            <Sparkle className="top-[67px] left-[484px] size-[30px]" delay={1000} />
            <Sparkle className="top-[272px] left-[-2px] size-[44px]" delay={500} />
            <Sparkle className="top-[447px] left-[-15px] size-[23px]" delay={800} />
            <div data-animate="fadeInLeft">
              <Image
                src={certificate}
                alt="Certificado de conclusão Sapion Magister em um tablet"
                width={1536}
                height={1465}
                sizes="(min-width: 768px) 540px, 100vw"
                className="mg-float-certificate h-auto w-full"
              />
            </div>
          </div>

          <div className="flex flex-col gap-5 px-[10px] py-[10px] tablet:w-1/2">
            <h2 className="text-[31px] font-bold leading-[1.2] text-white tablet:text-[40px] tablet:leading-[42px]">
              Certificado válido em todo o território nacional
            </h2>
            <p className="mt-[10px] text-[16px] font-semibold leading-[20px] text-white tablet:text-[18px]">
              Os certificados emitidos pela Sapion Magister se enquadram na categoria de cursos livres e estão de
              acordo com as principais leis vigentes:
            </p>
            <ul className="mt-[10px] flex flex-col gap-[6px]">
              {certificateLaws.map((law) => (
                <li key={law} className="flex items-center gap-[12px]">
                  <StarIcon className="size-[20px] shrink-0 fill-white" />
                  <span className="rounded-[5px] bg-[#89f09c] py-[5px] pr-[15px] pl-[5px] text-[14px] font-bold leading-[1.5] text-black tablet:text-[16px]">
                    {law}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5">
              <a href={links.signUp} className={whiteCta}>
                Teste por 14 dias grátis
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
