import { useSearchParams } from "react-router-dom";

function FailPage() {
    const [searchParams] = useSearchParams();

    return (
        <div className="result wrapper">
            <div className="box_section">
                <h2>결제 실패</h2>
                <p>{`에러 코드: ${searchParams.get("code") || "N/A"}`}</p>
                <p>{`실패 사유: ${searchParams.get("message") || "알 수 없는 오류"}`}</p>
            </div>
        </div>
    );
}

export default FailPage