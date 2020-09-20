#!/bin/bash 
 docker run --rm \
 --env ELECTRON_CACHE="/root/.cache/electron" \
 --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
 -v ${PWD}:/project \
 -v ~/.cache/electron:/root/.cache/electron \
 -v ~/.cache/electron-builder:/root/.cache/electron-builder \
 electronuserland/builder:wine \
 /bin/bash -c "yarn cross-env NODE_ENV=production node task-runner.js cp-html-to-dist && yarn cross-env NODE_ENV=production node task-runner.js build-main && yarn cross-env NODE_ENV=production node task-runner.js build-renderer  && yarn cross-env NODE_ENV=production electron-builder $1 $2"
