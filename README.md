Update OS
sudo apt-get update
sudo apt-get upgrade
sudo apt-get dist-upgrade
sudo apt autoremove
sudo apt install -f


Install git
sudo apt install git


Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
nvm install 20.10.0
nvm use v20.10.0
apt install g++ make python
npm install --global yarn
n=$(which node);n=${n%/bin/node}; chmod -R 755 $n/bin/*; sudo cp -r $n/{bin,lib,share} /usr/local


Docker
https://docs.docker.com/engine/install/ubuntu/

curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
dockerd-rootless-setuptool.sh install
sudo chown $USER /var/run/docker.sock
sudo systemctl restart docker


RUN application
docker-compose up -d