import { getClient, ResponseType } from "@tauri-apps/api/http";
import { getSubtitle } from "./../player/subtitles";
import { store } from "../anilist/anilist-login";
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
        query: {
            provider: "gogoanime",
        },
        responseType: ResponseType.JSON,
    });
    return response.data;
};
export const getEpisode = async (epid: string, id: string, index: number) => {
    const provider = await store.get("provider");
    const client = await getClient();
    const res: any = undefined || {};
    const zoroInfo = await client.request<InfoResponse>({
        method: "GET",
        url: `${baseURL}/info/${id}`,
        query: {
            provider: "zoro",
        },
        responseType: ResponseType.JSON,
    });
    if (provider === "crunchyroll") {
        const crunchyrollInfo = await client.request<InfoResponse>({
            method: "GET",
            url: `${baseURL}/info/${id}`,
            query: {
                provider: "crunchyroll",
            },
            responseType: ResponseType.JSON,
        });
        if (crunchyrollInfo.data.episodes.length < 1) return null;
        const crunchyrollEpisode = await client.request<EpisodeResponse>({
            method: "GET",
            url: `${baseURL}/watch/${crunchyrollInfo.data.episodes[index].id}`,
            query: {
                provider: "crunchyroll",
            },
            responseType: ResponseType.JSON,
        });
        if (crunchyrollEpisode.status !== 200) return null;
        res["source"] = crunchyrollEpisode.data.sources.filter((source) => source.quality == "auto")[0];
        res["subtitles"] = await getSubtitle(zoroInfo.data.episodes[index].id);
    } else {
        const gogoanime = await client.request<EpisodeResponse>({
            method: "GET",
            url: `${baseURL}/watch/${epid}`,
            query: {
                provider: "gogoanime",
            },
            responseType: ResponseType.JSON,
        });
        const source = gogoanime.data.sources.filter((source) => source.quality == "default");
        res["subtitles"] = await getSubtitle(zoroInfo.data.episodes[index].id);
        if (source.length != 0) {
            res["source"] = source[0];
        } else {
            const backup = gogoanime.data.sources.filter((source) => source.quality == "backup");
            res["source"] = backup[0];
        }
    }
    return res;
};
