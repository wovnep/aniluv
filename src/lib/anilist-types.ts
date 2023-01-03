export interface QueryResponse {
    currentPage: number;
    hasNextPage: boolean;
    results: [
        {
            id: string;
            malId: number;
            title: {
                romaji: string | null;
                english: string | null;
                native: string | null;
                userPreferred: string;
            };
            status: string;
            image: string;
            cover: string;
            popularity: number;
            description: string;
            rating: number;
            genres: [string];
            color: string;
            totalEpisodes: number;
            type: string;
            releaseDate: number;
        }
    ];
}
export interface TrendingPopularResponse {
    currentPage: number;
    hasNextPage: boolean;
    results: [
        {
            id: string;
            malId: number;
            title: {
                romaji: string | null;
                english: string | null;
                native: string | null;
                userPreferred: string;
            };
            image: string;
            trailer: {
                site: string;
                id: string;
                thumbnail: string;
            };
            description: string;
            cover: string;
            rating: number;
            releasedDate: number;
            totalEpisodes: number;
            genres: [string];
            duration: number;
            type: string;
        }
    ];
}
export interface InfoResponse {
    id: string;
    title: {
        romaji: string | null;
        english: string | null;
        native: string | null;
    };
    malId: number;
    synonyms: [string];
    isLicensed: boolean;
    isAdult: boolean;
    countryOfOrigin: string;
    trailer: {
        id: string;
        site: string;
        thumbnail: string;
    };
    image: string;
    popularity: number;
    color: string;
    cover: string;
    description: string;
    status: string;
    releaseDate: string;
    startDate: {
        year: number;
        month: number;
        day: number;
    };
    endDate: {
        year: number;
        month: number;
        day: number;
    };
    nextAiringEpisode: {
        year: number;
        month: number;
        day: number;
    };
    totalEpisodes: number;
    rating: number;
    duration: number;
    genres: [string];
    season: string;
    studios: [string];
    subOrDub: string;
    type: string;
    recommendations: [
        {
            id: number;
            malId: number;
            title: {
                romaji: string;
                english: string;
                native: string;
                userPreferred: string;
            };
            status: string;
            episodes: number;
            image: string;
            cover: string;
            rating: number;
            type: string;
        }
    ];
    characters: [
        {
            id: number;
            role: string;
            name: {
                first: string;
                last: string;
                full: string;
                native: string;
                userPreferred: string;
            };
            image: string;
            voiceActors: [
                {
                    id: number;
                    name: {
                        first: string;
                        last: string;
                        full: string;
                        native: string;
                        userPreferred: string;
                    };
                    image: string;
                }
            ];
        }
    ];
    relations: [
        {
            id: number;
            relationType: string;
            malId: number;
            title: {
                romaji: string;
                english: string;
                native: string;
                userPreferred: string;
            };
            status: string;
            episodes: number;
            image: string;
            color: string;
            type: string;
            rating: number;
        }
    ];
    episodes: [
        {
            id: string;
            title: string;
            description: string;
            number: number;
            image: string;
        }
    ];
}
export interface EpisodeResponse {
    headers: {
        Referer: string;
    };
    sources: [
        {
            url: string;
            isM3U8: boolean;
            quality: string;
        }
    ];
}
