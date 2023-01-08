import * as fs from 'node:fs/promises';
import type { RequestHandler } from './$types';

export const prerender = true;
export const GET = (async () => {
  return new Response(
    await fs.readFile('./ttf-parser-wasm/pkg/ttf_parser_wasm_bg.wasm'),
    { headers: [['content-type', 'application/wasm']] }
  );
}) satisfies RequestHandler;
