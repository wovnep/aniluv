export interface MediaListQuery {
    data: {
        MediaList: {
            id: number;
            mediaId: number;
            status: "CURRENT" | "PLANNING" | "COMPLETED" | "DROPPED" | "PAUSED" | "REPEATING";
            score: number;
            progress: number;
            startedAt: {
                year: number;
                month: number;
                day: number;
            };
            completedAt: {
                year: number;
                month: number;
                day: number;
            };
            repeat: number;
            notes: string;
            private: boolean;
            media: {
                episodes: number;
            };
        };
    };
}
