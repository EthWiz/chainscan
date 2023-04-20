#!/usr/bin/env zsh

# Function to run a command in a new tab
new_tab() {
  osascript -e "tell application \"Terminal\" to activate" \
            -e "tell application \"System Events\" to tell process \"Terminal\" to keystroke \"t\" using command down" \
            -e "tell application \"Terminal\" to do script \"${1}\" in selected tab of the front window"
}

# Start the Python scripts
new_tab "python /Users/amitairuskin/Desktop/coding/telegram-event-listener/chain-listener/event-notifier.py"
new_tab "python /Users/amitairuskin/Desktop/coding/telegram-event-listener/chain-listener/event-register.py"

# Start the Node.js script
new_tab "node /Users/amitairuskin/Desktop/coding/telegram-event-listener/telegram-bot/bot.js"