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

import { v1beta } from "@google-cloud/discoveryengine";
import { got } from "got-scraping";
import { ENV } from "./env.js";

interface SearchResult {
	title: string;
	link: string;
	snippet: string;
}

const GOOGLE_SEARCH_URL = "https://customsearch.googleapis.com/customsearch/v1";

/** @deprecated Use searchLite instead */
export async function search(q: string) {
	const url = new URL(GOOGLE_SEARCH_URL);
	url.searchParams.set("cx", ENV.GOOGLE_SEARCH_ENGINE_ID);
	url.searchParams.set("key", ENV.GOOGLE_API_KEY);
	url.searchParams.set("q", q);

	const data = await got(url).json<{
		items?: SearchResult[];
	}>();

	return data.items ?? [];
}

const discoveryEngineClient = new v1beta.SearchServiceClient({
	apiKey: ENV.GOOGLE_API_KEY,
});

const location = "global";
const collectionId = "default_collection";
const servingConfigId = "default_config";

export async function searchLite(
	query: string,
	limit = 10,
): Promise<SearchResult[]> {
	const results: SearchResult[] = [];

	for await (const result of discoveryEngineClient.searchLiteAsync({
		query,
		servingConfig: `projects/${ENV.GOOGLE_PROJECT_NUMBER}/locations/${location}/collections/${collectionId}/engines/${ENV.GOOGLE_DISCOVERY_ENGINE_ID}/servingConfigs/${servingConfigId}`,
		contentSearchSpec: {
			snippetSpec: {
				returnSnippet: true,
			},
		},
		relevanceThreshold: "HIGH",
		languageCode: "en",
	})) {
		if (result.document) {
			const transformedResult: SearchResult = {
				title:
					result.document.derivedStructData?.fields?.title?.stringValue || "",
				link:
					result.document.derivedStructData?.fields?.link?.stringValue || "",
				snippet:
					result.document.derivedStructData?.fields?.snippets?.listValue
						?.values?.[0]?.structValue?.fields?.snippet?.stringValue || "",
			};

			if (
				transformedResult.link &&
				transformedResult.title &&
				// skip language duplicates that show up when few results are returned
				// TODO use filtering in the search query
				!new URL(transformedResult.link).searchParams.has("hl")
			) {
				results.push(transformedResult);
			}
		}

		if (results.length >= limit) {
			break;
		}
	}
	return results;
}
