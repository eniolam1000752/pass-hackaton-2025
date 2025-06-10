'use client';

import { useVoice, VoiceProvider } from '@humeai/voice-react';
import Messages from './Messages';
import Controls from './Controls';
import { ComponentRef, useEffect, useRef } from 'react';
import StartCall from './StartCall';

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const { status, connect } = useVoice();
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);

  // optional: use configId from environment variable
  // const configId = process.env['NEXT_PUBLIC_HUME_CONFIG_ID'];

  // useEffect(() => {
  //   if (status.value !== 'connected') {
  //     connect()
  //       .then(() => {})
  //       .catch(() => {})
  //       .finally(() => {});
  //   }
  // }, []);

  return (
    <div
      className={
        'relative grow flex flex-col mx-auto w-full overflow-hidden h-[0px]'
      }
    >
      <Messages ref={ref} />
      <Controls />
      <StartCall />
    </div>
  );
}
