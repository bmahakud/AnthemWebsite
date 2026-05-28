"use client"
import { Footer } from "@/components/Footer";;

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CircleCheck, Mail, MapPin, Phone } from "lucide-react";
import { API_URL } from "@/lib/config";
import { Button } from "@/components/ui/button";

type GISService = {
  id: string;
  slug?: string;
  title: string;
  description: string;
  image: string;
  features?: string[];
};

function GISServiceCard({
  service,
  imageUrl,
}: {
  service: GISService;
  imageUrl: string;
}) {
  const featureList = Array.isArray(service.features) ? service.features.slice(0, 3) : [];

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={service.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <h2 className="text-lg font-bold tracking-tight text-slate-900 line-clamp-2">
            {service.title}
          </h2>
          <p className="text-sm leading-6 text-slate-600 line-clamp-4">
            {service.description}
          </p>
        </div>

        {featureList.length > 0 && (
          <div className="space-y-2">
            {featureList.map((feature) => (
              <div key={feature} className="flex items-start gap-2 text-xs text-slate-500">
                <CircleCheck className="mt-0.5 size-3.5 shrink-0 text-emerald-600" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        )}

        <Link
          href={`/gis-services/${service.slug || service.id}`}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
        >
          Learn More
          <ArrowRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}

export default function GISServicesPage() {
  const [services, setServices] = useState<GISService[]>([]);
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
    let cancelled = false;

    const run = async () => {
      try {
        const response = await fetch(`${API_URL}/api/gis-services/`, { cache: "no-store" });
        if (!response.ok) {
          if (!cancelled) setServices([]);
          return;
        }
        const data = await response.json();
        const list = Array.isArray(data) ? data : data?.results || [];
        if (!cancelled) setServices(list);
      } catch (error) {
        console.error("Error fetching GIS services:", error);
        if (!cancelled) setServices([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="border-b border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.10),_transparent_38%),linear-gradient(to_bottom,_#f8fffc,_#f8fafc)]">
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <div className="mx-auto max-w-3xl space-y-5">
            <h1 className="text-4xl font-bold tracking-tight text-emerald-700 md:text-5xl">
              GIS Services
            </h1>
            <p className="text-lg font-medium text-slate-700">
              Precision Geospatial Solutions
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
              From Photogrammetry to LiDAR, we deliver accurate, actionable geographic data for infrastructure, environment, and planning.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          {loading ? (
            <div className="py-20 text-center text-slate-500">Loading GIS services...</div>
          ) : services.length === 0 ? (
            <div className="py-20 text-center text-slate-500">No GIS services available.</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {services.map((service) => (
                <GISServiceCard
                  key={service.id}
                  service={service}
                  imageUrl={getImageUrl(service.image, "/placeholder.svg")}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
