
// QnAImage 타입 정의
export interface IQnaImage {
    qnaImageNo ?: number; // QnAImage의 고유 ID
    qnaImageUrl: string; // 이미지 URL
    qnaImageOrd: number;
}

// QnA 등록 인터페이스
export interface IQnaRequest {
    qnaNo: number;
    question: string; // 질문 내용
    customerId : string; // 사용자 ID
    qnaImages?: IQnaImage[]; // QnA에 첨부된 이미지 (선택 사항)
    productNo : number;
    creatorId : string;
}

// export interface IQnaList {
//     qnaNo: number;
//     question: string; // 질문 내용
//     createdAt ?: string; // 작성 시간 (ISO 형식)
// }
//
// export interface IQnaRead {
//     question: string; // 질문 내용
//     productNo: number; // 관련 상품 번호
//     customerId: string; // 사용자 ID
//     qnaImages?: IQnaImage[]; // QnA에 첨부된 이미지 (선택 사항)
//     createdAt ?: string; // 작성 시간 (ISO 형식)
//     answer?: string; // 답변 내용 (선택 사항)
// }

export interface IQna {
    qnaNo: number;
    question: string; // 질문 내용
    createdAt ?: string; // 작성 시간 (ISO 형식)
    productNo ?: number; // 관련 상품 번호
    customerId ?: string; // 사용자 ID
    qnaImages?: IQnaImage[]; // QnA에 첨부된 이미지 (선택 사항)
    answer?: string; // 답변 내용 (선택 사항)
}