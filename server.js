import { WebSocketServer } from 'ws';
import crypto from 'crypto';
import { GoogleGenAI } from '@google/genai';

// APIキーを自分のものに書き換えてね
const ai = new GoogleGenAI({ apiKey: "YourAPIKye" });

const wss = new WebSocketServer({ port: 3000 });

console.log("★ WebSocket サーバー起動完了！ (ws://localhost:3000)");

wss.on('connection', (ws) => {
  console.log("★ マイクラが正常に接続しました！");

  // マイクラに「プレイヤーがチャットを打ったら教えて！」と登録する
  const subscribeMsg = {
    header: {
      version: 1,
      requestId: crypto.randomUUID(),
      messagePurpose: "subscribe",
      messageType: "commandRequest"
    },
    body: {
      eventName: "PlayerMessage"
    }
  };
  ws.send(JSON.stringify(subscribeMsg));

  ws.on('message', async (data) => {
    try {
      const rawText = data.toString();
      const parsed = JSON.parse(rawText);

      // マイクラのチャットイベントを受け取った場合
      if (parsed.header?.eventName === "PlayerMessage") {
        const sender = parsed.body.sender;
        const message = parsed.body.message;

        // "!ai " から始まるチャットだけに反応する
        if (message.startsWith("!ai ")) {
          const prompt = message.replace("!ai ", "");

          console.log(`\n[AI処理開始] ${sender}: ${prompt}`);
          sendMessage(ws, `§7[AI] ${sender} の質問をGeminiに送信中...`);

          // Gemini API に問い合わせ
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
          });

          // マイクラのチャットに回答を出力
          sendMessage(ws, `§a[AI] §f${response.text}`);
          console.log(`[AI回答完了] 送信完了！`);
        }
      }
    } catch (err) {
      // JSONパース以外のエラー等は無視
    }
  });
});

function sendMessage(ws, message) {
  const cmdMsg = {
    header: {
      version: 1,
      requestId: crypto.randomUUID(),
      messagePurpose: "commandRequest",
      messageType: "commandRequest"
    },
    body: {
      version: 1,
      commandLine: `tellraw @a {"rawtext":[{"text":"${message}"}]}`
    }
  };
  ws.send(JSON.stringify(cmdMsg));
}