#!/bin/sh
set -e
set -u

docker build -f Dockerfile -t docker.io/olexii4dockerid/license-tool:next .
