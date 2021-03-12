# Container wrapper for Eclipse Dash License Tool

It's container wrapper for (The Eclipse Dash License Tool)[https://github.com/eclipse/dash-licenses] that allows easily to generate dependencies files with container image without need to compile dash-licenses jar.

## Requirements

- Docker

## Quick start

```sh
$ ./build.sh
```

## Running
```sh
docker run --rm -t -v ${PWD}/yarn.lock:/workspace/yarn.lock  \
       -v ${PWD}/package.json:/workspace/package.json  \
       -v ${PWD}/.deps:/workspace/.deps  \
       -v ${PWD}/.deps/tmp/DEPENDENCIES:/workspace/DEPENDENCIES \
       quay.io/che-incubator/che-dashboard-next:nodejs-license-tool
```
