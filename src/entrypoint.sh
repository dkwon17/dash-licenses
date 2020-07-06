#!/bin/bash

# Validate yarn.lock
if [ -f yarn.lock ]; then
    echo "yarn.lock is present" && \
    node dash-licenses/yarn/index.js | \
    java -jar dash-licenses/target/org.eclipse.dash.licenses-0.0.1-SNAPSHOT.jar -
    echo "run bump-deps.js"
    node ./bump-deps.js
else
    echo "File yarn.lock is not present!!!"
fi
