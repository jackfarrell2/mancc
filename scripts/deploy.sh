#!/bin/bash
SERVER=mancc
set -e
if [[ -z "$SERVER" ]]
then
    echo "ERROR: No value set for SERVER."
    exit 1
fi

echo -e "\n>>> Copying files to the server."
ssh root@$SERVER "rm -rf /root/mancc"
ssh root@$SERVER "mkdir mancc"
scp -r build/* root@$SERVER:/root/mancc
echo -e "\n Copied files to the server"


ssh root@$SERVER /bin/bash << EOF

echo -e "\n>>> Deleting old files"
rm -rf /app/mancc

echo -e "\n>>> Copying new files"
cp -r /root/mancc /app/mancc


EOF


echo -e "\n>>> Finished installing React project on server."