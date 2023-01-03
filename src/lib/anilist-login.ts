import { getClient } from "@tauri-apps/api/http";
import { Store } from "tauri-plugin-store-api";

export const store = new Store(".settings.dat");

export const storeKey = async (key) => {
    const client = await getClient();
    const gqlBody = {
        query: `
        {
            Viewer{
                id, name, avatar {
                    large
                    medium
                }
                }
            }`,
    };
    const response = await client.request<any>({
        method: "POST",
        url: `https://graphql.anilist.co`,
        headers: {
            Authorization: "Bearer " + key,
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        query: gqlBody,
    });
    if (response.status === 200) {
        await store.set("key", key);
        await store.set("user", { user: response.data.data.Viewer });
        return response.data;
    } else {
        if (401) {
            return "Invalid access token";
        } else {
            return "Server error has occurred";
        }
    }
};

export const login = async () => {
    const client = await getClient();
    const key = await store.get("key");
    if (key) {
        const gqlBody = {
            query: `
            {
                Viewer{
                    id, name, avatar {
                      large
                      medium
                    }
                  }
              }`,
        };
        const response = await client.request<any>({
            method: "POST",
            url: `https://graphql.anilist.co`,
            headers: {
                Authorization: "Bearer " + key,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            query: gqlBody,
        });
        return response.data;
    } else {
        return undefined;
    }
};
export const logout = async () => {
    await store.delete("key");
};
