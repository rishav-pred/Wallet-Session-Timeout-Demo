# Summary of What This Does
Starts backend session (5-minute timeout via cookie-session)

Sends remaining time to frontend

Frontend sets a local timeout to auto-logout the wallet once session expires

Also polls every 10s to catch early session expiration
