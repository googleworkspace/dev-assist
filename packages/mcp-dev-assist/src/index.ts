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

import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { app } from "./app.js";
import { ENV } from "./lib/env.js";
import { createServer } from "./lib/mcp.js";

async function main() {
	if (process.argv.includes("--stdio")) {
		const server = createServer();
		const transport = new StdioServerTransport();
		await server.connect(transport);
		console.log("MCP Stdio Server listening on stdin/stdout");
	} else {
		// Create server and listen on the specified port
		const server = app.listen(ENV.PORT, () => {
			console.log(
				`MCP Stateless Streamable HTTP Server listening on port ${ENV.PORT}`,
			);
		});

		// Handle graceful shutdown for different signals
		const shutdownGracefully = async (signal: string) => {
			console.log(`Received ${signal}. Shutting down server gracefully...`);
			server.close(() => {
				console.log("Server closed successfully");
				process.exit(0);
			});

			// Force close after timeout
			setTimeout(() => {
				console.log("Forcing server shutdown after timeout");
				process.exit(1);
			}, 10000);
		};

		// Cloud Run sends SIGTERM for graceful shutdown
		process.on("SIGTERM", () => shutdownGracefully("SIGTERM"));
		process.on("SIGINT", () => shutdownGracefully("SIGINT"));
	}
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
