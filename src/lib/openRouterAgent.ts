import { queryLocalKnowledgeBase } from "@/data/agentKnowledge";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
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

const EDGE_WORKER_ENDPOINT = "https://subhabrata-portfolio-copilot.subhabrata-portfolio-copilot.workers.dev";

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
            { role: "system", content: SYSTEM_PROMPT },
            ...chatHistory.slice(-4),
            { role: "user", content: userPrompt },
          ],
          temperature: 0.6,
          max_tokens: 350,
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
    "You can reach him directly at **subhabratadas2002@gmail.com** or connect on [LinkedIn](https://linkedin.com/in/subhabratadash)!"
  );
}
