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

import {
	McpServer,
	ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getResourceUri, read, releaseNotes } from "./read.js";
import { search } from "./search.js";

const INSTRUCTIONS = {
	DOCS: "Always read ALL MCP documentation resources, e.g. `docs://developers.google.com/**`, for the full document.",
	RELEASE_NOTES:
		"ALWAYS read MCP resource, `docs://release-notes`, for information about new features, changes, and bug fixes.",
};

export const createServer = () => {
	const server = new McpServer(
		{
			name: "google-workspace-docs-mcp",
			version: "1.0.0",
			description:
				"Google Workspace Docs MCP, provides access to Google Workspace documentation, release notes, and search functionality to find information about Google Workspace APIs and services.",
		},
		{ capabilities: { logging: {} } },
	);

	server.resource("Server Instructions", "docs://instructions", async (uri) => {
		return {
			contents: [
				{
					uri: uri.href,
					text: Object.values(INSTRUCTIONS).join("\n\n"),
				},
			],
		};
	});

	server.resource(
		"Google Workspace Release Notes",
		"docs://release-notes",
		async () => {
			const notes = await releaseNotes();
			return {
				contents: [
					{
						uri: "docs://release-notes",
						text: notes
							.map(
								(note) =>
									`${new Date(note.updated).toLocaleDateString()}\n\n${note.markdown}`,
							)
							.join("\n\n---\n\n"),
					},
				],
			};
		},
	);

	server.resource(
		"Documentation - Read a specific Google documentation page.",
		new ResourceTemplate("docs://developers.google.com{+link}", {
			list: undefined,
		}),
		async (uri, { link }) => {
			const markdown = await read(
				new URL(`https://developers.google.com${link}`),
			);
			return {
				contents: [
					{
						uri: uri.href,
						text: markdown,
					},
				],
			};
		},
	);

	server.resource(
		"Newsletters - Get the latest news about Google Workspace from the Google Workspace Developer newsletters.",
		"docs://newsletters",
		async (uri) => {
			const markdown = await read(
				new URL("https://developers.google.com/workspace/newsletters"),
			);
			return {
				contents: [
					{
						uri: uri.href,
						text: markdown,
					},
				],
			};
		},
	);

	server.tool(
		"search_latest_official_google_documentation",
		"Searches the latest official Google Workspace documentation, including API references, conceptual guides, tutorials, and code examples. Ideal for finding authoritative and up-to-date information on Google Workspace APIs, directly from the source. Use this when you need reliable details on specific features, functionalities, or development tasks within the Google Workspace ecosystem. Read the server instructions, `docs://instructions`, before using this tool.",
		{
			query: z
				.string()
				.min(5, "Query must be at least 5 characters long")
				.describe(
					"Specific Google Workspace topic, API, method, or feature to search for in the official documentation (e.g., 'Google Sheets API append values', 'Gmail draft creation', 'Calendar event creation'). The query can also use negation with '-' and require terms with '\"' (e.g., 'Google \"Sheets\" API append values -draft').",
				),
		},
		{
			title: "Search Latest Google Workspace Documentation",
			readOnlyHint: true,
			destructiveHint: false,
			idempotentHint: true,
			openWorldHint: true,
		},
		async ({ query }) => {
			if (query.toLowerCase().includes("release notes")) {
				return {
					content: [
						{
							type: "text",
							text: INSTRUCTIONS.RELEASE_NOTES,
						},
					],
				};
			}

			const searchResults = await search(query);
			const TOP_N = 3;

			// read the first TOP_N results
			const resultsWithMarkdown = await Promise.all(
				searchResults.slice(0, TOP_N).map(async (result) => {
					const markdown = await read(new URL(result.link));
					return {
						...result,
						markdown,
					};
				}),
			);

			// remaining results without markdown
			const remainingSearchResults = searchResults.slice(TOP_N);

			const text = [
				"## Results",
				...resultsWithMarkdown.flatMap(({ link, markdown }) => [
					`### ${getResourceUri(new URL(link))}`,
					markdown,
				]),
				"## Additional results that must be read manually:",
				remainingSearchResults
					.map(
						({ link, title }) =>
							`- ${getResourceUri(new URL(link))} - ${title}`,
					)
					.join("\n"),
				// repeat server instructions
				...Object.values(INSTRUCTIONS),
			].join("\n\n");

			return {
				content: [
					{
						type: "text",
						text,
					},
				],
			};
		},
	);

	server.tool(
		"read_official_google_documentation_page",
		"Reads a specific Google documentation page. Use this when you need to read a specific documentation page instead of using a web browser. Provides special handling for links to Google documentation pages.",
		{
			link: z
				.string()
				.regex(
					/^(docs|https)?:\/\/(developers|cloud).google.com\//,
					"Link must be a URL to a Google documentation page.",
				)
				.describe("Link to the documentation page."),
		},
		{
			title: "Read Google Documentation Page",
			readOnlyHint: true,
			destructiveHint: false,
			idempotentHint: true,
			openWorldHint: true,
		},
		async ({ link }) => {
			link = link.replace("docs://", "https://");
			const markdown = await read(new URL(link));
			return {
				content: [
					{
						type: "text",
						text: markdown,
					},
				],
			};
		},
	);

	return server;
};
