"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, CircleCheck, ChevronLeft, ExternalLink } from "lucide-react";
import { API_URL } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type UseCase = {
  image: string;
  title: string;
  description: string;
  layout?: "image_left" | "image_right";
};

type ExploreCardBlock = {
  title?: string;
  description?: string;
  features?: string[];
};

type ExploreSubsection = {
  title: string;
  slug: string;
  short_description?: string;
  description?: string;
  highlight?: string;
  key_benefits?: string[];
  primary_block?: ExploreCardBlock;
  secondary_block?: ExploreCardBlock;
  images?: string[];
  technologies?: string[];
  developers?: number[];
  use_cases?: UseCase[];
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
  explore?: ExploreSection;
};

type SubsectionApiResponse = {
  service_slug: string;
  service_title: string;
  explore_title?: string;
  subsection: ExploreSubsection;
};

type TeamMember = {
  id: number;
  name: string;
  role: string;
  department?: string;
  image?: string;
};

export default function GISExploreSubsectionPage() {
  const params = useParams();
  const serviceSlug = params.slug as string;
  const subsectionSlug = params.subsection as string;

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

  const [service, setService] = useState<GISService | null>(null);
  const [subsection, setSubsection] = useState<ExploreSubsection | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      try {
        setLoading(true);

        const [subRes, svcRes] = await Promise.all([
          fetch(`${API_URL}/api/gis-services/${serviceSlug}/${subsectionSlug}/`, {
            cache: "no-store",
          }),
          fetch(`${API_URL}/api/gis-services/${serviceSlug}/`, {
            cache: "no-store",
          }),
        ]);

        let subsectionData: ExploreSubsection | null = null;
        if (subRes.ok) {
          const data: SubsectionApiResponse = await subRes.json();
          subsectionData = data?.subsection || null;
          if (!cancelled) setSubsection(subsectionData);
        } else if (!cancelled) {
          setSubsection(null);
        }

        if (svcRes.ok) {
          const svc: GISService = await svcRes.json();
          if (!cancelled) setService(svc);
        } else if (!cancelled) {
          setService(null);
        }

        const devIds = Array.isArray(subsectionData?.developers) ? subsectionData!.developers! : [];
        if (devIds.length > 0) {
          const teamRes = await fetch(`${API_URL}/api/team/`, { cache: "no-store" });
          if (teamRes.ok) {
            const teamData: TeamMember[] = await teamRes.json();
            const filtered = teamData.filter((m) => devIds.includes(m.id));
            if (!cancelled) setTeam(filtered);
          } else if (!cancelled) {
            setTeam([]);
          }
        } else if (!cancelled) {
          setTeam([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (serviceSlug && subsectionSlug) run();

    return () => {
      cancelled = true;
    };
  }, [serviceSlug, subsectionSlug]);

  const exploreTitle = useMemo(() => {
    const title = service?.explore?.title;
    return typeof title === "string" && title.trim() ? title : service ? `Explore ${service.title}` : "Explore";
  }, [service]);

  const exploreSubsections = useMemo(() => {
    const subs = service?.explore?.subsections;
    return Array.isArray(subs) ? subs : [];
  }, [service]);

  const subsectionImages = useMemo(() => {
    const raw = Array.isArray(subsection?.images) ? subsection.images : [];
    const cleaned = raw.map((image) => getImageUrl(image, "")).filter(Boolean);
    return cleaned.length > 0 ? cleaned : [getImageUrl(service?.image || "", "/placeholder.svg")];
  }, [service, subsection]);

  const heroImage = subsectionImages[activeImageIndex] || getImageUrl(service?.image || "", "/placeholder.svg");

  const secondaryBlock = subsection?.secondary_block;
  const keyBenefits = Array.isArray(subsection?.key_benefits) ? subsection.key_benefits : [];
  const hasSecondaryBlock = Boolean(
    secondaryBlock?.title ||
    secondaryBlock?.description ||
    (secondaryBlock?.features?.length || 0) > 0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!subsection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Subsection not found</h1>
          <Link href={`/gis-services/${serviceSlug}`}>
            <Button>Back to GIS Service</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-emerald-50/20">
      <section className="relative w-full py-10 md:py-14">
        <div className="container px-4 md:px-6">
          <Link
            href={`/gis-services/${service?.slug || service?.id || serviceSlug}`}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-emerald-600 mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to {service?.title || serviceSlug}
          </Link>

          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <div className="relative h-48 md:h-72">
              <img src={heroImage} alt={subsection.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              {subsectionImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? subsectionImages.length - 1 : prev - 1))}
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white transition hover:bg-black/65"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImageIndex((prev) => (prev + 1) % subsectionImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white transition hover:bg-black/65"
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </>
              )}
              <div className="absolute left-6 bottom-6 right-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white">{subsection.title}</h1>
                {subsection.short_description && (
                  <p className="text-white/85 mt-2 max-w-2xl">{subsection.short_description}</p>
                )}
                {subsectionImages.length > 1 && (
                  <div className="mt-4 flex gap-2">
                    {subsectionImages.map((_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        className={`h-2.5 rounded-full transition-all ${index === activeImageIndex ? "w-8 bg-white" : "w-2.5 bg-white/50 hover:bg-white/80"}`}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full pb-16">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-10">
              {subsection.description && (
                <div>
                  <h2 className="text-2xl font-bold mb-3">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {subsection.description}
                  </p>
                </div>
              )}

              {subsection.highlight && (
                <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                  <p className="text-xl font-medium leading-relaxed text-foreground/90 border-l-4 border-emerald-600 pl-6 py-1 whitespace-pre-line">
                    {subsection.highlight}
                  </p>
                </div>
              )}

              {keyBenefits.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Key Benefits</h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {keyBenefits.map((benefit, idx) => (
                      <div key={`${benefit}-${idx}`} className="rounded-2xl border border-border/50 bg-background p-4 flex items-start gap-3 shadow-sm">
                        <CircleCheck className="size-4 text-emerald-600 mt-0.5 shrink-0" />
                        <p className="text-sm text-muted-foreground">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {(subsection.technologies?.length || 0) > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-3">Technicals</h2>
                  <div className="flex flex-wrap gap-2">
                    {subsection.technologies!.map((tech, idx) => (
                      <Badge key={idx} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {(team.length || 0) > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-4">Team Members</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {team.map((member) => (
                      <Card key={member.id} className="overflow-hidden border-border/40">
                        <CardContent className="p-0">
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
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {(subsection.use_cases?.length || 0) > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Use Cases</h2>
                  <div className="space-y-10">
                    {subsection.use_cases!.map((uc, idx) => {
                      const layout = uc.layout ?? (idx % 2 === 0 ? "image_left" : "image_right");
                      const isImageLeft = layout === "image_left";
                      return (
                        <motion.div
                          key={`${uc.title}-${idx}`}
                          initial={{ opacity: 0, y: 16 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4 }}
                          className="grid md:grid-cols-2 gap-8 items-center"
                        >
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
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {hasSecondaryBlock && (
                <div className="p-8 rounded-3xl bg-muted/30 border border-border/50 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 bg-emerald-500/5 rounded-full blur-3xl -mr-10 -mt-10" />
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">{secondaryBlock?.title || ""}</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed relative z-10">{secondaryBlock?.description || ""}</p>
                  <div className="flex flex-wrap gap-3 relative z-10">
                    {(secondaryBlock?.features || []).map((feature, idx) => (
                      <span key={`${feature}-${idx}`} className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1.5">
                        <CircleCheck className="size-3" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
            <div className="space-y-8 lg:sticky lg:top-24 h-fit">
              {exploreSubsections.length > 0 && (
                <div className="rounded-2xl border border-emerald-600/20 bg-white shadow-lg overflow-hidden">
                  <div className="px-5 py-4 border-b border-emerald-100 bg-white">
                    <h3 className="text-sm font-bold tracking-tight text-slate-900">
                      {exploreTitle}
                    </h3>
                  </div>
                  <div className="divide-y divide-emerald-100">
                    {exploreSubsections.map((sub) => {
                      const isActive = sub.slug === subsection.slug;
                      return (
                        <Link
                          key={sub.slug}
                          href={`/gis-services/${service?.slug || service?.id || serviceSlug}/${sub.slug}`}
                          className={`group flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-emerald-50 text-emerald-700"
                              : "text-slate-700 hover:bg-emerald-50 hover:text-emerald-700"
                          }`}
                        >
                          <span className="truncate">{sub.title}</span>
                          <ChevronRight className="size-4 text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border-2 border-emerald-500 bg-white p-6 shadow-xl">
                <div className="flex items-center justify-center mb-4">
                  <div className="size-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <ExternalLink className="size-5 text-emerald-700" />
                  </div>
                </div>

                <h3 className="text-center text-lg font-bold mb-2 text-foreground">
                  Need Expert Advice?
                </h3>
                <p className="text-center text-sm text-muted-foreground mb-6">
                  Our GIS specialists are available 24/7 to assist you.
                </p>

                <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800 rounded-xl">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}






