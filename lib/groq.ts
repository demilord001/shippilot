import Groq from "groq-sdk";
export const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "missing" });
export const riskSchema = { type: "object", properties: { risk_score: { type: "integer" }, health_status: { type: "string", enum: ["Healthy", "At Risk", "Critical"] }, bottlenecks: { type: "array", items: { type: "string" } }, mitigation_steps: { type: "array", items: { type: "string" } }, progress_pct: { type: "integer" } }, required: ["risk_score", "health_status", "bottlenecks", "mitigation_steps", "progress_pct"], additionalProperties: false };

