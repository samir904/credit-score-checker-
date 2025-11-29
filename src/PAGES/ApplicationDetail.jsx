// src/pages/ApplicationDetail.jsx - FIXED VERSION

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    getApplicationById,
    calculateCreditScore,
    deleteApplication,
    clearError,
    clearMessage,
    clearCurrentApplication
} from '../REDUX/SLICES/applicationSlice';
import {
    ArrowLeft,
    FileText,
    Download,
    Trash2,
    Calculator,
    Edit2,
    CheckCircle,
    XCircle,
    AlertCircle,
    Clock,
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    DollarSign,
    Calendar,
    Copy,
    Loader,
    TrendingUp,
    AlertTriangle
} from 'lucide-react';
import Toast from '../COMPONENTS/Toast';

function ApplicationDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Redux state
    const { currentApplication, loading, error, message, scoreCalculating } = useSelector(
        state => state.application
    );

    // Local state
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [copied, setCopied] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);
    const [toastType, setToastType] = useState('success');

    // Fetch application on component mount
    useEffect(() => {
        if (id) {
            dispatch(getApplicationById(id));
        }
    }, [dispatch, id]);

    // Handle success/error messages
    useEffect(() => {
        if (error) {
            setToastMessage(error);
            setToastType('error');
            setTimeout(() => dispatch(clearError()), 5000);
        }
    }, [error, dispatch]);

    useEffect(() => {
        if (message) {
            setToastMessage(message);
            setToastType('success');
            setTimeout(() => dispatch(clearMessage()), 3000);
        }
    }, [message, dispatch]);

    // Handle calculate score
    const handleCalculateScore = () => {
        dispatch(calculateCreditScore(id));
    };

    // Handle delete with confirmation
    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = async () => {
        setShowDeleteConfirm(false);
        const result = await dispatch(deleteApplication(id));
        if (!result.payload?.error) {
            setToastMessage('Application deleted successfully');
            setToastType('success');
            setTimeout(() => navigate('/applications'), 2000);
        }
    };

    // Copy to clipboard
    const handleCopy = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopied(field);
        setTimeout(() => setCopied(null), 2000);
    };

    // Format currency
    const formatCurrency = (amount) => {
        if (!amount && amount !== 0) return 'N/A';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    // Format date
    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Get status badge
    const getStatusBadge = (status) => {
        const config = {
            PENDING: { bg: 'bg-slate-100', text: 'text-slate-700', icon: Clock },
            APPROVED: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
            REJECTED: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle },
            CONDITIONAL: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: AlertCircle },
            COMPLETED: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle }
        };
        return config[status] || config.PENDING;
    };

    // Loading state
    if (loading && !currentApplication) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <Loader className="w-12 h-12 animate-spin text-teal-500 mx-auto mb-4" />
                    <p className="text-slate-600">Loading application details...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error && !currentApplication) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
                <div className="max-w-2xl mx-auto">
                    <Link
                        to="/my-applications"
                        className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Applications
                    </Link>
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg p-6">
                        <p className="text-red-700 dark:text-red-300">{error}</p>
                        <button
                            onClick={() => dispatch(getApplicationById(id))}
                            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentApplication) {
        return (
            <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
                <div className="max-w-2xl mx-auto">
                    <Link
                        to="/my-applications"
                        className="flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-6"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Applications
                    </Link>
                    <div className="text-center py-12">
                        <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">Application not found</p>
                    </div>
                </div>
            </div>
        );
    }

    const app = currentApplication;
    const statusConfig = getStatusBadge(app.decision || app.status || 'PENDING');
    const StatusIcon = statusConfig.icon;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/my-applications"
                            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition"
                        >
                            <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                                {app.applicantName || 'Applicant'}
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                Application ID: {app._id?.substring(0, 8)}...
                            </p>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${statusConfig.bg} w-fit`}>
                        <StatusIcon className={`w-5 h-5 ${statusConfig.text}`} />
                        <span className={`font-semibold ${statusConfig.text}`}>
                            {app.decision || app.status || 'PENDING'}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {!app.creditScore && (
                        <button
                            onClick={handleCalculateScore}
                            disabled={scoreCalculating}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition"
                        >
                            {scoreCalculating ? (
                                <Loader className="w-4 h-4 animate-spin" />
                            ) : (
                                <Calculator className="w-4 h-4" />
                            )}
                            Calculate Score
                        </button>
                    )}

                    {(app.decision === 'PENDING' || app.status === 'PENDING') && (
                        <Link
                            to={`/applications/${id}/edit`}
                            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition"
                        >
                            <Edit2 className="w-4 h-4" />
                            Edit
                        </Link>
                    )}

                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg transition"
                    >
                        <Download className="w-4 h-4" />
                        Download PDF
                    </button>

                    <button
                        onClick={handleDeleteClick}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition ml-auto"
                    >
                        <Trash2 className="w-4 h-4" />
                        Delete
                    </button>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column - Personal & Loan Info */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Personal Information */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-teal-600" />
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Full Name</label>
                                    <p className="text-slate-700 dark:text-slate-300 mt-1 font-medium">
                                        {app.applicantName || 'N/A'}
                                    </p>
                                </div>

                                {/* Age */}
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Age</label>
                                    <p className="text-slate-700 dark:text-slate-300 mt-1">
                                        {app.age ? `${app.age} years` : 'N/A'}
                                    </p>
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Gender</label>
                                    <p className="text-slate-700 dark:text-slate-300 mt-1 capitalize">
                                        {app.gender ? app.gender.toLowerCase() : 'N/A'}
                                    </p>
                                </div>

                                {/* Marital Status */}
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Marital Status</label>
                                    <p className="text-slate-700 dark:text-slate-300 mt-1 capitalize">
                                        {app.maritalStatus ? app.maritalStatus.toLowerCase() : 'N/A'}
                                    </p>
                                </div>

                                {/* Home Ownership */}
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Home Ownership</label>
                                    <p className="text-slate-700 dark:text-slate-300 mt-1 capitalize">
                                        {app.homeOwnership ? app.homeOwnership.toLowerCase() : 'N/A'}
                                    </p>
                                </div>

                                {/* Address */}
                                <div className="md:col-span-2">
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Address</label>
                                    <div className="flex items-start gap-2 mt-1">
                                        <MapPin className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-slate-700 dark:text-slate-300">
                                            {app.address || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Loan Details */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-teal-600" />
                                Loan Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Loan Amount */}
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Loan Amount</label>
                                    <p className="text-2xl font-bold text-teal-600 mt-1">
                                        {formatCurrency(app.loanAmount)}
                                    </p>
                                </div>

                                {/* Loan Purpose */}
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Purpose</label>
                                    <p className="text-slate-700 dark:text-slate-300 mt-1 capitalize">
                                        {app.loanPurpose ? app.loanPurpose.toLowerCase() : 'N/A'}
                                    </p>
                                </div>

                                {/* Tenure */}
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Tenure</label>
                                    <p className="text-slate-700 dark:text-slate-300 mt-1">
                                        {app.loanTenure ? `${app.loanTenure} months` : 'N/A'}
                                    </p>
                                </div>

                                {/* Collateral */}
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Collateral</label>
                                    <p className="text-slate-700 dark:text-slate-300 mt-1">
                                        {app.hasCollateral ? `Yes - ₹${app.collateralValue}` : 'No'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Financial Information */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-teal-600" />
                                Financial Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Annual Income */}
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Annual Income</label>
                                    <p className="text-slate-700 dark:text-slate-300 mt-1">
                                        {formatCurrency(app.annualIncome)}
                                    </p>
                                </div>

                                {/* Monthly Debt */}
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Monthly Debt</label>
                                    <p className="text-slate-700 dark:text-slate-300 mt-1">
                                        {formatCurrency(app.monthlyDebt)}
                                    </p>
                                </div>

                                {/* Employment Status */}
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Employment Status</label>
                                    <p className="text-slate-700 dark:text-slate-300 mt-1 capitalize">
                                        {app.employmentStatus ? app.employmentStatus.toLowerCase() : 'N/A'}
                                    </p>
                                </div>

                                {/* Employment Years */}
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Years Employed</label>
                                    <p className="text-slate-700 dark:text-slate-300 mt-1">
                                        {app.employmentYears ? `${app.employmentYears} years` : 'N/A'}
                                    </p>
                                </div>

                                {/* Credit History Years */}
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Credit History</label>
                                    <p className="text-slate-700 dark:text-slate-300 mt-1">
                                        {app.creditHistoryYears ? `${app.creditHistoryYears} years` : 'N/A'}
                                    </p>
                                </div>

                                {/* Existing Loans */}
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Existing Loans</label>
                                    <p className="text-slate-700 dark:text-slate-300 mt-1">
                                        {app.existingLoans || 0}
                                    </p>
                                </div>

                                {/* Debt to Income Ratio */}
                                {app.debtToIncomeRatio && (
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 uppercase">Debt to Income</label>
                                        <p className="text-slate-700 dark:text-slate-300 mt-1">
                                            {app.debtToIncomeRatio}%
                                        </p>
                                    </div>
                                )}

                                {/* Loan to Income Ratio */}
                                {app.loanToIncomeRatio && (
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 uppercase">Loan to Income</label>
                                        <p className="text-slate-700 dark:text-slate-300 mt-1">
                                            {app.loanToIncomeRatio}%
                                        </p>
                                    </div>
                                )}

                                {/* Default History */}
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Default History</label>
                                    <p className={`mt-1 font-medium ${app.hasDefaultHistory ? 'text-red-600' : 'text-green-600'}`}>
                                        {app.hasDefaultHistory ? 'Yes' : 'No'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Status & Decision */}
                    <div className="space-y-6">

                        {/* Application Status Card */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Application Status</h3>
                            <div className="space-y-4">
                                {/* Credit Score */}
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase">Credit Score</label>
                                    {app.creditScore ? (
                                        <p className="text-3xl font-bold text-teal-600 mt-1">{app.creditScore}</p>
                                    ) : (
                                        <p className="text-slate-500 mt-1">Not calculated</p>
                                    )}
                                </div>

                                {/* Risk Level */}
                                {app.riskLevel && (
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 uppercase">Risk Level</label>
                                        <p className={`mt-1 font-medium capitalize ${
                                            app.riskLevel === 'LOW' ? 'text-green-600' :
                                            app.riskLevel === 'MEDIUM' ? 'text-yellow-600' :
                                            'text-red-600'
                                        }`}>
                                            {app.riskLevel}
                                        </p>
                                    </div>
                                )}

                                {/* Default Probability */}
                                {app.defaultProbability && (
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 uppercase">Default Probability</label>
                                        <p className="text-slate-700 dark:text-slate-300 mt-1">
                                            {app.defaultProbability.toFixed(1)}%
                                        </p>
                                    </div>
                                )}

                                {/* Application Date */}
                                <div>
                                    <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        Applied On
                                    </label>
                                    <p className="text-slate-700 dark:text-slate-300 mt-1">
                                        {formatDate(app.createdAt)}
                                    </p>
                                </div>

                                {/* Decision Date */}
                                {app.updatedAt && (
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 uppercase flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            Decision Date
                                        </label>
                                        <p className="text-slate-700 dark:text-slate-300 mt-1">
                                            {formatDate(app.updatedAt)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Loan Decision Card */}
                        {app.decision && (
                            <div className={`rounded-lg shadow p-6 ${
                                app.decision === 'APPROVED' ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' :
                                app.decision === 'REJECTED' ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700' :
                                'bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700'
                            }`}>
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    {app.decision === 'APPROVED' ? (
                                        <>
                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                            <span className="text-green-700 dark:text-green-300">Approved</span>
                                        </>
                                    ) : app.decision === 'REJECTED' ? (
                                        <>
                                            <XCircle className="w-6 h-6 text-red-600" />
                                            <span className="text-red-700 dark:text-red-300">Rejected</span>
                                        </>
                                    ) : (
                                        <>
                                            <AlertCircle className="w-6 h-6 text-yellow-600" />
                                            <span className="text-yellow-700 dark:text-yellow-300">Conditional</span>
                                        </>
                                    )}
                                </h3>

                                {/* Recommendation */}
                                {app.recommendation && (
                                    <div className="mb-4 p-3 bg-white/50 dark:bg-slate-900/30 rounded">
                                        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 flex items-start gap-2">
                                            <TrendingUp className="w-4 h-4 flex-shrink-0 mt-0.5" />
                                            {app.recommendation}
                                        </p>
                                    </div>
                                )}

                                {/* Explanation */}
                                {app.explanation && (
                                    <div className="mb-4 p-3 bg-white/50 dark:bg-slate-900/30 rounded">
                                        <p className="text-xs text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                                            {app.explanation}
                                        </p>
                                    </div>
                                )}

                                {/* Notes */}
                                {app.notes && (
                                    <div>
                                        <label className="text-xs font-semibold text-slate-500 uppercase">Additional Notes</label>
                                        <p className="text-slate-700 dark:text-slate-300 mt-1 text-sm">
                                            {app.notes}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-sm w-full p-6">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                            Delete Application
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Are you sure you want to delete this application? This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                disabled={loading}
                                className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg transition flex items-center gap-2"
                            >
                                {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toastMessage && (
                <Toast
                    message={toastMessage}
                    type={toastType}
                    onClose={() => setToastMessage(null)}
                />
            )}
        </div>
    );
}

export default ApplicationDetail;