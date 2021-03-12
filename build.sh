#!/bin/sh
set -e
set -u

docker build -f Dockerfile -t quay.io/che-incubator/che-dashboard-next:nodejs-license-tool .
