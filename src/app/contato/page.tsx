import { BlogHeader } from "@/components/sites/magister/blog/blog-ui";
import { ContactForm, FormCard } from "@/components/sites/magister/blog/lead-forms";
import { HighlightsSection, LeadLanding } from "@/components/sites/magister/blog/lead-landing";
import { blogMetadata } from "@/components/sites/magister/blog/metadata";
import { appScreens } from "@/components/sites/magister/home/home-content";
import { SiteShell } from "@/components/sites/magister/home/site-shell";
import { Magis, Mark, PhoneFrame, SparkleIcon } from "@/components/sites/magister/home/ui";

export const metadata = blogMetadata({
  title: "Contato",
  description:
    "Fale com a Sapion Magister: demonstração personalizada para sua escola ou rede, assinatura e suporte à plataforma.",
  path: "/contato",
});

const reasons = [
  "5 trilhas de aprendizagem e 31 cursos criados por 40 consultores especialistas;",
  "Análise de perfil com IA e cursos personalizados para cada professor;",
  "25 ferramentas de inteligência artificial no Magister Labs;",
  "Gamificação e comunidade no Magister Club para engajar a rede;",
  "Certificado válido em todo o território nacional;",
  "Cursos 100% online, no computador ou no aplicativo.",
];

export default function Page() {
  return (
    <SiteShell header={<BlogHeader />}>
      <LeadLanding
        eyebrow={
          <span className="inline-flex items-center gap-2 rounded-full border border-mg-purple/15 bg-white/80 px-4 py-2 text-[13px] font-semibold text-mg-purple">
            <SparkleIcon className="size-3.5" />
            Fale com a gente
          </span>
        }
        title={
          <>
            Leve a Sapion Magister para a sua <Mark>rede</Mark>
          </>
        }
        description={
          <p>
            Envie suas informações e um consultor entrará em contato para apresentar a plataforma e preparar uma
            demonstração personalizada para a sua escola, rede ou secretaria de educação.
          </p>
        }
        visual={
          <div className="relative mx-auto h-[360px] max-w-[440px] desktop:mx-0">
            <div className="absolute top-0 left-[4%] w-[44%] -rotate-[7deg]">
              <PhoneFrame {...appScreens.inicio} sizes="200px" className="mg-bob" />
            </div>
            <div className="absolute top-6 right-[6%] w-[44%] rotate-[7deg]">
              <PhoneFrame {...appScreens.ranking} sizes="200px" className="mg-bob-slow" />
            </div>
            <Magis pose="selfie" sizes="160px" className="mg-bob absolute bottom-[-30px] left-1/2 w-[34%] -translate-x-1/2" />
          </div>
        }
        form={
          <FormCard
            title="Solicite uma demonstração"
            description="Preencha os campos e nossa equipe retorna o contato para entender a necessidade da sua rede."
          >
            <ContactForm />
          </FormCard>
        }
      >
        <HighlightsSection title="Por que escolher a Sapion Magister?" items={reasons} />
      </LeadLanding>
    </SiteShell>
  );
}
