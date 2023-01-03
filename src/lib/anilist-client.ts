import { getClient } from "@tauri-apps/api/http";
import moment from "moment";
import { store } from "./anilist-login";

export const getMediaList = async (id) => {
    const client = await getClient();
    const user = await store.get<any>("user");
    const key = await store.get<any>("key");
    const gqlBody = {
        query: `
        {
            MediaList(userId:${user.user.id}, mediaId: ${id}){
              id,
              mediaId,
              status,
              score,
              progress,
              startedAt {
                year
                month
                day
              },
              completedAt {
                year
                month
                day
              },
              repeat,
              notes,
              private,
              media{
                episodes
              }
         }
       }
    `,
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
    return response.data.data;
};
export const updateMediaList = async (data, id) => {
    const client = await getClient();
    const key = await store.get<any>("key");
    let gqlBody = {
        query: `mutation{
                  SaveMediaListEntry(
                      mediaId: ${id},
                      status: ${data.status},
                      score: ${data.score},
                      progress: ${data.progress},
                      notes: "${data.notes}",
                      startedAt: { year: ${!data.startedAt ? null : moment(data.startedAt).year()}, month: ${!data.startedAt ? null : moment(data.startedAt).month() + 1}, day: ${!data.startedAt ? null : moment(data.startedAt).date()}},
                      completedAt: { year: ${!data.completedAt ? null : moment(data.completedAt).year()}, month: ${!data.completedAt ? null : moment(data.completedAt).month() + 1}, day: ${!data.completedAt ? null : moment(data.completedAt).date()}},
                  ){
                status
              }
              }`,
        variables: "{}",
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
};
