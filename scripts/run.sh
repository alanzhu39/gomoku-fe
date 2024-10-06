#!/usr/bin/env bash

# Source .env file
export $(cat .env | xargs)

# Start the server
/home/pi/.asdf/shims/npx serve -s build -l 4000

