export interface ICreator {
    creatorId ?: string;
    creatorName : string;

    creatorEmail ?: string;
    creatorPhone ?: string;

    backgroundImg ?: string;
    logoImg ?: string;

    followStatus ?: boolean;
    followerCount ?: number;
}
