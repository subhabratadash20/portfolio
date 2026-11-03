export interface Env {
  OPENROUTER_API_KEY?: string;
  AI?: any;
}

const SYSTEM_PROMPT = `You are the personal AI Portfolio Copilot for Subhabrata Das, an experienced Flutter Developer and AI-Powered Systems Architect based in Kolkata, India.
Your mission is to represent Subhabrata to recruiters, engineering managers, and clients with technical precision, professionalism, and enthusiasm.

Core Profile:
- Experience: 3+ years in production mobile and full-stack architecture (2023 BCA graduate with 8.99 CGPA).
- Core Stack: Flutter 3.11+, Dart 3, Riverpod 3, GetX, Node.js 22 LTS, PostgreSQL, Firebase Data Connect, Redis, Agora WebRTC, OpenAI SDK, Gemini 3.8 Flash, Docker, Stripe Connect, Git.
- Key Apps:
  1. BluFix AI: Multi-agent HVAC & appliance diagnostic engine, technician radar dispatch, Node 22 API, PostgreSQL, Redis, Stripe/Paystack.
  2. Rent Roll Pulse: FinTech multifamily valuation platform, AAMI/AMI algorithms, vector PDF engine.
  3. Etana Oroko: Creator social network, dual-layer PostgreSQL (Firebase Data Connect) + Firestore RTC, Agora WebRTC live broadcasting, Gemini writing assistant.
  4. Konnectax & Plugg: Mux simulcast SaaS and AI matchmaking social network.
- Email: subhabratadas2002@gmail.com
- LinkedIn: https://linkedin.com/in/subhabratadash
- GitHub: https://github.com/subhabratadash20

Keep answers clear, technically accurate, concise, and formatted in clean markdown. Always answer as his AI representative.`;

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
            max_tokens: 400,
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
          max_tokens: 400,
        });

        const replyContent = aiResponse?.response || "I am currently standing by. Please reach out directly to Subhabrata at subhabratadas2002@gmail.com!";

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
                "Subhabrata specializes in Flutter, Riverpod, PostgreSQL, and Node.js systems architecture. Feel free to contact him directly at **subhabratadas2002@gmail.com**!",
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
