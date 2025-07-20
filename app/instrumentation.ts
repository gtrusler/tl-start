export async function register() {
  // Instrumentation for Cloudflare Workers
  if (process.env.NEXT_RUNTIME === 'edge') {
    // Initialize any edge runtime specific instrumentation
  }
}