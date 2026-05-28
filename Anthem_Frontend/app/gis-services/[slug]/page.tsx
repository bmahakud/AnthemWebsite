"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { ArrowLeft, ChevronRight, CircleCheck, Phone, Sparkles } from "lucide-react";
import { API_URL } from "@/lib/config";
import { Button } from "@/components/ui/button";

type UseCase = {
  image: string;
  title: string;
  description: string;
  layout?: "image_left" | "image_right";
};

type ExploreSubsection = {
  title: string;
  slug: string;
  short_description?: string;
  key_benefits?: string[];
  images?: string[];
  primary_block?: {
    title?: string;
    description?: string;
    features?: string[];
  };
};

type ExploreSection = {
  title: string;
  subsections: ExploreSubsection[];
};

type GISService = {
  id: string;
  slug?: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  long_description?: string;
  benefits?: string[];
  technologies?: string[];
  developers?: number[];
  use_cases?: UseCase[];
  explore?: ExploreSection;
};

type TeamMember = {
  id: number;
  name: string;
  role: string;
  image?: string;
};

function FeatureChip({ label }: { label: string }) {
  return (
    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1.5">
      <CircleCheck className="size-3" />
      {label}
    </span>
  );
}

export default function GISServiceDetailPage() {
  const params = useParams();
  const serviceId = params.slug as string;
  const [service, setService] = useState<GISService | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const sanitizeRemoteUrl = (value?: string | null) => {
    if (!value) return "";
    const trimmed = value.trim();
    return trimmed.replace(/^`+/, "").replace(/`+$/, "").trim();
  };

  const getImageUrl = (imagePath?: string | null, fallback = "/placeholder.svg") => {
    const cleaned = sanitizeRemoteUrl(imagePath);
    if (!cleaned) return fallback;
    if (cleaned.startsWith("http")) return cleaned;
    const normalized = cleaned.startsWith("/") ? cleaned : `/${cleaned}`;
    return `${API_URL}${normalized}`;
  };

  useEffect(() => {
    if (!serviceId) return;
    let cancelled = false;

    const run = async () => {
      try {
        const response = await fetch(`${API_URL}/api/gis-services/${serviceId}/`, { cache: "no-store" });
        if (!response.ok) {
          if (!cancelled) setService(null);
          return;
        }
        const data: GISService = await response.json();
        if (!cancelled) setService(data);

        const developerIds = Array.isArray(data.developers) ? data.developers : [];
        if (developerIds.length > 0) {
          const teamResponse = await fetch(`${API_URL}/api/team/`, { cache: "no-store" });
          if (teamResponse.ok) {
            const teamData: TeamMember[] = await teamResponse.json();
            if (!cancelled) setTeam(teamData.filter((member) => developerIds.includes(member.id)));
          } else if (!cancelled) {
            setTeam([]);
          }
        } else if (!cancelled) {
          setTeam([]);
        }
      } catch (error) {
        console.error("Error fetching GIS service:", error);
        if (!cancelled) setService(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [serviceId]);

  const heroImage = useMemo(() => getImageUrl(service?.image, "/placeholder.svg"), [service]);
  const previewImages = useMemo(() => {
    const useCaseImages = Array.isArray(service?.use_cases)
      ? service!.use_cases!.map((item) => getImageUrl(item.image, "")).filter(Boolean)
      : [];
    return [heroImage, ...useCaseImages].filter((value, index, arr) => arr.indexOf(value) === index).slice(0, 2);
  }, [heroImage, service]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading GIS service...</div>;
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">GIS Service Not Found</h1>
          <Link href="/gis-services"><Button>Back to GIS Services</Button></Link>
        </div>
      </div>
    );
  }

  const exploreTitle = service.explore?.title?.trim() || `Explore ${service.title}`;
  const exploreSubsections = Array.isArray(service.explore?.subsections) ? service.explore!.subsections! : [];
  const firstExploreSubsection = exploreSubsections[0];
  const primaryBlock = firstExploreSubsection?.primary_block;
  const primaryBlockHasContent = Boolean(
    primaryBlock?.title ||
    primaryBlock?.description ||
    (primaryBlock?.features?.length || 0) > 0
  );
  const serviceCardTitle = primaryBlockHasContent ? (primaryBlock?.title || service.title) : service.title;
  const serviceCardDescription = primaryBlockHasContent
    ? (primaryBlock?.description || service.description)
    : service.description;
  const serviceCardFeatures =
    primaryBlockHasContent && (primaryBlock?.features?.length || 0) > 0
      ? primaryBlock!.features!
      : service.features || [];

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="w-full py-10 md:py-14">
        <div className="container px-4 md:px-6">
          <Link
            href="/gis-services"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-emerald-600 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to GIS Services
          </Link>

          <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-emerald-600/10 bg-black">
            <div className="relative h-56 md:h-80 lg:h-[26rem]">
              <img src={heroImage} alt={service.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">{service.title}</h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full pb-16">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-10">
              <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                <p className="text-xl font-medium leading-relaxed text-foreground/90 border-l-4 border-emerald-500 pl-6 py-1 m-0 whitespace-pre-line">
                  {service.long_description || service.description}
                </p>
              </div>

              {previewImages.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6">
                  {previewImages.map((src, idx) => (
                    <div key={`${src}-${idx}`} className="group relative aspect-video rounded-2xl overflow-hidden shadow-lg border border-border/50">
                      <img src={src} alt={`LiDAR visualization ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              )}

              {(service.benefits?.length || 0) > 0 && (
                <div className="p-8 rounded-3xl bg-muted/30 border border-border/50 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10" />
                  <div className="relative z-10">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">Key Benefits</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {service.benefits!.map((benefit, idx) => (
                        <div key={`${benefit}-${idx}`} className="flex items-start gap-3">
                          <CircleCheck className="size-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {(team.length || 0) > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Team Members</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {team.map((member) => (
                      <div key={member.id} className="overflow-hidden rounded-2xl border border-border/40 bg-white shadow-sm">
                        <div className="h-28 bg-muted overflow-hidden">
                          <img
                            src={getImageUrl(member.image || "", "/placeholder.svg")}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <div className="font-semibold text-sm">{member.name}</div>
                          <div className="text-xs text-muted-foreground">{member.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {(service.use_cases?.length || 0) > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Use Cases</h2>
                  <div className="space-y-10">
                    {service.use_cases!.map((uc, idx) => {
                      const layout = uc.layout ?? (idx % 2 === 0 ? "image_left" : "image_right");
                      const isImageLeft = layout === "image_left";
                      return (
                        <div key={`${uc.title}-${idx}`} className="grid md:grid-cols-2 gap-8 items-center">
                          <div className={isImageLeft ? "order-1" : "order-2"}>
                            <div className="rounded-2xl overflow-hidden border border-border/50 bg-muted shadow-lg">
                              <img
                                src={getImageUrl(uc.image, "/placeholder.svg")}
                                alt={uc.title}
                                className="w-full h-64 md:h-80 object-cover"
                              />
                            </div>
                          </div>
                          <div className={isImageLeft ? "order-2" : "order-1"}>
                            <h3 className="text-xl font-bold mb-2">{uc.title}</h3>
                            <p className="text-muted-foreground whitespace-pre-line">{uc.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="p-8 rounded-3xl bg-muted/30 border border-border/50 backdrop-blur-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-12 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10" />
                <h2 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">{serviceCardTitle}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed relative z-10">{serviceCardDescription}</p>
                <div className="flex flex-wrap gap-3 relative z-10">
                  {serviceCardFeatures.map((feature, idx) => (
                    <FeatureChip key={`${feature}-${idx}`} label={feature} />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-8 lg:sticky lg:top-24">
              {exploreSubsections.length > 0 && (
                <div className="rounded-lg bg-card border-0 shadow-2xl overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white">
                  <div className="flex flex-col space-y-1.5 p-6 border-b border-white/20 pb-4 bg-black/10 backdrop-blur-sm">
                    <div className="tracking-tight text-lg font-bold flex items-center gap-2">
                      <Sparkles className="size-5 text-yellow-300" />
                      {exploreTitle}
                    </div>
                  </div>
                  <div className="p-0">
                    <nav className="flex flex-col">
                      {exploreSubsections.map((sub) => (
                        <Link
                          key={sub.slug}
                          href={`/gis-services/${service.slug || service.id}/${sub.slug}`}
                          className="group relative flex items-center justify-between p-4 border-b border-white/20 last:border-0 text-sm font-medium transition-all duration-300 hover:pl-6 hover:bg-white/20 hover:backdrop-blur-md"
                        >
                          <span className="relative z-10 flex items-center gap-2">
                            <span className="absolute left-0 w-1 h-0 bg-yellow-300 group-hover:h-6 transition-all duration-300" />
                            {sub.title}
                          </span>
                          <ChevronRight className="size-4 text-white/70 group-hover:translate-x-1 group-hover:text-yellow-300 transition-all duration-300" />
                        </Link>
                      ))}
                    </nav>
                  </div>
                </div>
              )}

              <div className="rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 p-1 shadow-xl">
                <div className="bg-background/90 backdrop-blur-sm rounded-xl p-6 text-center h-full">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white shadow-lg animate-pulse">
                    <Phone className="size-7" />
                  </div>
                  <h4 className="font-bold text-lg mb-2 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Need Expert Advice?
                  </h4>
                  <p className="text-sm text-muted-foreground mb-6">
                    Our LiDAR specialists are available 24/7 to assist you.
                  </p>
                  <Link href="/contact">
                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}










