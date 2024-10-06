#!/usr/bin/env bash

# Install node dependencies
npm ci

# Build project
npm run build

sudo systemctl restart gomoku-fe.service
