import 'dotenv/config';
import { streamText } from 'ai';
import { createGateway } from '@ai-sdk/gateway';

async function main() {
  const apiKey = process.env.AI_GATEWAY_API_KEY;
  if (!apiKey) {
    throw new Error('Missing AI_GATEWAY_API_KEY in environment');
  }

  const gateway = createGateway({ apiKey });

  const result = streamText({
    model: gateway('openai/gpt-5.4'),
    prompt: 'Invent a new holiday and describe its traditions.',
  });

  for await (const textPart of result.textStream) {
    process.stdout.write(textPart);
  }

  console.log('\n');
  console.log('Token usage:', await result.usage);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
