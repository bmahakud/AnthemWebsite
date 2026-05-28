"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Save, RotateCcw, Monitor, Video, Building2,
  CheckCircle2, Eye, Edit3, Sparkles, Upload, Loader2,
  AlertCircle, Trash2, ChevronUp, ChevronDown, Play, Check, Clock, ImageIcon
} from "lucide-react";
import {
  getCachedConfig, fetchSiteConfig, saveSiteConfigText,
  DEFAULT_SITE_CONFIG, type SiteConfig,
  fetchHeroVideos, uploadHeroVideo, updateHeroVideo, deleteHeroVideo,
  type HeroVideoItem,
} from "@/lib/site-config";

interface SiteModifierProps {
  open: boolean;
  onClose: () => void;
}

export default function SiteModifier({ open, onClose }: SiteModifierProps) {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState(0);

  // ── Video library state ────────────────────────────────────────────
  const [videos, setVideos] = useState<HeroVideoItem[]>([]);
  const [cleanVideos, setCleanVideos] = useState<HeroVideoItem[]>([]);
  const [videosLoading, setVideosLoading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [previewId, setPreviewId] = useState<number | null>(null);
  const uploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setSaved(false); setError(null); setVideoError(null);
      fetchSiteConfig().then(setConfig).catch(() => setConfig(getCachedConfig()));
      loadVideos();
    }
  }, [open]);

  async function loadVideos() {
    setVideosLoading(true);
    try { 
      const fetched = await fetchHeroVideos(false);
      // Initialize order if not set
      fetched.forEach((v, i) => { if (!v.order) v.order = i; });
      setVideos(fetched);
      setCleanVideos(fetched);
    }
    catch { setVideoError("Could not load media."); }
    finally { setVideosLoading(false); }
  }

  // ── Text save ────────────────────────────────────────────────────
  const handleSaveText = async () => {
    setSaving(true); setError(null);
    try {
      await saveSiteConfigText({
        company_name: config.company_name,
        hero_heading: config.hero_heading,
        hero_highlight: config.hero_highlight,
        hero_subheading: config.hero_subheading,
      });
      setSaved(true); setTimeout(() => setSaved(false), 3000);
    } catch (e: any) { setError(e?.message ?? "Save failed."); }
    finally { setSaving(false); }
  };

  // ── Media save ───────────────────────────────────────────────────
  const handleSaveMedia = async () => {
    setSaving(true); setError(null); setVideoError(null);
    try {
      const promises = videos.map(v => {
        const clean = cleanVideos.find(c => c.id === v.id);
        if (!clean || clean.title !== v.title || clean.duration !== v.duration || clean.is_selected !== v.is_selected || clean.order !== v.order) {
          return updateHeroVideo(v.id, {
            title: v.title,
            duration: v.duration,
            is_selected: v.is_selected,
            order: v.order
          });
        }
        return Promise.resolve(null);
      });
      await Promise.all(promises);
      
      await loadVideos();
      setSaved(true); setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setVideoError(err?.message ?? "Failed to save media changes.");
    } finally {
      setSaving(false);
    }
  };

  // ── Upload new video/image ────────────────────────────────────────
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploadingVideo(true); setVideoError(null);
    try {
      const v = await uploadHeroVideo(file, file.name.replace(/\.[^.]+$/, ""), 8);
      // Give it an order at the end
      v.order = videos.length;
      setVideos(prev => [...prev, v]);
      setCleanVideos(prev => [...prev, v]);
    } catch (err: any) { setVideoError(err?.message ?? "Upload failed."); }
    finally { setUploadingVideo(false); if (uploadRef.current) uploadRef.current.value = ""; }
  };

  // ── Toggle selected ───────────────────────────────────────────────
  const toggleSelect = (v: HeroVideoItem) => {
    const newVal = !v.is_selected;
    setVideos(prev => {
      const selected = prev.filter(x => x.is_selected && x.id !== v.id);
      const maxOrder = selected.length > 0 ? Math.max(...selected.map(x => x.order)) : -1;
      return prev.map(x => {
        if (x.id === v.id) {
          return { ...x, is_selected: newVal, order: newVal ? maxOrder + 1 : x.order };
        }
        return x;
      });
    });
  };

  // ── Update duration ──────────────────────────────────────────────
  const updateDuration = (v: HeroVideoItem, dur: number) => {
    if (isNaN(dur) || dur < 1) return;
    setVideos(prev => prev.map(x => x.id === v.id ? { ...x, duration: dur } : x));
  };

  // ── Reorder selected videos ──────────────────────────────────────
  const moveOrder = (id: number, dir: -1 | 1) => {
    const selected = videos.filter(v => v.is_selected).sort((a, b) => a.order - b.order);
    const idx = selected.findIndex(v => v.id === id);
    if (idx < 0) return;
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= selected.length) return;
    // Swap orders
    const a = selected[idx], b = selected[newIdx];
    const updates: HeroVideoItem[] = videos.map(v => {
      if (v.id === a.id) return { ...v, order: b.order };
      if (v.id === b.id) return { ...v, order: a.order };
      return v;
    });
    setVideos(updates);
  };

  // ── Delete video ─────────────────────────────────────────────────
  const handleDelete = async (v: HeroVideoItem) => {
    if (!window.confirm(`Delete "${v.title || "this media"}"? This cannot be undone.`)) return;
    setVideos(prev => prev.filter(x => x.id !== v.id));
    setCleanVideos(prev => prev.filter(x => x.id !== v.id));
    try { await deleteHeroVideo(v.id); }
    catch { setVideoError("Delete failed."); await loadVideos(); }
  };

  const selectedVideos = videos.filter(v => v.is_selected).sort((a, b) => a.order - b.order);

  // Derive display order (1-based index) for all videos to show on the card
  const getOrderBadge = (v: HeroVideoItem) => {
    if (!v.is_selected) return null;
    const idx = selectedVideos.findIndex(sv => sv.id === v.id);
    return idx >= 0 ? idx + 1 : null;
  };

  const GROUPS = [
    { label: "Branding", icon: Building2 },
    { label: "Hero Text", icon: Monitor },
    { label: "Media", icon: Video },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]" />

          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 60, scale: 0.97 }}
            transition={{ type: "spring", damping: 26, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-xl bg-white shadow-2xl z-[201] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-sm">Site Modifier</h2>
                  <p className="text-white/40 text-xs">Live homepage editor · synced to cloud</p>
                </div>
              </div>
              <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Info bar */}
            <div className="bg-amber-50 border-b border-amber-100 px-6 py-2 flex items-center gap-2 shrink-0">
              <Eye className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <p className="text-xs text-amber-700 font-medium">Remember to click "Save" to apply changes to the website.</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 bg-gray-50 shrink-0 px-4 gap-1 pt-2">
              {GROUPS.map((g, i) => {
                const Icon = g.icon;
                return (
                  <button key={g.label} onClick={() => setActiveGroup(i)}
                    className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-t-lg border-b-2 transition-all whitespace-nowrap
                      ${activeGroup === i ? "border-primary text-primary bg-white" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                    <Icon className="w-3.5 h-3.5" />{g.label}
                    {i === 2 && selectedVideos.length > 0 && (
                      <span className="bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{selectedVideos.length}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-5">
              <AnimatePresence mode="wait">
                <motion.div key={activeGroup} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }} className="space-y-5">

                  {/* ── Branding ── */}
                  {activeGroup === 0 && (
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                        <Edit3 className="w-3 h-3 text-gray-400" /> Company Name
                      </label>
                      <p className="text-[11px] text-gray-400">Shown in the top navigation bar logo.</p>
                      <input type="text" value={config.company_name}
                        onChange={e => setConfig(p => ({ ...p, company_name: e.target.value }))}
                        placeholder="e.g. Anthem Global"
                        className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-gray-300 transition-all" />
                    </div>
                  )}

                  {/* ── Hero Text ── */}
                  {activeGroup === 1 && (
                    <>
                      {[
                        { key: "hero_heading" as const, label: "Main Heading", desc: "First part of the large hero headline.", ph: "e.g. Your Vision, Our", ta: false },
                        { key: "hero_highlight" as const, label: "Highlighted Word", desc: "The gradient-coloured word.", ph: "e.g. Technology", ta: false },
                        { key: "hero_subheading" as const, label: "Sub-heading", desc: "Descriptive line below the headline.", ph: "e.g. From Vision to Reality…", ta: true },
                      ].map(f => (
                        <div key={f.key} className="space-y-1.5">
                          <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
                            <Edit3 className="w-3 h-3 text-gray-400" />{f.label}
                          </label>
                          <p className="text-[11px] text-gray-400">{f.desc}</p>
                          {f.ta ? (
                            <textarea value={config[f.key]} onChange={e => setConfig(p => ({ ...p, [f.key]: e.target.value }))}
                              placeholder={f.ph} rows={3}
                              className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-gray-300 resize-none transition-all" />
                          ) : (
                            <input type="text" value={config[f.key]} onChange={e => setConfig(p => ({ ...p, [f.key]: e.target.value }))}
                              placeholder={f.ph}
                              className="w-full px-3 py-2.5 text-sm rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary placeholder:text-gray-300 transition-all" />
                          )}
                        </div>
                      ))}
                      {/* Live preview */}
                      <div className="rounded-xl bg-gradient-to-br from-slate-900 to-blue-950 p-5 space-y-2">
                        <p className="text-[10px] text-white/40 font-medium uppercase tracking-widest">Live Preview</p>
                        <h1 className="text-white font-bold text-xl leading-tight">
                          {config.hero_heading}{" "}
                          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{config.hero_highlight}</span>
                        </h1>
                        <p className="text-white/70 text-xs">{config.hero_subheading}</p>
                      </div>
                    </>
                  )}

                  {/* ── Hero Media (Videos & Images) ── */}
                  {activeGroup === 2 && (
                    <>
                      {/* Upload button */}
                      <div>
                        <input ref={uploadRef} type="file" accept="video/mp4,video/webm,image/*" className="hidden" onChange={handleUpload} />
                        <button onClick={() => uploadRef.current?.click()} disabled={uploadingVideo}
                          className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-200 hover:border-primary/50 rounded-xl py-4 text-sm text-gray-500 hover:text-primary transition-all hover:bg-primary/5 disabled:opacity-50">
                          {uploadingVideo ? <><Loader2 className="w-4 h-4 animate-spin" />Uploading to Spaces…</> : <><Upload className="w-4 h-4" />Upload New Video / Image</>}
                        </button>
                      </div>

                      {videoError && (
                        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <p className="text-xs text-red-600">{videoError}</p>
                        </div>
                      )}

                      {/* Selected slideshow order */}
                      {selectedVideos.length > 0 && (
                        <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-xl p-4">
                          <p className="text-[10px] text-white/40 font-medium uppercase tracking-widest mb-3">Slideshow Order</p>
                          <div className="space-y-2">
                            {selectedVideos.map((v, i) => (
                              <div key={v.id} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2">
                                <span className="w-6 h-6 rounded-full bg-primary/80 text-white text-xs flex items-center justify-center font-bold shrink-0">{i + 1}</span>
                                {v.media_type === "image" ? <ImageIcon className="w-4 h-4 text-white/60 shrink-0" /> : <Video className="w-4 h-4 text-white/60 shrink-0" />}
                                <span className="text-white text-xs font-medium truncate flex-1">{v.title || `Media ${v.id}`}</span>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-white/50" />
                                  <input type="number" min={1} max={60} value={v.duration}
                                    onChange={e => updateDuration(v, parseInt(e.target.value))}
                                    className="w-10 bg-white/20 text-white text-xs text-center rounded px-1 py-0.5 border border-white/20 focus:outline-none focus:border-white/60" />
                                  <span className="text-white/50 text-[10px]">s</span>
                                </div>
                                <div className="flex flex-col gap-0.5">
                                  <button onClick={() => moveOrder(v.id, -1)} disabled={i === 0}
                                    className="text-white/60 hover:text-white disabled:opacity-20 transition-colors"><ChevronUp className="w-3 h-3" /></button>
                                  <button onClick={() => moveOrder(v.id, 1)} disabled={i === selectedVideos.length - 1}
                                    className="text-white/60 hover:text-white disabled:opacity-20 transition-colors"><ChevronDown className="w-3 h-3" /></button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Library grid */}
                      <div>
                        <p className="text-xs font-semibold text-gray-500 mb-3">Media Library ({videos.length})</p>
                        {videosLoading ? (
                          <div className="flex items-center justify-center py-8 text-gray-400 text-sm gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />Loading…
                          </div>
                        ) : videos.length === 0 ? (
                          <div className="text-center py-8 text-gray-400 text-sm">No media yet. Upload one above.</div>
                        ) : (
                          <div className="grid grid-cols-2 gap-3">
                            {videos.map(v => {
                              const orderNum = getOrderBadge(v);
                              return (
                                <div key={v.id} className={`relative rounded-xl overflow-hidden border-2 transition-all cursor-pointer
                                  ${v.is_selected ? "border-primary shadow-lg shadow-primary/20" : "border-gray-200 hover:border-gray-300"}`}>

                                  {/* Preview */}
                                  <div className="relative aspect-video bg-black group" onClick={() => setPreviewId(previewId === v.id ? null : v.id)}>
                                    {v.media_type === "image" && v.image_url ? (
                                      <img src={v.image_url} className="w-full h-full object-cover opacity-80" alt={v.title} />
                                    ) : v.media_type === "video" && v.video_url ? (
                                      <video src={v.video_url} className="w-full h-full object-cover opacity-80"
                                        muted loop autoPlay={previewId === v.id} playsInline />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <Video className="w-6 h-6 text-gray-500" />
                                      </div>
                                    )}
                                    {v.media_type === "video" && (
                                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Play className="w-6 h-6 text-white" />
                                      </div>
                                    )}
                                    {v.media_type === "image" && (
                                      <div className="absolute top-1 left-1 bg-black/50 p-1 rounded">
                                        <ImageIcon className="w-3 h-3 text-white" />
                                      </div>
                                    )}
                                  </div>

                                  {/* Card footer */}
                                  <div className="bg-white px-2 py-1.5 space-y-1.5">
                                    <input type="text" value={v.title}
                                      onChange={e => { const t = e.target.value; setVideos(p => p.map(x => x.id === v.id ? { ...x, title: t } : x)); }}
                                      placeholder="Label…"
                                      className="w-full text-[11px] font-medium text-gray-700 bg-transparent border-b border-gray-100 focus:outline-none focus:border-primary pb-0.5" />

                                    <div className="flex items-center justify-between gap-1">
                                      {/* Select toggle */}
                                      <button onClick={() => toggleSelect(v)}
                                        className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full transition-all flex-1 justify-center
                                          ${v.is_selected ? "bg-primary text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200"}`}>
                                        {v.is_selected ? <><Check className="w-2.5 h-2.5" />Selected</> : "Select"}
                                      </button>

                                      {/* Delete */}
                                      <button onClick={() => handleDelete(v)}
                                        className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all shrink-0">
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>

                                  {/* Selected badge */}
                                  {v.is_selected && orderNum !== null && (
                                    <div className="absolute top-1 right-1 bg-primary rounded-full min-w-[1.25rem] h-5 px-1 flex items-center justify-center shadow">
                                      <span className="text-white text-[10px] font-bold">#{orderNum}</span>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Error */}
            {error && (
              <div className="mx-6 mb-2 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <p className="text-xs text-red-600">{error}</p>
              </div>
            )}

            {/* Footer */}
            <div className="shrink-0 border-t border-gray-100 px-6 py-3 flex items-center justify-between bg-gray-50">
              <button onClick={() => { if (window.confirm("Reset text fields to defaults?")) setConfig(DEFAULT_SITE_CONFIG); }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all font-medium">
                <RotateCcw className="w-3.5 h-3.5" />Reset text
              </button>

              <motion.button 
                onClick={activeGroup === 2 ? handleSaveMedia : handleSaveText} 
                disabled={saving} 
                whileTap={{ scale: 0.96 }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-md disabled:opacity-60
                  ${saved ? "bg-emerald-500 text-white" : "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-purple-300 hover:shadow-lg"}`}>
                {saving ? <><Loader2 className="w-4 h-4 animate-spin" />Saving…</> : saved ? <><CheckCircle2 className="w-4 h-4" />Saved!</> : <><Save className="w-4 h-4" />Save</>}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
