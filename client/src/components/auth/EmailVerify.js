import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(false);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `/api/user/reset/${param.id}/${param.token}`;
                const { data } = await axios.get(url);
                setValidUrl(true);
                console.log(data)
                localStorage.setItem('Ski&bikePassword', JSON.stringify(data));
                toast.success("Yuo successfully verified Email")

            } catch (error) {
                console.log(error);
                setValidUrl(false);
            }
        };
        verifyEmailUrl();
    }, [param]);

    return (
        <>
            {validUrl ? (
                <div className=" verify">
                    <h1>Email verified successfully</h1>
                    <Link to='/password-reset'>
                        <button className="">Forward</button>
                    </Link>
                </div>
            ) : (
                <h1>404 Not Found</h1>
            )}
        </>
    );
};

export default EmailVerify;