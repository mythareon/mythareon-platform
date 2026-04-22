import { sleep } from 'workflow';

type User = { id: string; email: string };

async function createUser(email: string): Promise<User> {
  return { id: `user_${Date.now()}`, email };
}

async function sendWelcomeEmail(_user: User): Promise<void> {
  // Placeholder for provider integration
}

async function sendOnboardingEmail(_user: User): Promise<void> {
  // Placeholder for provider integration
}

export async function handleUserSignup(email: string) {
  'use workflow';

  const user = await createUser(email);
  await sendWelcomeEmail(user);

  await sleep('5s');

  await sendOnboardingEmail(user);
  return { userId: user.id, status: 'onboarded' };
}
