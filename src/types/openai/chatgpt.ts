export interface ChatGPTResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: {
        message: ChatGPTMessage;
        finish_reason: string;
        index: number;
    }[];
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

export interface ChatGPTMessage {
    role: "system" | "user" | "assistant";
    content: string;
}