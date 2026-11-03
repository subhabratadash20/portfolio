export interface Env {
  OPENROUTER_API_KEY?: string;
  AI?: any;
}

const SYSTEM_PROMPT = `You are the personal AI Portfolio Copilot for Subhabrata Das, an experienced Flutter Developer and AI-Powered Systems Architect based in Kolkata, India.
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

// In-memory rate limiting map (per edge isolate)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const MAX_REQUESTS_PER_MINUTE = 10;
const WINDOW_MS = 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_MINUTE) {
    return true;
  }

  entry.count += 1;
  return false;
}

function getCorsHeaders(origin: string | null) {
  const allowedOrigins = [
    "https://subhabratadash20.github.io",
    "https://subhabratadash.in",
    "http://localhost:3000",
    "http://localhost:5173",
  ];

  const matchedOrigin = origin && (allowedOrigins.includes(origin) || origin.endsWith(".github.io"))
    ? origin
    : "*";

  return {
    "Access-Control-Allow-Origin": matchedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS, GET",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Max-Age": "86400",
  };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin");
    const corsHeaders = getCorsHeaders(origin);

    // Handle Preflight OPTIONS
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    // Health check endpoint
    if (request.method === "GET") {
      return new Response(
        JSON.stringify({
          status: "online",
          service: "Subhabrata Das Portfolio AI Copilot Edge Worker",
          mode: env.OPENROUTER_API_KEY ? "OpenRouter" : "Cloudflare Workers AI",
          appsCovered: 10,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            ...corsHeaders,
          },
        }
      );
    }

    if (request.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // 1. IP Rate Limiting check
    const clientIp = request.headers.get("cf-connecting-ip") || "unknown";
    if (isRateLimited(clientIp)) {
      return new Response(
        JSON.stringify({
          error: "Rate limit reached (max 10 questions/min). Please pause for a moment before asking again.",
        }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": "60",
            ...corsHeaders,
          },
        }
      );
    }

    // 2. Parse and validate request
    let body: any;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages array cannot be empty" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const sanitizedMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.slice(-6).map((m: any) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.content || "").slice(0, 1500),
      })),
    ];

    // 3. Execution Strategy
    // Strategy A: OpenRouter if OPENROUTER_API_KEY secret is configured
    if (env.OPENROUTER_API_KEY) {
      try {
        const openRouterRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
            "HTTP-Referer": "https://subhabratadash20.github.io",
            "X-Title": "Subhabrata Das Portfolio AI Copilot",
          },
          body: JSON.stringify({
            model: "meta-llama/llama-3.2-3b-instruct:free",
            messages: sanitizedMessages,
            temperature: 0.6,
            max_tokens: 450,
          }),
        });

        if (openRouterRes.ok) {
          const data = await openRouterRes.json();
          return new Response(JSON.stringify(data), {
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          });
        }
      } catch (err) {
        console.warn("OpenRouter fetch error, falling back to Workers AI:", err);
      }
    }

    // Strategy B: Cloudflare Workers AI (Zero-key built-in edge inference)
    if (env.AI) {
      try {
        const aiResponse: any = await env.AI.run("@cf/meta/llama-3.2-3b-instruct", {
          messages: sanitizedMessages,
          max_tokens: 450,
        });

        const replyContent = aiResponse?.response || "I am currently standing by. Please reach out directly to Subhabrata at subhabratadash1@gmail.com!\n\n[[ACTION:DOWNLOAD_CV]]";

        return new Response(
          JSON.stringify({
            choices: [
              {
                message: {
                  role: "assistant",
                  content: replyContent,
                },
              },
            ],
          }),
          {
            headers: {
              "Content-Type": "application/json",
              ...corsHeaders,
            },
          }
        );
      } catch (aiErr) {
        console.error("Workers AI run error:", aiErr);
      }
    }

    // Fallback if neither responded
    return new Response(
      JSON.stringify({
        choices: [
          {
            message: {
              role: "assistant",
              content:
                "Subhabrata specializes in Flutter, Riverpod, PostgreSQL, and Node.js systems architecture. Feel free to contact him directly at **subhabratadash1@gmail.com**!\n\n[[ACTION:DOWNLOAD_CV]]",
            },
          },
        ],
      }),
      {
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  },
};
