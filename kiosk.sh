#!/bin/bash

sleep 15

xset s noblank
xset s off
xset -dpms

node ~/ydinvoimala/rpiclock/main.js &

unclutter -idle 0.5 -root &

sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/$USER/.config/chromium/Default/Preferences
sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/$USER/.config/chromium/Default/Preferences

sleep 5

chromium-browser --noerrdialogs --disable-infobars --kiosk http://localhost:8080