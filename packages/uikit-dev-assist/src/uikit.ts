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

import zlib from "node:zlib";
import { chromium } from "playwright";

/**
 * Encodes a JavaScript object into a Base64 string after compressing it with GZIP.
 *
 * @param jsonObject - The JavaScript object to encode.
 * @returns A Base64 encoded string of the compressed JSON object.
 */
export function encodeCard(jsonObject: Record<string, unknown>): string {
	// 1. Convert the JavaScript object to a JSON string.
	const jsonString = JSON.stringify(jsonObject);

	// 2. Compress the JSON string using GZIP.
	const gzipBuffer = zlib.gzipSync(jsonString);

	// 3. Convert the compressed GZIP buffer to a Base64 string.
	const base64String = gzipBuffer.toString("base64");

	return base64String;
}

export async function getScreenshot(
	card: Record<string, unknown>,
): Promise<string> {
	const url = new URL("https://addons.gsuite.google.com/uikit/builder");

	url.searchParams.set("card", encodeCard(card));

	const browser = await chromium.launch();
	const page = await browser.newPage();

	await page.goto(url.toString(), {});

	const executeButton = page.locator('button[aria-label="Execute"]');
	await executeButton.click();
	await page.waitForTimeout(2000);

	const rendered = page
		.locator("[data-auto-complete-callback-function-data]")
		.first();

	await rendered.evaluate((el) => {
		el.style.border = "0";
	});

	const screenshot = (await rendered.screenshot()).toString("base64");

	await browser.close();

	return screenshot;
}
