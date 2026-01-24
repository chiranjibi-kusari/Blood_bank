import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

export async function predictMatch(features) {
  return new Promise((resolve, reject) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Go up one folder from services → into ml
    const scriptPath = path.join(__dirname, "..", "ml", "predict.py");

    const py = spawn("python", [scriptPath]);
    py.stdin.write(JSON.stringify(features));
    py.stdin.end();

    let data = "";
    py.stdout.on("data", (chunk) => (data += chunk.toString()));
    py.stderr.on("data", (err) => reject(err.toString()));

    py.on("close", () => resolve(parseFloat(data)));
  });
}
