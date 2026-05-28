"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { API_URL } from "@/lib/config";
import useAuth from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Step = "credentials" | "otp";

export default function EmployeeLoginPage() {
  const router = useRouter();
  const auth = useAuth();

  const [step, setStep] = useState<Step>("credentials");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");

  const [employeeId, setEmployeeId] = useState("");
  const [maskedPhone, setMaskedPhone] = useState("");
  const [otpExpiresIn, setOtpExpiresIn] = useState<number | null>(null);
  const [otpCode, setOtpCode] = useState("");
  const [fallbackOtp, setFallbackOtp] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access") || localStorage.getItem("access_token");
    if (token) router.replace("/employee/dashboard");
  }, [router]);

  const safeJson = async (res: Response) => {
    try {
      return await res.json();
    } catch {
      return null;
    }
  };

  const requestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/employee/login/request/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login_id: loginId, password }),
      });
      const data = await safeJson(res);
      if (!res.ok) {
        const msg =
          (data as any)?.detail ||
          (data && typeof data === "object" ? Object.values(data).flat().join(", ") : "") ||
          "Login failed";
        setError(msg);
        return;
      }

      const smsSent = (data as any)?.sms_sent;
      const emailSent = (data as any)?.email_sent;
      const otpFromApi = typeof (data as any)?.otp_code === "string" ? (data as any).otp_code : "";
      const sentTo = typeof (data as any)?.phone === "string" ? (data as any).phone : "";
      const noDeliveryChannelWorked = smsSent === false && emailSent === false;
      const baseMsg = sentTo ? `OTP sent to ${sentTo}` : "OTP requested successfully";
      const msg =
        noDeliveryChannelWorked && otpFromApi
          ? `${baseMsg}. SMS and email are not configured. Use the OTP shown below.`
          : smsSent === false && otpFromApi
            ? `${baseMsg}. SMS not configured. OTP: ${otpFromApi}`
          : smsSent === false
            ? `${baseMsg}. SMS not configured.`
            : otpFromApi
              ? `${baseMsg}. OTP: ${otpFromApi}`
              : baseMsg;

      setEmployeeId(String((data as any)?.employee_id || ""));
      setMaskedPhone(sentTo);
      setOtpExpiresIn(typeof (data as any)?.otp_expires_in_minutes === "number" ? (data as any).otp_expires_in_minutes : null);
      setFallbackOtp(noDeliveryChannelWorked ? otpFromApi : "");
      setStep("otp");
      setSuccessMsg(msg);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/employee/otp/verify/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employee_id: employeeId, otp_code: otpCode }),
      });
      const data = await safeJson(res);
      if (!res.ok) {
        const msg =
          (data as any)?.detail ||
          (data && typeof data === "object" ? Object.values(data).flat().join(", ") : "") ||
          "OTP verification failed";
        setError(msg);
        return;
      }

      const access = (data as any)?.access;
      const refresh = (data as any)?.refresh;
      if (typeof access === "string" && access) {
        localStorage.setItem("access", access);
        if (typeof refresh === "string" && refresh) localStorage.setItem("refresh", refresh);
        await auth.login(access);
        router.push("/employee/dashboard");
        return;
      }

      setError("Login succeeded but token is missing");
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setError("");
    setSuccessMsg("");
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/employee/otp/resend/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employee_id: employeeId }),
      });
      const data = await safeJson(res);
      if (!res.ok) {
        setError((data as any)?.detail || "Failed to resend OTP");
        return;
      }

      const smsSent = (data as any)?.sms_sent;
      const emailSent = (data as any)?.email_sent;
      const otpFromApi = typeof (data as any)?.otp_code === "string" ? (data as any).otp_code : "";
      const noDeliveryChannelWorked = smsSent === false && emailSent === false;
      const msg =
        noDeliveryChannelWorked && otpFromApi
          ? "OTP resent. SMS and email are not configured. Use the OTP shown below."
          : smsSent === false && otpFromApi
            ? `OTP resent. SMS not configured. OTP: ${otpFromApi}`
          : smsSent === false
            ? "OTP resent. SMS not configured."
            : otpFromApi
              ? `OTP resent. OTP: ${otpFromApi}`
              : "OTP resent successfully!";
      setOtpCode("");
      setFallbackOtp(noDeliveryChannelWorked ? otpFromApi : "");
      setSuccessMsg(msg);
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  const backToCredentials = () => {
    setStep("credentials");
    setError("");
    setSuccessMsg("");
    setEmployeeId("");
    setMaskedPhone("");
    setFallbackOtp("");
    setOtpExpiresIn(null);
    setOtpCode("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <Card className="w-full max-w-md shadow-2xl rounded-3xl">
        <CardHeader className="space-y-3 text-center">
          <div className="flex items-center justify-center">
            <Image src="/logo.png" width={56} height={56} alt="Logo" className="rounded-xl shadow" />
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Employee Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error ? <div className="text-sm text-red-600">{error}</div> : null}
          {successMsg ? <div className="text-sm text-green-700">{successMsg}</div> : null}

          {step === "credentials" ? (
            <form onSubmit={requestOtp} className="space-y-4">
              <div className="space-y-2">
                <Label>Email or Phone</Label>
                <Input value={loginId} onChange={(e) => setLoginId(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Password</Label>
                <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending OTP..." : "Continue to OTP"}
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={() => router.push("/login")} disabled={loading}>
                Back to Main Login
              </Button>
            </form>
          ) : (
            <form onSubmit={verifyOtp} className="space-y-4">
              <div className="text-sm text-gray-600">
                {employeeId ? <div className="font-mono">Employee ID: {employeeId}</div> : null}
                {maskedPhone ? <div>OTP sent to: {maskedPhone}</div> : null}
                {otpExpiresIn != null ? <div>Expires in: {otpExpiresIn} min</div> : null}
              </div>
              {fallbackOtp ? (
                <div className="rounded-md border border-amber-300 bg-amber-50 px-4 py-3 text-center">
                  <div className="text-xs font-semibold uppercase tracking-wide text-amber-700">Fallback OTP</div>
                  <div className="mt-1 font-mono text-2xl font-bold tracking-[0.35em] text-amber-900">{fallbackOtp}</div>
                  <div className="mt-1 text-xs text-amber-800">SMS and email are not configured. Use this OTP to continue.</div>
                </div>
              ) : null}
              <div className="space-y-2">
                <Label>OTP Code</Label>
                <Input value={otpCode} onChange={(e) => setOtpCode(e.target.value)} required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
              <div className="flex gap-2">
                <Button type="button" variant="outline" className="w-1/2" onClick={backToCredentials} disabled={loading}>
                  Back
                </Button>
                <Button type="button" variant="outline" className="w-1/2" onClick={resendOtp} disabled={loading}>
                  Resend OTP
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
