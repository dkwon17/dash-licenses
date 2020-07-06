# Copyright (c) 2019 Red Hat, Inc.
# This program and the accompanying materials are made
# available under the terms of the Eclipse Public License 2.0
# which is available at https://www.eclipse.org/legal/epl-2.0/
#
# SPDX-License-Identifier: EPL-2.0
#
# Contributors:
#   Red Hat, Inc. - initial API and implementation
FROM docker.io/openjdk:15-jdk

RUN curl -sL https://rpm.nodesource.com/setup_10.x | bash -

RUN yum install -y git nodejs

ARG MAVEN_VERSION=3.6.3
ARG BASE_URL=https://apache.osuosl.org/maven/maven-3/${MAVEN_VERSION}/binaries

RUN mkdir -p /usr/local/apache-maven /usr/local/apache-maven/ref \
  && curl -fsSL -o /tmp/apache-maven.tar.gz ${BASE_URL}/apache-maven-${MAVEN_VERSION}-bin.tar.gz \
  && tar -xzf /tmp/apache-maven.tar.gz -C /usr/local/apache-maven --strip-components=1 \
  && rm -f /tmp/apache-maven.tar.gz \
  && ln -s /usr/local/apache-maven/bin/mvn /usr/bin/mvn

RUN npm install yarn -g

RUN mkdir /home/workspace && cd /home/workspace && \
    git clone https://github.com/eclipse/dash-licenses.git && \
    cd /home/workspace/dash-licenses && mvn clean install && \
    cd /home/workspace/dash-licenses/yarn && yarn install

WORKDIR /home/workspace/

ADD ./src/entrypoint.sh /home/workspace/entrypoint.sh
ADD ./src/bump-deps.js /home/workspace/bump-deps.js

ENTRYPOINT ["/home/workspace/entrypoint.sh"]
