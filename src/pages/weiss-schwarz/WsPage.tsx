import type { GamePageProps } from '@/lib/games';
import { AuthGate } from '@/components/AuthGate';

export function WsPage({ session, isAuthLoading, onSignIn }: GamePageProps) {
  if (isAuthLoading) {
    return (
      <main className="main-content">
        <p>Checking authentication...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="main-content">
        <AuthGate onSignIn={onSignIn} />
      </main>
    );
  }

  return (
    <main className="main-content">
      <h1>Weiss Schwarz</h1>
    </main>
  );
}
