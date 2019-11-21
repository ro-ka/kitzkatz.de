#!/bin/bash

APP_NAME="kitzkatz.de"
SSH_HOST="robert@188.166.62.130"
APP_DIR="/var/www/$APP_NAME"

BUNDLE_CMD="tar -czf bundle.tgz ./"

echo Building...
grunt build
echo Deploying...
pushd "./dist"
$BUNDLE_CMD > /dev/null 2>&1 &&
popd
scp "./dist/bundle.tgz" $SSH_HOST:/tmp/ > /dev/null 2>&1 &&
rm "./dist/bundle.tgz" > /dev/null 2>&1 &&
ssh $SSH_HOST 'bash -s' > /dev/null 2>&1 <<ENDSSH
if [ ! -d "$APP_DIR" ]; then
  mkdir -p $APP_DIR
else
  rm -rf $APP_DIR/*
fi
pushd $APP_DIR
  tar xfz /tmp/bundle.tgz -C $APP_DIR
  rm /tmp/bundle.tgz
popd
ENDSSH
echo Done.
