#!/usr/bin/env bash

# Copy service spec to system directory
sudo cp scripts/gomoku-fe.service /etc/systemd/system/

# Restart systemd
sudo systemctl daemon-reload
sudo systemctl enable gomoku-fe.service
sudo systemctl start gomoku-fe.service

