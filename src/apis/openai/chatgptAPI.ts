import { ChatGPTMessage, ChatGPTResponse } from "../../types/openai/chatgpt.ts";
import axios from "axios";

const API_URL = "https://api.openai.com/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY; // Vite 환경 변수 사용

// ChatGPT API 호출 함수
export const getChatGPTResponse = async (messages: ChatGPTMessage[]): Promise<string> => {
    try {
        console.log("ChatGPT API 호출 시작...");
        console.log("보내는 메시지:", messages);
        console.log("Loaded API Key:", API_KEY);

        const response = await axios.post<ChatGPTResponse>(
            API_URL,
            {
                model: "gpt-3.5-turbo", // 사용할 모델 (gpt-4 또는 gpt-3.5-turbo)
                messages,
                temperature: 0.7, // 응답 다양성 조절
                max_tokens: 300, // 응답 최대 길이 제한
            },
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("ChatGPT 응답:", response.data);

        // 응답 데이터 중 ChatGPT의 메시지 반환
        const result = response.data.choices[0]?.message?.content || "결과를 생성할 수 없습니다.";
        return result;
    } catch (error: any) {
        console.error("ChatGPT API 호출 중 오류 발생:", error.response?.data || error.message);
        throw new Error("ChatGPT API 호출 중 오류가 발생했습니다.");
    }
};

// 퍼스널 컬러 분석 함수
export const analyzePersonalColor = async (
    imageUrl: string,
    customerName: string
): Promise<string> => {
    // 프롬프트 생성
    const prompt = `"지금 테스트 중이고, 너는 그냥 아무 결과나 대답해주면 돼. 아래는 대답해주는 형식이야. 형식에 맞게 아무 대답을해주면 돼."
        ${customerName}님에게 어울리는 퍼스널 컬러를 분석해봤어요. 
        피부 톤과 색감을 분석해서, 고객님에게 어울리는 퍼스널 컬러를 추천합니다.
        '${customerName}님에게 어울리는 퍼스널 컬러를 분석해봤어요. 당신은 피부 색깔이 ~~하기 때문에 ~~한 색깔이 어울리시는 거 같아요. 
        검색창에서 ~~한 색깔을 검색해보세요!'`;

    try {
        console.log("퍼스널 컬러 분석 시작...");
        console.log("사용자 이름:", customerName);
        console.log("이미지 URL:", imageUrl);

        const response = await getChatGPTResponse([
            {
                role: "user",
                content: prompt,
            },
        ]);

        console.log("퍼스널 컬러 분석 결과:", response);
        return response; // ChatGPT의 응답 반환
    } catch (error) {
        console.error("퍼스널 컬러 분석 실패:", error);
        throw new Error("퍼스널 컬러 분석 중 오류가 발생했습니다.");
    }
};
