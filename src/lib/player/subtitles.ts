import { extname, join } from "@tauri-apps/api/path";
import { BaseDirectory, exists, createDir, readDir, writeBinaryFile, readBinaryFile } from "@tauri-apps/api/fs";
import { getClient, ResponseType } from "@tauri-apps/api/http";
const baseURL = "https://api.consumet.org/meta/anilist/watch/";

interface ZoroQuery {
    sources: [
        {
            url: string;
            quality: string;
        }
    ];
    subtitles: [
        {
            url: string;
            lang: string;
        }
    ];
}
export const getSubtitle = async (epid: string) => {
    const basePath = await join("subtitles", epid);
    let finalList = [];
    if (await exists(basePath, { dir: BaseDirectory.AppCache })) {
        const dirList = await readDir(basePath, { dir: BaseDirectory.AppCache });
        for (let i = 0; i < dirList.length; i++) {
            if ((await extname(dirList[i].path)) === "vtt") {
                const binaryData = await readBinaryFile(dirList[i].path);
                const language = dirList[i].name.split(".vtt")[0];
                finalList.push({
                    lang: language,
                    url: URL.createObjectURL(new Blob([binaryData], { type: "text/vtt" })),
                });
            }
        }
    } else {
        await createDir(basePath, { dir: BaseDirectory.AppCache, recursive: true });
        const client = await getClient();
        const response = await client.request<ZoroQuery>({
            method: "GET",
            url: baseURL + epid,
            query: {
                provider: "zoro",
            },
            responseType: ResponseType.JSON,
        });
        const subtitleList = response.data.subtitles.filter((subtitle) => subtitle.lang !== "Thumbnails");
        for (let i = 0; i < subtitleList.length; i++) {
            const removeLangSpace = subtitleList[i].lang.split(" ")[0];
            const res = await fetch(subtitleList[i].url);
            const text = await res.text();
            const blob = new Blob([text], {
                type: "text/vtt",
            });
            const path = await join(basePath, removeLangSpace + ".vtt");
            await writeBinaryFile(path, await blob.arrayBuffer(), { dir: BaseDirectory.AppCache });
            finalList.push({
                lang: removeLangSpace,
                url: URL.createObjectURL(blob),
            });
        }
    }
    return finalList;
};
