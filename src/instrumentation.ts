export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { enableMSW } = await import("./api/mocks/index");
    enableMSW();
  }
}
