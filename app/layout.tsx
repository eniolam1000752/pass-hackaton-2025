import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Nav } from '@/components/Nav';
import { cn } from '@/utils';
import { VoiceProvider } from '@humeai/voice-react';
import { getHumeAccessToken } from '@/utils/getHumeAccessToken';

export const metadata: Metadata = {
  title: 'Hume AI - EVI - Next.js Starter',
  description: "A Next.js starter using Hume AI's Empathic Voice Interface",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const accessToken = await getHumeAccessToken();

  if (!accessToken) {
    throw new Error();
  }

  return (
    <html lang="en">
      <body
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          'flex flex-col min-h-screen'
        )}
      >
        <VoiceProvider
          auth={{ type: 'accessToken', value: accessToken }}
          configId={process.env.NEXT_PUBLIC_HUME_CONFIG_ID}
          // onMessage={() => {
          //   if (timeout.current) window.clearTimeout(timeout.current);

          //   timeout.current = window.setTimeout(() => {
          //     if (ref.current) {
          //       const scrollHeight = ref.current.scrollHeight;

          //       ref.current.scrollTo({
          //         top: scrollHeight,
          //         behavior: 'smooth',
          //       });
          //     }
          //   }, 200);
          // }}
        >
          <Nav />
          {children}
        </VoiceProvider>
      </body>
    </html>
  );
}
