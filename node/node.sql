sudo lsof -i -P -n | grep LISTEN
sudo lsof -iTCP:3000 -sTCP:LISTEN
kill -9 pid

sudo systemctl start mongod
sudo systemctl stop mongod