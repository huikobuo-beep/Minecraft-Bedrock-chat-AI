# Minecraft-Bedrock-chat-AI
このリポジトリではマインクラフト統合版のChatAIを配布しています。
# やり方手順
## 1,まずインストールしたZIPファイルを解凍してください
## 2,次にそのファイルをshiftを押しながら右クリックをしてターミナルまたはpowershellで開いてください。
## 3,そしたらコマンドにnpm installをしてください。
## 4,つぎにネットで"google ai studio"と調べてください。
## 5,api kyeを作成してserver.jsの中にあるconst ai = new GoogleGenAI({ apiKey: "YourAPIKye" });のYourAPIKyeのところに貼り付けてください。（必ず"<=は消さないでください）
## 6,そして上書き保存をしてさっき開いたターミナルに"node server.js"と打ってください。
## 7,最後にマインクラフトのワールドに入りコマンドで"/connect ws://localhost:3000"と打ってください。
### もしエラーが出る場合設定の一般の設定からWebSocketを有効にしてやってください。

# 必要ソフト
## 1,VisualStudioCode(Vscode)
[Visual Studio Code - オープンソースのAIコードエディタ |マルチエージェント開発のためのあなたのホーム](https://code.visualstudio.com/)
## 2,Node.js
[Node.js — Run JavaScript Everywhere](https://nodejs.org/en)
## 3,google api kye
https://aistudio.google.com/api-keys
