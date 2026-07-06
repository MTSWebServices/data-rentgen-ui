import {
    CreateParams,
    DataProvider,
    DeleteParams,
    GetListParams,
    GetManyParams,
    GetOneParams,
    QueryFunctionContext,
    UpdateParams,
} from "react-admin";
import { parseResponse, getURL, getHeaders } from "./utils";

type GetLineageParams = {
    id: number | string;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    filter?: any;
    /* eslint-disable @typescript-eslint/no-explicit-any */
    meta?: any;
};

const camelCaseToKebabCase = (str: string): string =>
    str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

const camelCaseToSnakeCase = (str: string): string =>
    str.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();

const defaultDataProvider: DataProvider = {
    deleteMany: () => Promise.resolve({}),
    updateMany: () => Promise.resolve({}),
    getList: async (
        resource: string,
        params: GetListParams & QueryFunctionContext,
    ) => {
        const url = getURL(`/v1/${camelCaseToKebabCase(resource)}`);

        for (const k in params.meta) {
            url.searchParams.append(k, params.meta[k]);
        }

        if (params.pagination) {
            url.searchParams.append("page", params.pagination.page.toString());
            url.searchParams.append(
                "page_size",
                params.pagination.perPage.toString(),
            );
        }

        if (params.filter) {
            for (const field in params.filter) {
                const value = params.filter[field];
                if (Array.isArray(value)) {
                    value.forEach((v) => {
                        url.searchParams.append(field, v);
                    });
                    continue;
                }
                url.searchParams.append(field, params.filter[field]);
            }
        }

        const response = await fetch(url.toString(), {
            method: "GET",
            signal: params.signal,
            headers: getHeaders(),
            credentials: "include",
        });

        const data = await parseResponse(response);
        return {
            data: data.items,
            total: data.meta.total_count,
            pageInfo: {
                hasNextPage: data.meta.has_next,
                hasPreviousPage: data.meta.has_previous,
            },
        };
    },
    getMany: async (
        resource: string,
        params: GetManyParams & QueryFunctionContext,
    ) => {
        const url = getURL(`/v1/${camelCaseToKebabCase(resource)}`);

        for (const k in params.meta) {
            url.searchParams.append(k, params.meta[k]);
        }

        // datasets -> dataset_id
        const resourceOne = resource.slice(0, -1);
        params.ids.forEach((id) => {
            url.searchParams.append(
                `${camelCaseToSnakeCase(resourceOne)}_id`,
                id.toString(),
            );
        });

        url.searchParams.append("page_size", params.ids.length.toString());

        const response = await fetch(url.toString(), {
            method: "GET",
            signal: params.signal,
            headers: getHeaders(),
            credentials: "include",
        });
        const data = await parseResponse(response);
        return {
            data: data.items,
        };
    },
    getManyReference: () => Promise.resolve({ data: [], total: 0 }),
    getOne: async (
        resource: string,
        params: GetOneParams & QueryFunctionContext,
    ) => {
        const url = getURL(`/v1/${camelCaseToKebabCase(resource)}`);

        for (const k in params.meta) {
            url.searchParams.append(k, params.meta[k]);
        }

        // datasets -> dataset_id
        const resourceOne = resource.slice(0, -1);
        url.searchParams.append(
            `${camelCaseToSnakeCase(resourceOne)}_id`,
            params.id.toString(),
        );

        const response = await fetch(url.toString(), {
            method: "GET",
            signal: params.signal,
            headers: getHeaders(),
            credentials: "include",
        });

        const data = await parseResponse(response);
        if (data.items.length === 0) {
            throw new Error("ra.page.not_found");
        }
        return { data: data.items[0] };
    },
    getLineage: async (
        resource: string,
        params: GetLineageParams & QueryFunctionContext,
    ) => {
        const url = getURL(`/v1/${camelCaseToKebabCase(resource)}/lineage`);
        url.searchParams.append("start_node_id", params.id.toString());

        for (const k in params.meta) {
            url.searchParams.append(k, params.meta[k]);
        }

        for (const k in params.filter) {
            if (params.filter[k]) {
                const filter = JSON.stringify(params.filter[k]).replaceAll(
                    /(^")|("$)/g,
                    "",
                );
                url.searchParams.append(k, filter);
            }
        }

        const response = await fetch(url.toString(), {
            method: "GET",
            signal: params.signal,
            headers: getHeaders(),
            credentials: "include",
        });
        return await parseResponse(response);
    },
    getHierarchy: async (
        resource: string,
        params: GetLineageParams & QueryFunctionContext,
    ) => {
        const url = getURL(`/v1/${camelCaseToKebabCase(resource)}/hierarchy`);
        url.searchParams.append("start_node_id", params.id.toString());

        for (const k in params.meta) {
            url.searchParams.append(k, params.meta[k]);
        }

        for (const k in params.filter) {
            if (params.filter[k]) {
                const filter = JSON.stringify(params.filter[k]).replaceAll(
                    /(^")|("$)/g,
                    "",
                );
                url.searchParams.append(k, filter);
            }
        }

        const response = await fetch(url.toString(), {
            method: "GET",
            signal: params.signal,
            headers: getHeaders(),
            credentials: "include",
        });
        return await parseResponse(response);
    },
    getLocationTypes: async (params: QueryFunctionContext) => {
        const url = getURL(`/v1/locations/types`);

        const response = await fetch(url.toString(), {
            method: "GET",
            signal: params.signal,
            headers: getHeaders(),
            credentials: "include",
        });
        return await parseResponse(response);
    },
    getJobTypes: async (params: QueryFunctionContext) => {
        const url = getURL(`/v1/jobs/types`);

        const response = await fetch(url.toString(), {
            method: "GET",
            signal: params.signal,
            headers: getHeaders(),
            credentials: "include",
        });
        return await parseResponse(response);
    },
    create: async (resource: string, params: CreateParams) => {
        const url = getURL(`/v1/${camelCaseToKebabCase(resource)}`);

        const headers = getHeaders();
        headers.set("Content-Type", "application/json");

        const response = await fetch(url.toString(), {
            method: "POST",
            body: JSON.stringify(params.data),
            headers: headers,
            credentials: "include",
        });
        const data = await parseResponse(response);
        return {
            data: data,
        };
    },
    update: async (resource: string, params: UpdateParams) => {
        const url = getURL(
            `/v1/${camelCaseToKebabCase(resource)}/${params.id}`,
        );

        const headers = getHeaders();
        headers.set("Content-Type", "application/json");

        const response = await fetch(url.toString(), {
            method: "PATCH",
            body: JSON.stringify(params.data),
            headers: headers,
            credentials: "include",
        });
        const data = await parseResponse(response);
        return {
            data: data,
        };
    },
    delete: async (resource: string, params: DeleteParams) => {
        const url = getURL(
            `/v1/${camelCaseToKebabCase(resource)}/${params.id}`,
        );

        const response = await fetch(url.toString(), {
            method: "DELETE",
            headers: getHeaders(),
            credentials: "include",
        });
        const data = await parseResponse(response);
        return {
            data: data,
        };
    },
};

export default defaultDataProvider;
