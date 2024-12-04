export interface ICreator {
    creatorId : string;
    creatorName : string;

    creatorEmail ?: string;
    creatorPhone ?: string;

    backgroundImg ?: string;
    logoImg ?: string;

    followStatus ?: boolean;
}

export interface IOfflineStore {
    storeNo ?: number;
    storeImage ?: string;
    storeName ?: string;
    storeLocation ?: string;

    latitude ?: string;
    longitude ?: string;
}