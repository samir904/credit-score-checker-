// src/pages/NewApplicationPage.jsx

import ApplicationForm from "../COMPONENTS/ApplicationForm";
import { useDispatch, useSelector } from "react-redux";
import { createApplication, clearMessage, clearError, clearCurrentApplication } from "../REDUX/SLICES/applicationSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NewApplicationPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { message, error, loading, currentApplication } = useSelector((state) => state.application);

    useEffect(() => {
        if (message && currentApplication) {
            const timer = setTimeout(() => {
                dispatch(clearMessage());
                dispatch(clearCurrentApplication());
                navigate('/my-applications');
            }, 2000);
            return () => clearTimeout(timer);
        }
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [message, error, dispatch, navigate, currentApplication]);

    const handleSubmit = (formData) => {
        dispatch(createApplication(formData));
    };

    return (
        <div className="max-w-3xl mx-auto py-12">
            {message && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded">
                    {message}
                </div>
            )}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
                    {error}
                </div>
            )}
            <ApplicationForm onSubmit={handleSubmit} loading={loading} />
        </div>
    );
}
export default NewApplicationPage;
