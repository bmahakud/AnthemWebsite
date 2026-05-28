"use client";

import { API_URL } from "@/lib/config";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";

const cleanText = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export default function AdminPrivateProjectsNewPage() {
  const router = useRouter();
  const auth = useAuth();

  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("planned");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [timeline, setTimeline] = useState("");
  const [instructions, setInstructions] = useState("");

  const canSave = useMemo(() => !saving && cleanText(title).length > 0, [saving, title]);

  const createPlan = useCallback(async () => {
    const project_name = cleanText(title);
    if (!project_name) return;
    setSaving(true);
    try {
      const res = await auth.authFetch(`${API_URL}/api/private-projects/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_name,
          status: status || "planned",
          start_date: startDate || undefined,
          end_date: endDate || undefined,
          timeline: cleanText(timeline),
          // Map "Instructions / Work Plan" to the plan description field used by backend.
          project_description: cleanText(instructions),
          assignments: [],
          employees: [],
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        alert(errorData?.detail || "Failed to create private project plan");
        return;
      }

      const created = await res.json().catch(() => null);
      const nextId = created?.id ?? created?.project_id;
      if (!nextId) {
        alert("Private project plan created, but id is missing in response");
        return;
      }
      router.push(`/admin1/private-projects/${nextId}`);
    } catch (e) {
      console.error(e);
      alert("Failed to create private project plan");
    } finally {
      setSaving(false);
    }
  }, [auth, endDate, instructions, router, startDate, status, timeline, title]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pt-16 md:pt-20">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-gray-500">Admin Dashboard</div>
            <h1 className="text-2xl font-bold text-gray-900">New Private Project Plan</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push("/admin1/dashboard?tab=current-projects")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button onClick={() => void createPlan()} disabled={!canSave}>
              <Save className="w-4 h-4 mr-2" />
              {saving ? "Saving..." : "Create"}
            </Button>
          </div>
        </div>

        <Card className="bg-white border-gray-100 shadow-md">
          <CardHeader className="border-b">
            <CardTitle className="text-sm font-semibold text-gray-700">Plan Details</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Label className="text-xs">Project Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} className="h-9 text-sm mt-1" />
              </div>
              <div>
                <Label className="text-xs">Status</Label>
                <select
                  value={status || "planned"}
                  onChange={(e) => setStatus(e.target.value)}
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                >
                  <option value="planned">planned</option>
                  <option value="ongoing">ongoing</option>
                  <option value="completed">completed</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs">Start Date</Label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-9 text-sm mt-1" />
              </div>
              <div>
                <Label className="text-xs">End Date</Label>
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-9 text-sm mt-1" />
              </div>
            </div>

            <div>
              <Label className="text-xs">Timeline</Label>
              <Input
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="h-9 text-sm mt-1"
                placeholder="Define timeline (milestones, dates, phases)"
              />
            </div>

            <div>
              <Label className="text-xs">Instructions / Work Plan</Label>
              <Textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="text-sm mt-1 min-h-[120px]"
                placeholder="Write instructions / work plan..."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

