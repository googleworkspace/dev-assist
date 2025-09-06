#!/usr/bin/env node
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
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
	CallToolRequestSchema,
	CompleteRequestSchema,
	GetPromptRequestSchema,
	ListPromptsRequestSchema,
	ListResourceTemplatesRequestSchema,
	ListResourcesRequestSchema,
	ListToolsRequestSchema,
	LoggingMessageNotificationSchema,
	ReadResourceRequestSchema,
	ResourceUpdatedNotificationSchema,
	SubscribeRequestSchema,
	UnsubscribeRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import pkg from "../package.json" with { type: "json" };

async function main() {
	const transport = new StreamableHTTPClientTransport(
		new URL("http://34.102.165.10/mcp"),
	);
	const client = new Client(
		{
			name: pkg.name,
			description: pkg.description,
			version: pkg.version,
		},
		{
			capabilities: {},
		},
	);

	await client.connect(transport);

	const serverVersion = client.getServerVersion() as {
		name: string;
		version: string;
	};

	const serverCapabilities = client.getServerCapabilities();

	const server = new Server(serverVersion, {
		capabilities: serverCapabilities,
	});

	if (serverCapabilities?.logging) {
		server.setNotificationHandler(
			LoggingMessageNotificationSchema,
			async (args) => {
				return client.notification(args);
			},
		);
		client.setNotificationHandler(
			LoggingMessageNotificationSchema,
			async (args) => {
				return server.notification(args);
			},
		);
	}

	if (serverCapabilities?.prompts) {
		server.setRequestHandler(GetPromptRequestSchema, async (args) => {
			return client.getPrompt(args.params);
		});

		server.setRequestHandler(ListPromptsRequestSchema, async (args) => {
			return client.listPrompts(args.params);
		});
	}

	if (serverCapabilities?.resources) {
		server.setRequestHandler(ListResourcesRequestSchema, async (args) => {
			return client.listResources(args.params);
		});

		server.setRequestHandler(
			ListResourceTemplatesRequestSchema,
			async (args) => {
				return client.listResourceTemplates(args.params);
			},
		);

		server.setRequestHandler(ReadResourceRequestSchema, async (args) => {
			return client.readResource(args.params);
		});

		if (serverCapabilities?.resources.subscribe) {
			server.setNotificationHandler(
				ResourceUpdatedNotificationSchema,
				async (args) => {
					return client.notification(args);
				},
			);

			server.setRequestHandler(SubscribeRequestSchema, async (args) => {
				return client.subscribeResource(args.params);
			});

			server.setRequestHandler(UnsubscribeRequestSchema, async (args) => {
				return client.unsubscribeResource(args.params);
			});
		}
	}

	if (serverCapabilities?.tools) {
		server.setRequestHandler(CallToolRequestSchema, async (args) => {
			return client.callTool(args.params);
		});

		server.setRequestHandler(ListToolsRequestSchema, async (args) => {
			return client.listTools(args.params);
		});
	}

	server.setRequestHandler(CompleteRequestSchema, async (args) => {
		return client.complete(args.params);
	});

	// Connect and listen on stdio
	const stdioTransport = new StdioServerTransport();
	await server.connect(stdioTransport);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
