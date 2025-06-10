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
import { toAbsoluteUrl, toMarkdown } from "./utils.js";

describe("toMarkdown", () => {
	it("should convert html to markdown", async () => {
		const html = "<p>hello world</p>";
		const markdown = toMarkdown(html, new URL("https://example.com"));
		await expect(markdown).resolves.toMatchInlineSnapshot(`"hello world"`);
	});

	it("should remove images and videos", async () => {
		const html = `<img src="https://example.com/image.png" alt="image" />`;
		const markdown = toMarkdown(html, new URL("https://example.com"));
		await expect(markdown).resolves.toMatchInlineSnapshot(`""`);
	});

	it("should remove video tags", async () => {
		const html = `<video src="https://example.com/video.mp4"></video>`;
		const markdown = toMarkdown(html, new URL("https://example.com"));
		await expect(markdown).resolves.toMatchInlineSnapshot(
			`"[](https://example.com/video.mp4)"`,
		);
	});

	it("should remove empty paragraphs", async () => {
		const emptyP = toMarkdown("<p></p>", new URL("https://example.com"));
		await expect(emptyP).resolves.toMatchInlineSnapshot(`""`);

		const nonEmptyP = toMarkdown(
			"<p>not empty</p>",
			new URL("https://example.com"),
		);
		await expect(nonEmptyP).resolves.toMatchInlineSnapshot(`"not empty"`);

		const whitespaceP = toMarkdown("<p>  </p>", new URL("https://example.com"));
		await expect(whitespaceP).resolves.toMatchInlineSnapshot(`""`);

		const mixedP = toMarkdown(
			"<p></p><p>hello</p><p>  </p><p>world</p>",
			new URL("https://example.com"),
		);
		await expect(mixedP).resolves.toMatchInlineSnapshot(`
			"hello

			world"
		`);
	});

	describe("code", () => {
		it("should remove empty code blocks", async () => {
			const html = "<pre><code>\n\n\n</code></pre>";
			const markdown = toMarkdown(html, new URL("https://example.com"));
			await expect(markdown).resolves.toMatchInlineSnapshot(`""`);
		});

		it("should remove empty inline code", async () => {
			const html = "<code></code>";
			const markdown = toMarkdown(html, new URL("https://example.com"));
			await expect(markdown).resolves.toMatchInlineSnapshot(`""`);
		});

		it("should render devsite-code", async () => {
			const html = `<devsite-code data-copy-event-label=""><div class="devsite-code-buttons-container" role="group" aria-label="Action buttons"><button type="button" class="gc-analytics-event material-icons devsite-explain-code" data-category="Site-Wide Custom Events" data-label="Explain This Code" aria-label="Explain this code" data-title="Explain this code"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><g><path d="M16 22L13 19L16 16L19 19L16 22ZM8 19L2 13L8 7L14 13L8 19ZM17.5 12C17.5 10.4667 16.9667 9.16667 15.9 8.1C14.8333 7.03333 13.5333 6.5 12 6.5C13.5333 6.5 14.8333 5.96667 15.9 4.9C16.9667 3.83333 17.5 2.53333 17.5 0.999999C17.5 2.53333 18.0333 3.83333 19.1 4.9C20.1667 5.96667 21.4667 6.5 23 6.5C21.4667 6.5 20.1667 7.03333 19.1 8.1C18.0333 9.16667 17.5 10.4667 17.5 12Z" fill="#444746"></path></g></svg></button><button type="button" class="gc-analytics-event material-icons devsite-icon-code-dark devsite-toggle-dark" data-category="Site-Wide Custom Events" data-label="Dark Code Toggle" track-type="exampleCode" track-name="darkCodeToggle" aria-label="Dark code theme" data-title="Dark code theme"></button><button type="button" class="gc-analytics-event material-icons devsite-icon-code-light devsite-toggle-light" data-category="Site-Wide Custom Events" data-label="Light Code Toggle" track-type="exampleCode" track-name="lightCodeToggle" aria-label="Light code theme" data-title="Light code theme"></button><button type="button" class="gc-analytics-event material-icons devsite-icon-copy" data-category="Site-Wide Custom Events" data-label="Click To Copy" track-type="exampleCode" track-name="clickToCopy" aria-label="Copy code sample" data-title="Copy code sample"></button></div><pre class="" track-metadata-position="googleworkspace/java-samples/drive/snippets/drive_v3/src/main/java/UploadWithConversion.java/main/drive_upload_with_conversion" data-code-snippet="true" data-github-path="googleworkspace/java-samples/drive/snippets/drive_v3/src/main/java/UploadWithConversion.java" data-git-revision="main" data-region-tag="drive_upload_with_conversion" translate="no" dir="ltr" is-upgraded="" syntax="Java"><span class="devsite-syntax-kn">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nn">com.google.api.client.googleapis.json.GoogleJsonResponseException</span><span class="devsite-syntax-p">;</span>
<span class="devsite-syntax-kn">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nn">com.google.api.client.http.FileContent</span><span class="devsite-syntax-p">;</span>
<span class="devsite-syntax-kn">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nn">com.google.api.client.http.HttpRequestInitializer</span><span class="devsite-syntax-p">;</span>
<span class="devsite-syntax-kn">import</span><span class="devsite-syntax-w"> </span><span class="devsite-syntax-nn">com.google.api.client.http.javanet.NetHttpTransport</span><span class="devsite-syntax-p">;</span>
</pre></devsite-code>`;
			await expect(
				toMarkdown(html, new URL("https://example.com")),
			).resolves.toMatchInlineSnapshot(`
      "\`\`\`java
      import com.google.api.client.googleapis.json.GoogleJsonResponseException;
      import com.google.api.client.http.FileContent;
      import com.google.api.client.http.HttpRequestInitializer;
      import com.google.api.client.http.javanet.NetHttpTransport;

      \`\`\`"
    `);
		});

		it("should handle pre tag with syntax property (python) and convert to lang", async () => {
			const html = `<pre syntax="python">print("hello")</pre>`;
			const markdown = toMarkdown(html, new URL("https://example.com"));
			await expect(markdown).resolves.toMatchInlineSnapshot(`
			"\`\`\`python
			print("hello")
			\`\`\`"
		`);
		});

		it("should handle pre tag with lowercase syntax property", async () => {
			const html = `<pre syntax="javascript">console.log("hello")</pre>`;
			const markdown = toMarkdown(html, new URL("https://example.com"));
			await expect(markdown).resolves.toMatchInlineSnapshot(`
			"\`\`\`javascript
			console.log("hello")
			\`\`\`"
		`);
		});

		it("should handle pre tag without syntax property", async () => {
			const html = "<pre>some code</pre>";
			const markdown = toMarkdown(html, new URL("https://example.com"));
			// Defaults to 'undefined' lang, which remarkStringify might omit or handle as plain text
			await expect(markdown).resolves.toMatchInlineSnapshot(
				`
				"\`\`\`undefined
				some code
				\`\`\`"
			`,
			);
		});

		it("should add className to pre tag for syntax highlighting", async () => {
			const html = `<pre syntax="CSS">body { color: red; }</pre>`;
			// This test primarily checks the internal transformation within the unified pipeline
			// The final markdown output will show the lang.
			// The purpose of adding className is for rehype plugins before rehypeRemark.
			const markdown = toMarkdown(html, new URL("https://example.com"));
			await expect(markdown).resolves.toMatchInlineSnapshot(`
			"\`\`\`css
			body { color: red; }
			\`\`\`"
		`);
		});
	});

	describe("links", () => {
		it("should convert absolute links to include hostname", async () => {
			const html = `<a href="/foo">foo</a>`;
			const markdown = toMarkdown(html, new URL("https://example.com"));
			await expect(markdown).resolves.toMatchInlineSnapshot(
				`"[foo](https://example.com/foo)"`,
			);
		});

		it("should convert relative links to include hostname", async () => {
			const html = `<a href="../foo">foo</a>`;
			const markdown = toMarkdown(html, new URL("https://example.com"));
			await expect(markdown).resolves.toMatchInlineSnapshot(
				`"[foo](https://example.com/foo)"`,
			);
		});

		it("should handle links with query parameters", async () => {
			const html = `<a href="/foo?bar=baz&qux=123">foo</a>`;
			const markdown = toMarkdown(html, new URL("https://example.com"));
			await expect(markdown).resolves.toMatchInlineSnapshot(
				`"[foo](https://example.com/foo?bar=baz\\&qux=123)"`,
			);
		});

		it("should handle links with fragments/anchors", async () => {
			const html = `<a href="/foo#section">foo</a>`;
			const markdown = toMarkdown(html, new URL("https://example.com"));
			await expect(markdown).resolves.toMatchInlineSnapshot(
				`"[foo](https://example.com/foo#section)"`,
			);
		});

		it("should handle links with special characters", async () => {
			const html = `<a href="/foo/bar with spaces/特殊文字">foo</a>`;
			const markdown = toMarkdown(html, new URL("https://example.com"));
			await expect(markdown).resolves.toMatchInlineSnapshot(
				`"[foo](https://example.com/foo/bar%20with%20spaces/%E7%89%B9%E6%AE%8A%E6%96%87%E5%AD%97)"`,
			);
		});

		it("should not modify external absolute links", async () => {
			const html = `<a href="https://example.com/foo">foo</a>`;
			const markdown = toMarkdown(html, new URL("https://example.com"));
			await expect(markdown).resolves.toMatchInlineSnapshot(
				`"[foo](https://example.com/foo)"`,
			);
		});

		it("should handle empty href links", async () => {
			const html = `<a href="">foo</a>`;
			const markdown = toMarkdown(html, new URL("https://example.com"));
			await expect(markdown).resolves.toMatchInlineSnapshot(`"[foo]()"`);
		});

		it("should replace developers.google.com links", async () => {
			const html = `<a href="/foo">foo</a>`;
			const markdown = toMarkdown(
				html,
				new URL("https://developers.google.com"),
			);
			await expect(markdown).resolves.toMatchInlineSnapshot(
				`"[foo](https://developers.google.com/foo)"`,
			);
		});
		describe("transformLinkToResource", () => {
			const DGC = new URL("https://developers.google.com");
			const EXAMPLE = new URL("https://example.com");

			it.each([
				["", DGC, ""],
				["#foo", DGC, "#foo"],
				["mailto:foo@example.com", DGC, "mailto:foo@example.com"],
				["tel:+123456789", DGC, "tel:+123456789"],
				["ftp://example.com", DGC, "ftp://example.com"],
				["foo", DGC, "https://developers.google.com/foo"],
				["foo/with/path", DGC, "https://developers.google.com/foo/with/path"],
				["/foo", DGC, "https://developers.google.com/foo"],
				["./foo", DGC, "https://developers.google.com/foo"],
				[
					"./foo",
					new URL("/baz/bar", DGC),
					"https://developers.google.com/baz/foo",
				],
				[
					"../foo",
					new URL("/baz/bar", DGC),
					"https://developers.google.com/foo",
				],
				["/foo", EXAMPLE, "https://example.com/foo"],
				["//developers.google.com", DGC, "https://developers.google.com/"],
				["http://developers.google.com", DGC, "http://developers.google.com/"],
				[
					"https://developers.google.com",
					DGC,
					"https://developers.google.com/",
				],
				["//example.com", EXAMPLE, "https://example.com/"],
				["http://example.com", EXAMPLE, "http://example.com/"],
				["https://example.com", EXAMPLE, "https://example.com/"],
			])("should transform '%s' to '%s'", (url, contentUrl, expected) => {
				expect(toAbsoluteUrl(url, contentUrl)).toBe(expected);
			});
		});
	});
});
