#!/bin/bash

# Start backend server in background
echo "Starting backend server on port 3051..."
cd /home/runner/app
npm run api &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend in foreground
echo "Starting frontend on port 3000..."
cd /home/runner/app/client
npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID 2>/dev/null" EXIT
