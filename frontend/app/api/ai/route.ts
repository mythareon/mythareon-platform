import { streamText } from 'ai';
import { createGateway } from '@ai-sdk/gateway';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const { prompt } = (await req.json()) as { prompt?: string };

  if (!prompt) {
    return new Response('Missing prompt', { status: 400 });
  }

  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) {
    return new Response('AI_GATEWAY_API_KEY is not configured', { status: 500 });
  }

  const gateway = createGateway({ apiKey });

  const result = streamText({
    model: gateway('openai/gpt-5.4'),
    prompt,
  });

  return result.toDataStreamResponse();
}
