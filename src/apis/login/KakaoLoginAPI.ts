import axios from "axios";

const REST_API = import.meta.env.VITE_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const kakao_auth_path = import.meta.env.VITE_KAKAO_AUTH_PATH;
const access_token_url = import.meta.env.VITE_ACCESS_TOKEN_URL;

const host = 'http://localhost:8080/api2/customer/kakao'

// 인가 코드 받기
export const getKakaoLoginLink = () => {
    const KakaoURL = `${kakao_auth_path}?client_id=${REST_API}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    return KakaoURL;
}

export const getMemberWithAccessToken = async (accessToken:string)  => {

    try {
        const res = await axios.get(`${host}?accessToken=${accessToken}`);

        console.log("User Data Response:", res.data); // API 응답 디버깅
        return res.data;
    } catch (error) {
        console.error("Error fetching user data:", error); // 오류 디버깅
        throw error;
    }
}

export const getAccessToken = async (authCode:string) => {
    const header = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }
    const params = {
        grant_type: "authorization_code",
        client_id: REST_API,
        redirect_uri: REDIRECT_URI,
        code:authCode
    }
    const res = await axios.post(access_token_url, params , header)
    const accessToken = res.data.access_token

    return accessToken
}