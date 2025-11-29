// src/pages/ApplicationsPage.jsx

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getMyApplications, calculateCreditScore, deleteApplication } from '../REDUX/SLICES/applicationSlice';
import ApplicationsList from '../COMPONENTS/ApplicationsList';

function ApplicationsPage() {
    const dispatch = useDispatch();
    const { applications, loading, error, pagination } = useSelector((state) => state.application);

    useEffect(() => {
        dispatch(getMyApplications({ page: 1, limit: 10 }));
    }, [dispatch]);

    const handleCalculate = (id) => {
        dispatch(calculateCreditScore(id));
    };

    const handleDelete = (id) => {
        if (window.confirm('Delete this application?')) {
            dispatch(deleteApplication(id));
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">My Applications</h2>
            </div>
            {error && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">{error}</div>}
            {loading && <div className="text-center">Loading...</div>}
            <ApplicationsList data={applications} onCalculate={handleCalculate} onDelete={handleDelete} />
            <div className="py-8 text-center text-sm text-slate-500">
                Page {pagination.currentPage} of {pagination.totalPages}
            </div>
        </div>
    );
}
export default ApplicationsPage;
