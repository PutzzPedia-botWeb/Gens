const { TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const readline = require("readline");

const API_ID = 37160974;        // ← Ganti punya Anda
const API_HASH = "55cc7b3da65362a41c8684b30e8522ee";   // ← Ganti punya Anda

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (q) => new Promise((r) => rl.question(q, r));

(async () => {
  const client = new TelegramClient(new StringSession(""), API_ID, API_HASH, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () => await question("Nomor HP (+62...): "),
    password: async () => await question("Password 2FA (kosongkan jika tidak ada): "),
    phoneCode: async () => await question("Kode OTP Telegram: "),
    onError: (err) => console.error(err),
  });

  console.log("\n===== SESSION STRING ANDA =====\n");
  console.log(client.session.save());
  console.log("\n===============================\n");
  process.exit(0);
})();
