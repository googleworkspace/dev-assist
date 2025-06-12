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

import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

export const ENV = z
	.object({
		PORT: z.coerce.number().default(Number(process.env.PORT) || 8080),
		GOOGLE_API_KEY: z.string(),
		GOOGLE_SEARCH_ENGINE_ID: z.string().default("701ecba480bf443fa"),
		GOOGLE_DISCOVERY_ENGINE_ID: z
			.string()
			.default("mcp-dev-assist_1749747393714"),
		GOOGLE_PROJECT_NUMBER: z.number().default(594592560835),
	})
	.parse(process.env);
