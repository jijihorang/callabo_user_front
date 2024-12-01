import axios from "axios";

const rest_api_key = import.meta.env.VITE_REST_API_KEY

const redirect_uri = import.meta.env.VITE_REDIRECT_URI

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`

const access_token_url = 'https://kauth.kakao.com/oauth/token'

const host =`${import.meta.env.VITE_API_HOST}/api2/member/kakao`

export const getMemberWithAccessToken = async (accessToken:string)  => {

    const res = await axios.get(`${host}?accessToken=${accessToken}`)

    return res.data
}


export const getKakaoLoginLink = () => {

    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`

    return kakaoURL
}

export const getAccessToken = async (authCode:string) => {
    const header = {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        }
    }
    const params = {
        grant_type: "authorization_code",
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code: authCode
    }
    const res = await axios.post(access_token_url, params, header)
    const accessToken = res.data.access_token

    return accessToken

}