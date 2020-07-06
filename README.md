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
docker run  --rm -i -t -v ${PWD}/yarn.lock:/home/workspace/yarn.lock -v ${PWD}/package.json:/home/workspace/package.json -v ${PWD}/.deps:/home/workspace/.deps  docker.io/olexii4dockerid/license-tool:next
```
