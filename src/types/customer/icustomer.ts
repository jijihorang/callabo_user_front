export interface ICustomer {

    customerId : string;
    customerName : string;
    customerPhone ?: string;

    customerZipcode ?: string;
    customerAddr ?: string;
    customerAddrDetail ?: string;

    customerProfileImage ?: string;

    // 고객이 팔로우한 크리에이터 리스트
    creatorFollows?: ICreatorFollow[];

    // 고객이 좋아요한 상품 리스트
    productLikes?: IProductLike[];
}

export interface ICreatorFollow {
    creatorFollowNo: number; // 팔로우 고유 번호
    followStatus: boolean; // 팔로우 상태 (true: 팔로우, false: 언팔로우)
    creatorId: string; // 크리에이터 ID
}

export interface IProductLike {
    productLikeNo: number; // 상품 좋아요 고유 번호
    likeStatus: boolean; // 좋아요 상태 (true: 좋아요, false: 취소)
    productNo: number; // 상품 번호
}