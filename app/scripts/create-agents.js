// Run once to create the 4 roaster agents in Vaani. Prints agent ids for .env.
import "dotenv/config";
import { PERSONAS } from "../src/personas.js";
import { createAgent } from "../src/vaani.js";

const ENV_KEY = { mother_in_law: "AGENT_MIL", friend: "AGENT_FRIEND", maid: "AGENT_MAID", manager: "AGENT_MANAGER" };

const out = {};
for (const id of Object.keys(PERSONAS)) {
  try {
    const agentId = await createAgent(id);
    out[ENV_KEY[id]] = agentId;
    console.log(`✓ ${id.padEnd(14)} -> ${agentId}`);
  } catch (e) {
    console.error(`✗ ${id}: ${e.message}`);
  }
}
console.log("\nPaste into app/.env:\n");
for (const [k, v] of Object.entries(out)) console.log(`${k}=${v}`);
