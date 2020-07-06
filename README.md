# Container wrapper for Eclipse Dash License Tool

It's container wrapper for (The Eclipse Dash License Tool)[https://github.com/eclipse/dash-licenses] that allows easily to generate dependencies files with container image without need to compile dash-licenses jar.

## Requirements

- Docker

## Quick start

```sh
docker run -i -v ${PWD}/yarn.lock:/home/workspace/yarn.lock  -v ${PWD}/.deps:/home/workspace/.deps  olexii4dockerid/license-tool:next /bin/bash << COMMANDS
chown -rw $(id -u):$(id -u) /home/workspace/.deps
COMMANDS
```
