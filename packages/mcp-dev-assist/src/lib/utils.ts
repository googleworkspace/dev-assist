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

import type * as Hast from "hast";
import { isElement } from "hast-util-is-element";
import type * as MDast from "mdast";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { remove } from "unist-util-remove";
import { visit } from "unist-util-visit";

/**
 * Converts HTML to Markdown.
 * @param html The HTML to convert.
 * @param contentUrl The URL of the content.
 * @returns The Markdown.
 */
export async function toMarkdown(
	html: string,
	contentUrl: URL,
): Promise<string> {
	const result = await unified()
		.use(rehypeParse)
		.use(() => (tree) => {
			visit(tree, (node: Hast.Node) => {
				if (isElement(node) && node.tagName === "pre") {
					node.properties.className = `${node.properties.className} lang-${String(node.properties.syntax).toLowerCase()}`;
				}
			});
		})
		.use(rehypeRemark, {
			handlers: {
				pre: (state, node) => {
					const lang = String(node.properties.syntax).toLowerCase();
					const content = state
						.all(node)
						.filter((node) => node.type === "text")
						.map((node) => node.value)
						.join("");
					const result: MDast.Code = {
						type: "code",
						lang,
						value: content,
					};
					state.patch(node, result);
					return result;
				},
			},
		})
		.use(() => {
			return (tree) => {
				visit(tree, "link", (node: MDast.Link) => {
					node.url = toAbsoluteUrl(node.url, contentUrl);
				});
			};
		})
		.use(remarkGfm)
		.use(() => (tree) => {
			remove(
				tree,
				(node: MDast.Node) =>
					(isParagraph(node) && node.children.length === 0) ||
					node.type === "image" ||
					node.type === "video" ||
					(isInlineCode(node) && node.value === "") ||
					(isCode(node) && node.value === ""),
			);
		})
		.use(remarkStringify)
		.process(html);

	return result.value.toString().trim();
}

function isInlineCode(node: MDast.Node): node is MDast.InlineCode {
	return node.type === "inlineCode";
}

function isCode(node: MDast.Node): node is MDast.Code {
	return node.type === "code";
}

function isParagraph(node: MDast.Node): node is MDast.Paragraph {
	return node.type === "paragraph";
}

export function toAbsoluteUrl(url: string, contentUrl: URL): string {
	// Immediately return empty strings or pure fragment identifiers
	if (url === "" || url.startsWith("#")) {
		return url;
	}

	let absoluteUrl: URL;

	try {
		// Attempt to parse the URL directly. This handles:
		// - Absolute URLs (e.g., "https://example.com")
		// - Protocol-relative URLs (e.g., "//example.com") when a base is provided
		// - Relative paths (e.g., "page.html", "/path", "./path", "../path") when a base is provided.
		//   The URL constructor resolves them against 'contentUrl'.
		absoluteUrl = new URL(url, contentUrl);
	} catch (error) {
		// If new URL(url, contentUrl) fails, it might be because 'url' is malformed
		// or 'contentUrl' is not a valid base for it.
		// We can try to see if 'url' itself is a valid absolute URL.
		try {
			absoluteUrl = new URL(url);
		} catch (e) {
			console.error(
				`Failed to parse URL: "${url}" with base "${contentUrl}". Error: ${error}. Second attempt error: ${e}`,
			);
			return url; // Return original URL if all parsing attempts fail
		}
	}

	// After successful parsing, check the protocol.
	// If it's not HTTP or HTTPS, return the original URL to avoid processing non-web links.
	if (absoluteUrl.protocol !== "http:" && absoluteUrl.protocol !== "https:") {
		return url; // Return the original URL for non-HTTP/S protocols
	}

	return absoluteUrl.href;
}
