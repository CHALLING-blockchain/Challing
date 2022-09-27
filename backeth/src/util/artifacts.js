import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import config from "./config.js";

const artifactDir = config.ARTIFACT_DIR;

const artifacts = {};

readdirSync(artifactDir).forEach((file) => {
  if (!file || !file.endsWith(".json")) return;
  artifacts[file.split(".")[0]] = JSON.parse(
    readFileSync(join(artifactDir, file))
  );
});

if (Object.keys(artifacts).length === 0) {
  console.log("[경고] artifact 가 없거나 경로가 잘못되었음");
}

export default artifacts;
