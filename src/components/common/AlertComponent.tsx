import React from 'react';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

interface AlertComponentProps {
    options: SweetAlertOptions; // title, text, icon 등
    onClose?: (result: SweetAlertResult) => void; // 알림 닫힐 때 콜백
}

const AlertComponent: React.FC<AlertComponentProps> = ({ options, onClose }) => {
    React.useEffect(() => {
        const showAlert = async () => {
            try {
                const result: SweetAlertResult = await MySwal.fire(options);
                if (onClose) {
                    onClose(result); // 결과값 전달
                }
            } catch (error) {
                console.error('Alert error:', error);
            }
        };

        showAlert();
    }, [options, onClose]);

    return <div></div>;
};

export default AlertComponent;
