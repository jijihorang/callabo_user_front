import kakao from "../assets/login/kakao_logo.png"
import profile from "../assets/login/profile.png"

function LoginComponent() {
    return (
        // <div className="box w-full h-screen w-3/12 h-32  bg-blue-500 border-2 border-gray-300 flex items-center">
        //     <div className="w-32 h-32 bg-yellow-500 mx-auto mt-20">
        //         <p className="text-center font-bold ">로그인 </p>
        //     </div>
        // </div>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg shadow-lg w-4/12 max-w-2xl p-6 relative">
                {/* 흰색 배경의 팝업 창으로, 모서리가 둥글고 그림자있는 상자. */}
                <button className="text-gray-400 hover:text-gray-500 text-2xl font-bold" aria-label="닫기"
                >
                    X
                </button>

                <div className="flex flex-col items-center">

                    <div className="flex items-center justify-center text-black">
                        <img src={profile} alt="이미지 사진" className="w-24 h-24 object-cover"/>
                    </div>


                    <div className="text-4xl text-black mt-8 font-bold">
                        로그인
                    </div>

                    <div className="text-black text-sm mt-3">
                        로그인을 하시고 신상품들을 만나보세요!
                    </div>

                    <div className="flex items-center justify-center text-black w-11/12 max-w-4xl p-6 relative mt-4">
                        <img src={kakao} alt="이미지 사진"/>
                    </div>

                    <div className="border-t" >
                        <div className="text-gray-600 text-xs mt-3 text-center">
                            로그인은 개인 정보 보호 정책 및 서비스 약관에 동의 하는것을 의미하며,<br/>
                            서비스 이용을 위해 이름,프로필 이미지를 수집합니다.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent;