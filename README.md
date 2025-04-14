# Summary of What This Does
1. Starts backend session (5-minute timeout via cookie-session)

2. Sends remaining time to frontend

3. Frontend sets a local timeout to auto-logout the wallet once session expires

4. Also polls every 10s to catch early session expiration
