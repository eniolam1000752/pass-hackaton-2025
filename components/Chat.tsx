'use client';

import Messages from './Messages';
import Controls from './Controls';
import { ComponentRef, useEffect, useRef } from 'react';
import StartCall from './StartCall';

export default function ClientComponent({
  accessToken,
}: {
  accessToken: string;
}) {
  const timeout = useRef<number | null>(null);
  const ref = useRef<ComponentRef<typeof Messages> | null>(null);

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
