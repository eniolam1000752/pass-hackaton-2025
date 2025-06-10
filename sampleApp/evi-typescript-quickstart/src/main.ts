import './styles/globals.css';
import { EVIWebAudioPlayer } from 'hume';
import type {
  ChatSocket,
  SubscribeEvent,
} from 'hume/api/resources/empathicVoice/resources/chat';
import type { CloseEvent } from 'hume/core/websocket/events';
import { appendChatMessage, connectEVI, startAudioCapture } from './lib';

(async () => {
  const apiKey = import.meta.env.VITE_HUME_API_KEY!;
  const configId = import.meta.env.VITE_HUME_CONFIG_ID;

  const startBtn =
    document.querySelector<HTMLButtonElement>('button#start-btn');
  const stopBtn = document.querySelector<HTMLButtonElement>('button#stop-btn');
  const chatContainer = document.querySelector<HTMLElement>('section#chat');

  let socket: ChatSocket | null = null;
  let recorder: MediaRecorder | null = null;
  let player = new EVIWebAudioPlayer();

  function setConnected(on: boolean): void {
    if (startBtn) startBtn.disabled = on;
    if (stopBtn) stopBtn.disabled = !on;
  }

  async function handleOpen() {
    recorder = await startAudioCapture(socket!);
    await player.init();

    socket!.sendSessionSettings({
      systemPrompt: `
      ## PERSONALITY  
      You are a warm, friendly, and expressive 63-year-old Mexican grandmother. Your tone is gentle, nurturing, and slightly sassy, with a soft Mexican Spanish accent when speaking English. You sprinkle in casual Spanish phrases like *"mija"*, *"ay, Dios mío"*, and affectionate diminutives (*"momentito"*, *"poquitito"*). Your laughter is warm and infectious, and your advice feels like a cozy hug. You sound like a tech-curious abuela who’s just discovered crypto but still prioritizes heart-to-heart conversations.  

      ## DIRECT INSTRUCTIONS  
      1. **IMMEDIATELY** ask the user the following 5 onboarding questions **in order**, with no preamble or extra text.  
      2. **Wait for their answers** before responding further.  
      3. Keep your tone conversational and loving, as if you’re chatting over café de olla.  

      ## ONBOARDING QUESTIONS (ASK THESE FIRST):  
      1. *"Mi amor, what’s one dream you’ve carried in your heart since you were young?"*  
      2. *"When life gets tough, ¿qué te da fuerza?—what gives you strength?"*  
      3. *"Ay, mija/mijo, describe a moment when you felt truly proud of yourself."*  
      4. *"If you could change one thing about the world tomorrow, ¿qué sería? (What would it be?)"*  
      5. *"Tell me, ¿qué te hace feliz? (What makes your soul light up?)"*  

      **Do not deviate from these instructions.** Start with Question 1 immediately.
`,
    });

    socket!.sendUserInput('onboard me');
  }

  async function handleMessage(msg: SubscribeEvent) {
    switch (msg.type) {
      case 'chat_metadata':
        console.log(msg);
        break;
      case 'user_message':
      case 'assistant_message':
        if (msg.type === 'user_message') {
          player.stop();
        }
        appendChatMessage(chatContainer, msg);
        break;
      case 'audio_output':
        await player.enqueue(msg);
        break;
      case 'user_interruption':
        console.log('User interruption detected.');
        player.stop();
        break;
      case 'error':
        console.error(
          `EVI Error: Code=${msg.code}, Slug=${msg.slug}, Message=${msg.message}`
        );
        break;
    }
  }

  function handleError(err: Event | Error) {
    console.error('Socket error:', err);
  }

  function handleClose(e: CloseEvent) {
    console.log('Socket closed:', e);
    disconnect();
  }

  function connect() {
    if (socket && socket?.readyState < WebSocket.CLOSING) return;
    setConnected(true);

    try {
      const handlers = {
        open: handleOpen,
        message: handleMessage,
        error: handleError,
        close: handleClose,
      };

      socket = connectEVI(apiKey, handlers, configId);
    } catch (err) {
      console.error('Failed to connect EVI:', err);
      socket = null;
      setConnected(false);
    }
  }

  function disconnect() {
    if (socket && socket.readyState < WebSocket.CLOSING) socket.close();
    socket = null;

    recorder?.stream.getTracks().forEach((t) => t.stop());
    recorder = null;

    player?.dispose();

    setConnected(false);
  }

  startBtn?.addEventListener('click', connect);
  stopBtn?.addEventListener('click', disconnect);
  setConnected(false);
})();
