# Render demo deployment

This deployment runs without a MongoDB or Stripe account.

- The API starts with the bundled menu and stores accounts, carts, product edits, and orders in memory.
- The free API service may sleep or restart. In-memory records reset when it restarts.
- Checkout records cash-on-delivery orders. It does not charge cards.
- The admin API requires the access key configured in Render.
- Uploaded images are stored on the service filesystem and may be lost on restart or redeploy.

Use this as a demo. Add durable database and image storage plus a payment provider before relying on it for real customer orders.
