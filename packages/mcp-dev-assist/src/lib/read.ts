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

import * as cheerio from "cheerio";
import { got, gotScraping } from "got-scraping";
import { toMarkdown } from "./utils.js";

export async function getDocumentationPageMarkdown(uri: URL): Promise<string> {
	const mdUri = new URL(uri);
	mdUri.pathname += ".md.txt";

	const mdResponse = await gotScraping(mdUri.toString());

	if (mdResponse.ok) {
		return mdResponse.body;
	}

	const htmlResponse = await gotScraping(uri.toString());

	if (!htmlResponse.ok) {
		console.log(htmlResponse);
		throw new Error(
			`Failed to fetch document content: ${htmlResponse.statusMessage}`,
		);
	}

	const $ = cheerio.load(htmlResponse.body);
	const content = $(".devsite-article-body").html() ?? $("main").html();

	if (!content) {
		throw new Error(
			`Failed to fetch document content: ${htmlResponse.statusMessage}`,
		);
	}

	const markdown = await toMarkdown(content, uri);

	return markdown;
}

export async function getReleaseNotes(): Promise<
	{ updated: string; id: string; markdown: string }[]
> {
	const feeds = [
		"https://developers.google.com/feeds/admin-sdk-release-notes.xml",
		"https://developers.google.com/feeds/apps-script-release-notes.xml",
		"https://developers.google.com/feeds/calendar-release-notes.xml",
		"https://developers.google.com/feeds/chat-release-notes.xml",
		"https://developers.google.com/feeds/cloud-search-release-notes.xml",
		"https://developers.google.com/feeds/docs-release-notes.xml",
		"https://developers.google.com/feeds/drive-release-notes.xml",
		"https://developers.google.com/feeds/forms-release-notes.xml",
		"https://developers.google.com/feeds/gmail-release-notes.xml",
		"https://developers.google.com/feeds/gsuiteaddons-release-notes.xml",
		"https://developers.google.com/feeds/keep-release-notes.xml",
		"https://developers.google.com/feeds/marketplace-release-notes.xml",
		"https://developers.google.com/feeds/meet-release-notes.xml",
		"https://developers.google.com/feeds/sheets-release-notes.xml",
		"https://developers.google.com/feeds/slides-release-notes.xml",
		"https://developers.google.com/feeds/tasks-release-notes.xml",
		"https://developers.google.com/feeds/vault-release-notes.xml",
		"https://developers.google.com/feeds/workspaceevents-release-notes.xml",
	];

	const xmlFeeds: string[] = await Promise.all(
		feeds.map((feed) => got(feed).text()),
	);

	const releaseNotes: { updated: string; id: string; markdown: string }[] = [];

	for (const xmlFeed of xmlFeeds) {
		const $ = cheerio.load(xmlFeed, {
			xmlMode: true,
		});

		for (const entry of $("entry")) {
			const updated = $(entry).find("updated").text();
			const id = $(entry).find("id").text();
			const html = $(entry)
				.find("content")
				.text()
				.replace("<![CDATA[", "")
				.replace("]]>", "")
				.trim();
			const markdown = await toMarkdown(
				html,
				new URL("https://developers.google.com"),
			);

			// if updated within last 6 months
			if (
				updated >
				new Date(Date.now() - 6 * 30 * 24 * 60 * 60 * 1000).toISOString()
			) {
				releaseNotes.push({ updated, id, markdown });
			}
		}
	}

	releaseNotes.sort((a, b) => b.updated.localeCompare(a.updated));

	return releaseNotes;
}
