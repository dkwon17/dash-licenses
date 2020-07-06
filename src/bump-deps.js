/*
 * Copyright (c) 2018-2020 Red Hat, Inc.
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 *
 * Contributors:
 *   Red Hat, Inc. - initial API and implementation
 */

const { execSync } = require('child_process');
const { writeFileSync, existsSync, readFileSync } = require('fs');

// update depsMap
function parseFileData(fileData) {
  const pattern = /^(npm\/npmjs\/(-\/)?)?([^,^ ]+)\/([0-9].[0-9].[0-9]), ([^,]+), approved, (\w+)$/gm;

  const depsMap = new Map();
  let result;
  while ((result = pattern.exec(fileData)) !== null) {
    const key = `${result[3]}@${result[4]}`;
    const val = {
      license: result[5],
      cq: result[6]
    };
    depsMap.set(key, val);
  }
  return depsMap
}

function bufferToArray(buffer) {
  if (!buffer || !buffer.data || !buffer.data.trees) {
    return [];
  }
  return buffer.data.trees.map(entry => entry.name).sort();
}

function arrayToDocument(title, depsArray, depToCQ) {
  // document title
  let document = '### '+ title +'\n\n';
  // table header
  document += '| Packages | License | Resolved CQs |\n| --- | --- | --- |\n';
  // table body
  depsArray.forEach(item => {
    let license = '';
    let cq = '';
    if (depToCQ.has(item)) {
      const res = depToCQ.get(item);
      license = res.license || '';
      const cqNum = parseInt(res.cq.replace('CQ', ''), 10);
      if(cqNum) {
        cq = `[CQ${cqNum}](https://dev.eclipse.org/ipzilla/show_bug.cgi?id=${cqNum})`;
      } else if (res.cq) {
        cq = res.cq;
      }
    }
    document += `| \`${item}\` | ${license} | ${cq} |\n`;
  });

  return document;
}

const ALL_DEPENDENCIES = './DEPENDENCIES';
const PROD_PATH = '.deps/prod.md';
const DEV_PATH = '.deps/dev.md';
const ENCODING = 'utf8';

let depsToCQ = new Map();

// get resolved prod dependencies
if (existsSync(ALL_DEPENDENCIES)) {
  depsToCQ = parseFileData(readFileSync(ALL_DEPENDENCIES, ENCODING));
}

// prod dependencies
const prodDepsBuffer = execSync('yarn list --json --prod --depth=0');
const prodDeps = bufferToArray(JSON.parse(prodDepsBuffer));

// all dependencies
const allDepsBuffer = execSync('yarn list --json --depth=0');
const allDeps = bufferToArray(JSON.parse(allDepsBuffer))

// dev dependencies
const devDeps = allDeps.filter(entry => prodDeps.includes(entry) === false);

writeFileSync(PROD_PATH, arrayToDocument('Production dependencies', prodDeps, depsToCQ), ENCODING);
writeFileSync(DEV_PATH, arrayToDocument('Development dependencies', devDeps, depsToCQ), ENCODING);
