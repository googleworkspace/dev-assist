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

import { got } from "got-scraping";
import { ENV } from "./env.js";

interface SearchResult {
	title: string;
	link: string;
	snippet: string;
}

const GOOGLE_SEARCH_URL = "https://customsearch.googleapis.com/customsearch/v1";

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
