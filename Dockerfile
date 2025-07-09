# Copyright 2025 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

FROM mcr.microsoft.com/playwright:v1.53.2 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app

RUN pnpm install --frozen-lockfile
RUN pnpm build
RUN pnpm deploy --filter="@googleworkspace/mcp-dev-assist" --prod /prod/mcp-dev-assist

FROM base AS mcp-dev-assist
COPY --from=build /prod/mcp-dev-assist /prod/mcp-dev-assist
WORKDIR /prod/mcp-dev-assist
EXPOSE 8000
CMD [ "node", "dist/index.js" ]
