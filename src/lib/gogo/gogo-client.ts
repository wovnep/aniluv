import { getClient, ResponseType } from "@tauri-apps/api/http";
import type { QueryResponse, TrendingPopularResponse, InfoResponse, EpisodeResponse } from "./gogo-types";
const baseURL = "https://api.consumet.org/meta/anilist";

export const query = async (q: string) => {
    const client = await getClient();
    const response = await client.request<QueryResponse>({
        method: "GET",
        url: `${baseURL}/${q}`,
        responseType: ResponseType.JSON,
    });
    return response.data;
};
export const getTrending = async () => {
    const client = await getClient();
    const response = await client.request<TrendingPopularResponse>({
        method: "GET",
        url: `${baseURL}/trending`,
        responseType: ResponseType.JSON,
    });
    return response.data;
};
export const getPopular = async () => {
    const client = await getClient();
    const response = await client.request<TrendingPopularResponse>({
        method: "GET",
        url: `${baseURL}/popular?perPage=24`,
        responseType: ResponseType.JSON,
    });
    return response.data;
};
export const getInfo = async (id: string) => {
    const client = await getClient();
    const response = await client.request<InfoResponse>({
        method: "GET",
        url: `${baseURL}/info/${id}`,
        responseType: ResponseType.JSON,
    });
    return response.data;
};
export const getEpisode = async (epid: string) => {
    const client = await getClient();
    const response = await client.request<EpisodeResponse>({
        method: "GET",
        url: `${baseURL}/watch/${epid}`,
        responseType: ResponseType.JSON,
    });
    return response.data;
};
