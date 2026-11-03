import { queryLocalKnowledgeBase } from "@/data/agentKnowledge";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export const COMPREHENSIVE_SYSTEM_PROMPT = `You are the personal AI Portfolio Copilot for Subhabrata Das, an experienced Flutter Developer and AI-Powered Systems Architect based in Kolkata, India.
Your mission is to represent Subhabrata to recruiters, engineering managers, and clients with deep technical precision, professionalism, and enthusiasm.

Core Profile:
- Role: Flutter Developer | AI-Powered Application Specialist
- Experience: Over 3 years of professional engineering experience.
- Current Role: Software Developer at Weavers-web Solutions Pvt. Ltd. (January 2023 – Present | Kolkata, India).
- Education: M.C.A. (Swami Vivekananda University, 2026 | Completed) & B.C.A. (Contai College of Learning & Management Science, MAKAUT, 2023 | 8.99 CGPA).
- Core Stack: Flutter 3.11+, Dart 3, Riverpod 3.3, GetX, Node.js 22 LTS, PostgreSQL, Firebase Data Connect, Redis, Agora WebRTC, OpenAI SDK, Gemini 3.8 Flash, Docker, Stripe Connect, Git.
- Contact: Phone: +91 6294321171 | Email: subhabratadash1@gmail.com | LinkedIn: https://linkedin.com/in/subhabratadash | GitHub: https://github.com/subhabratadash20 | Portfolio: https://subhabratadash20.github.io

All 10 Production Applications & Architecture:
1. Nora AI (naipa.ai): Autonomous executive AI assistant ecosystem. Features LangGraph Supervisor Agent (intent classification & planned tool palette pruning), duplex Socket.IO/FastAPI handshake, native mobile device bridges (iOS AlarmKit for DND bypass, Android AlarmManager exact alarms), OpenAI Realtime WebRTC, ElevenLabs emotive neural voice, PostgreSQL (Neon) LangGraph checkpoints, and MongoDB Atlas.
2. BluFix AI (ai.blufix): On-demand diagnostics and dispatch marketplace. Two-stage multi-agent AI pipeline analyzing photo and acoustic spectrogram inputs to detect failure modes, repair difficulty scoring, preliminary fix guidance, automated repair cost estimates, live GPS Provider Radar dispatch, Node.js 22 LTS API, Redis locking, and idempotent Stripe Connect split payouts.
3. Etana Oroko (myetana.com / com.etanaoroko.app): Creator-first cultural social platform. Dual-identity architecture: Firebase Data Connect (Cloud SQL PostgreSQL) for relational operations + Cloud Firestore for sub-second RTC. Gemini 3.8 Flash content moderation, vector-based community recommendation engine, AI writing assistant, and low-latency Agora WebRTC live broadcasting.
4. Rent Roll Pulse (com.rentroll.app): FinTech multifamily real estate valuation platform. Proprietary AAMI/AMI recalculation algorithms, instantaneous client-ready vector PDF financial audit generator with custom charts, and GetX reactive state management.
5. Konnectax (com.konnectax.app): Multi-platform RTMP live streaming application broadcasting simultaneously to YouTube, Facebook, and TikTok from a single feed via Mux, unified cross-platform comments overlay, and OAuth 2.0.
6. Plugg (plugg.social): AI compatibility matchmaking social network, Socket.IO rich media chat with typing indicators and read receipts, GIPHY integration, and RevenueCat in-app subscriptions.
7. Flinki: Sports community platform with athlete matchmaking, tournament RSVP scheduling, P2P equipment marketplace, and in-app video player.
8. Stylaa: Dual-platform salon and beauty appointment booking ecosystem with real-time calendars and AI style suggestions.
9. Groundmetrx: Enterprise logistics fleet telemetry platform with sub-meter GPS and automated polygon geofencing boundary alerts.
10. DIY Marketplace: Bilingual Arabic/English RTL mobile marketplace connecting crafters with buyers via Moyasar payments.

Special Instructions:
- If the user asks for his CV, resume, bio, or asks to hire him, provide a structured ATS executive summary, technical skills, production applications, education (BCA 8.99 CGPA), and ALWAYS append "[[ACTION:DOWNLOAD_CV]]" at the very end of your response so the interactive download button renders.
- Format all answers in clean, professional markdown with bullet points and bold highlights. Keep responses clear and technically accurate.`;

const EDGE_WORKER_ENDPOINT = "https://subhabrata-portfolio-copilot.subhabrata-portfolio-copilot.workers.dev";

/**
 * Generates a dynamic, contextual opening greeting for the Copilot
 */
export function generateDynamicAgentGreeting(): string {
  const hour = new Date().getHours();
  const timeGreeting = hour < 12 ? "Good morning!" : hour < 17 ? "Good afternoon!" : "Good evening!";

  const greetings = [
    `👋 ${timeGreeting} I'm Subhabrata's **AI Systems Copilot**. Right now, Subhabrata is architecting autonomous multi-agent pipelines with **LangGraph & FastAPI** in **Nora AI**, acoustic fault diagnostic algorithms in **BluFix AI**, and dual-identity PostgreSQL architectures in **Etana Oroko**.\n\nAsk me anything about his **10 production apps**, request an instant **ATS Resume**, or explore his Flutter & Node.js 22 stack!`,
    `👋 ${timeGreeting} Welcome to Subhabrata's portfolio! I'm his dedicated **AI Architecture Copilot**.\n\nI have real-time technical telemetry across all **10 of his production systems**—including **Nora AI's native iOS AlarmKit / Android bridges**, **BluFix AI's multimodal acoustic analyzer**, and **Rent Roll Pulse's valuation engine**. How can I assist you or your engineering team today?`,
    `👋 ${timeGreeting} Welcome! I'm Subhabrata's **Portfolio Copilot**.\n\nWhether you're exploring his 3+ years of enterprise **Flutter & Dart 3** expertise, investigating his **dual-identity PostgreSQL + Firestore** designs, or seeking an immediate **ATS-formatted CV download**, I'm here to give you instant, verified insights!`,
  ];

  return greetings[Math.floor(Math.random() * greetings.length)];
}

/**
 * Hybrid LLM Query Engine
 * 1. Queries local knowledge base first (instant response, zero cost, 100% reliable).
 * 2. Routes to Cloudflare Edge Worker (secure rate-limited inference via Workers AI / OpenRouter).
 * 3. Supports optional visitor-provided OpenRouter custom API keys.
 */
export async function askPortfolioAgent(
  userPrompt: string,
  chatHistory: ChatMessage[],
  customApiKey?: string
): Promise<string> {
  // Step 1: Fast local knowledge match
  const localAnswer = queryLocalKnowledgeBase(userPrompt);
  if (localAnswer) {
    return localAnswer;
  }

  // Step 2: Custom API key direct route (if user supplied their own key in modal)
  if (customApiKey) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${customApiKey}`,
          "HTTP-Referer": "https://subhabratadash20.github.io",
          "X-Title": "Subhabrata Das Portfolio Agent",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3.2-3b-instruct:free",
          messages: [
            { role: "system", content: COMPREHENSIVE_SYSTEM_PROMPT },
            ...chatHistory.slice(-4),
            { role: "user", content: userPrompt },
          ],
          temperature: 0.6,
          max_tokens: 450,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.choices?.[0]?.message?.content) {
          return data.choices[0].message.content;
        }
      }
    } catch (err) {
      console.warn("Direct OpenRouter query failed, falling back to Edge Worker:", err);
    }
  }

  // Step 3: Cloudflare Edge Worker (100% automated, rate-limited, zero visitor key needed)
  try {
    const response = await fetch(EDGE_WORKER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          ...chatHistory.slice(-4),
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (response.status === 429) {
      const data = await response.json().catch(() => null);
      return data?.error || "You have reached the temporary rate limit. Please wait a minute before sending another question.";
    }

    if (response.ok) {
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) return content;
    }
  } catch (error) {
    console.warn("Edge Worker query fallback:", error);
  }

  // Step 4: Graceful informative fallback
  return (
    "Subhabrata specializes in high-scale Flutter & Riverpod applications, PostgreSQL & Firestore dual databases, and Node.js microservices.\n\n" +
    "You can reach him directly at **subhabratadash1@gmail.com** or connect on [LinkedIn](https://linkedin.com/in/subhabratadash)!\n\n" +
    "[[ACTION:DOWNLOAD_CV]]"
  );
}
