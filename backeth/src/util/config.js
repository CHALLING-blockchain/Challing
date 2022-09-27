import dotenv from "dotenv";

try {
  if (process.env.NODE_ENV !== "production") {
    dotenv.config({ path: ".env", dubug: true });
  } else {
    try {
      dotenv.config({ path: ".env.production", debug: true });
    } catch (e) {
      dotenv.config({ path: ".env", dubug: true });
    }
  }
} catch (e) {
  dotenv.config();
}

export default {
  ENDPOINT: process.env.APP_NODE_ENDPOINT || "http://localhost:7545",
  PRIVATE_KEY:
    process.env.APP_ACCOUNT_PRIVATE_KEY || "앱 계정 프라이빗키를 지정하세요.",
  ARTIFACT_DIR:
    process.env.APP_CONTRACT_ARTIFACT_DIR || "../frontend/src/contracts",
};
