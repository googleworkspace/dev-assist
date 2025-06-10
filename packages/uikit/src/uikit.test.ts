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

import { describe, expect, it } from "vitest";

import { encodeCard, getScreenshot } from "./uikit.js";

import zlib from "node:zlib";

declare global {
	namespace jest {
		interface Matchers<R> {
			toMatchImageSnapshot(): R;
		}
	}
}

function decodeCard(base64String: string): object {
	const buffer = Buffer.from(base64String, "base64");
	const jsonString = zlib.gunzipSync(buffer).toString("utf8");
	return JSON.parse(jsonString);
}

describe("encodeCard", () => {
	it("should correctly encode and decode a simple JSON object", () => {
		const originalObject = { message: "hello world", status: 200 };

		const encoded = encodeCard(originalObject);
		const decoded = decodeCard(encoded);

		// The decoded object should be identical to the original.
		expect(decoded).toEqual(originalObject);
	});

	it("should correctly encode and decode a complex, nested card object", () => {
		const originalCard = {
			header: {
				title: "Card Title",
				subtitle: "Card Subtitle",
				imageUrl:
					"https://developers.google.com/chat/images/quickstart-app-avatar.png",
				imageType: "SQUARE",
			},
			sections: [
				{
					widgets: [
						{
							textParagraph: {
								text: "This is a test paragraph with some widgets.",
							},
						},
					],
				},
			],
		};

		const encoded = encodeCard(originalCard);
		const decoded = decodeCard(encoded);

		expect(decoded).toEqual(originalCard);
	});

	it("should handle an empty object {}", () => {
		const originalObject = {};

		const encoded = encodeCard(originalObject);
		const decoded = decodeCard(encoded);

		expect(decoded).toEqual(originalObject);
	});

	it("should handle an object with various data types", () => {
		const originalObject = {
			stringValue: "some text",
			numberValue: 123.456,
			booleanValue: true,
			nullValue: null,
			arrayValue: [1, "a", false, { nestedKey: "nestedValue" }],
		};

		const encoded = encodeCard(originalObject);
		const decoded = decodeCard(encoded);

		expect(decoded).toEqual(originalObject);
	});

	it("should produce a non-empty string for any valid JSON input", () => {
		const originalObject = { a: 1 };

		const encoded = encodeCard(originalObject);

		expect(typeof encoded).toBe("string");
		expect(encoded.length).toBeGreaterThan(0);
	});
});

describe("getScreenshot", async () => {
	it.skip("should return a rendering of uikit card", async () => {
		const card = {
			header: {
				title: "Test Card",
				subtitle: "This is a real integration test",
			},
			sections: [
				{
					widgets: [
						{
							textParagraph: { text: "Hello from the test!" },
						},
					],
				},
			],
		};

		const data = await getScreenshot(card);
		expect(typeof data).toBe("string");
		expect(data.length).toBeGreaterThan(0);
		expect(data).toMatchImageSnapshot({
			comparisonMethod: "ssim",
			allowSizeMismatch: true,
			failureThreshold: 0.1,
			failureThresholdType: "percent",
			blur: 2,
		});
	});
});
