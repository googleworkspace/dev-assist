/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PACKAGES_DIRECTORY = "packages";

const readmeFiles = readdirSync(PACKAGES_DIRECTORY, { withFileTypes: true })
	.filter((dirent) => dirent.isDirectory())
	.map((dirent) => {
		return readFileSync(
			join(PACKAGES_DIRECTORY, dirent.name, "README.md"),
			"utf8",
		)
			.split("## ")[0]
			.trim()
			.replace(/# (.*)/g, `### [$1](${PACKAGES_DIRECTORY}/${dirent.name})`);
	})
	.join("\n\n");

const readmePath = join("README.md");
const readmeContent = readFileSync(readmePath, "utf8");

const startMarker = "<!-- packages -->";
const endMarker = "<!-- /packages -->";

const readmeContentLines = readmeContent.split("\n");
const startIdx = readmeContentLines.indexOf(startMarker);
const endIdx = readmeContentLines.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1 || startIdx >= endIdx) {
	throw new Error(
		`Invalid markers in README.md. Please ensure the file contains ${startMarker} before ${endMarker}.`,
	);
}
const updatedLines = [
	...readmeContentLines.slice(0, startIdx + 1),
	"",
	readmeFiles,
	"",
	...readmeContentLines.slice(endIdx),
];

writeFileSync(readmePath, updatedLines.join("\n"), "utf8");
