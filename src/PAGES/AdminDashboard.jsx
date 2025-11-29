// src/pages/AdminDashboard.jsx

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getAllApplications,
    getApplicationStats,
    updateApplicationStatus,
    getFairnessAnalysis,
    getAllUsers,
    deleteUser,
    clearError,
    clearMessage
} from '../REDUX/SLICES/adminSlice';
import {
    BarChart3,
    Users,
    FileText,
    TrendingUp,
    Trash2,
    Edit2,
    Eye,
    Loader,
    AlertCircle,
    CheckCircle,
    XCircle,
    Clock,
    Filter,
    Download,
    RefreshCw,
    MoreVertical,
    Shield,
    Activity
} from 'lucide-react';
import Toast from '../COMPONENTS/Toast';

function AdminDashboard() {
    const dispatch = useDispatch();
    const { applications, statistics, fairnessAnalysis, users, pagination, loading, error, message } = useSelector(
        state => state.admin
    );

    const [activeTab, setActiveTab] = useState('applications');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);
    const [toastMessage, setToastMessage] = useState(null);
    const [toastType, setToastType] = useState('success');
    const [filters, setFilters] = useState({
        page: 1,
        limit: 20,
        status: '',
        decision: '',
        riskLevel: ''
    });
    const [userFilters, setUserFilters] = useState({
        page: 1,
        limit: 20,
        role: ''
    });

    // Load data on component mount
    useEffect(() => {
        if (activeTab === 'applications') {
            dispatch(getAllApplications(filters));
            dispatch(getApplicationStats());
        } else if (activeTab === 'users') {
            dispatch(getAllUsers(userFilters));
        } else if (activeTab === 'fairness') {
            dispatch(getFairnessAnalysis());
        }
    }, [dispatch, activeTab, filters, userFilters]);

    // Handle toast messages
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

    // Handle delete user
    const handleDeleteUser = async () => {
        if (deleteTarget) {
            await dispatch(deleteUser(deleteTarget));
            setShowDeleteConfirm(false);
            setDeleteTarget(null);
            dispatch(getAllUsers(userFilters));
        }
    };

    // Format currency
    const formatCurrency = (amount) => {
        if (!amount && amount !== 0) return 'N/A';
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR'
        }).format(amount);
    };

    // Get status badge
    const getStatusBadge = (status) => {
        const config = {
            APPROVED: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
            REJECTED: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle },
            PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
            CONDITIONAL: { bg: 'bg-blue-100', text: 'text-blue-700', icon: AlertCircle }
        };
        return config[status] || config.PENDING;
    };

    const getRiskColor = (level) => {
        if (level === 'LOW') return 'text-green-600';
        if (level === 'MEDIUM') return 'text-yellow-600';
        return 'text-red-600';
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
            {/* Header */}
            <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                                <Shield className="w-8 h-8 text-teal-600" />
                                Admin Dashboard
                            </h1>
                            <p className="text-slate-600 dark:text-slate-400 mt-1">Manage applications, users, and analytics</p>
                        </div>
                        <button
                            onClick={() => {
                                if (activeTab === 'applications') dispatch(getAllApplications(filters));
                                else if (activeTab === 'users') dispatch(getAllUsers(userFilters));
                                else dispatch(getFairnessAnalysis());
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-20 z-30">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="flex gap-8 overflow-x-auto">
                        {[
                            { id: 'applications', label: 'Applications', icon: FileText },
                            { id: 'statistics', label: 'Statistics', icon: BarChart3 },
                            { id: 'fairness', label: 'Fairness Analysis', icon: Activity },
                            { id: 'users', label: 'Users', icon: Users }
                        ].map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-4 border-b-2 transition whitespace-nowrap ${
                                        activeTab === tab.id
                                            ? 'border-teal-600 text-teal-600'
                                            : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
                {loading && (
                    <div className="flex items-center justify-center min-h-96">
                        <div className="text-center">
                            <Loader className="w-12 h-12 animate-spin text-teal-500 mx-auto mb-4" />
                            <p className="text-slate-600">Loading data...</p>
                        </div>
                    </div>
                )}

                {/* APPLICATIONS TAB */}
                {activeTab === 'applications' && !loading && (
                    <div className="space-y-6">
                        {/* Filters */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <Filter className="w-5 h-5 text-teal-600" />
                                Filters
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <select
                                    value={filters.status}
                                    onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
                                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="">All Status</option>
                                    <option value="DRAFT">Draft</option>
                                    <option value="SUBMITTED">Submitted</option>
                                    <option value="UNDER_REVIEW">Under Review</option>
                                    <option value="COMPLETED">Completed</option>
                                    <option value="ARCHIVED">Archived</option>
                                </select>

                                <select
                                    value={filters.decision}
                                    onChange={(e) => setFilters({ ...filters, decision: e.target.value, page: 1 })}
                                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="">All Decisions</option>
                                    <option value="APPROVED">Approved</option>
                                    <option value="REJECTED">Rejected</option>
                                    <option value="CONDITIONAL">Conditional</option>
                                    <option value="PENDING">Pending</option>
                                </select>

                                <select
                                    value={filters.riskLevel}
                                    onChange={(e) => setFilters({ ...filters, riskLevel: e.target.value, page: 1 })}
                                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="">All Risk Levels</option>
                                    <option value="LOW">Low Risk</option>
                                    <option value="MEDIUM">Medium Risk</option>
                                    <option value="HIGH">High Risk</option>
                                </select>

                                <select
                                    value={filters.limit}
                                    onChange={(e) => setFilters({ ...filters, limit: parseInt(e.target.value), page: 1 })}
                                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="20">20 per page</option>
                                    <option value="50">50 per page</option>
                                    <option value="100">100 per page</option>
                                </select>
                            </div>
                        </div>

                        {/* Applications Table */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-100 dark:bg-slate-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white uppercase">Applicant</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white uppercase">Loan Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white uppercase">Score</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white uppercase">Risk</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white uppercase">Decision</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white uppercase">Status</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                        {applications.length === 0 ? (
                                            <tr>
                                                <td colSpan="7" className="px-6 py-8 text-center text-slate-500">
                                                    No applications found
                                                </td>
                                            </tr>
                                        ) : (
                                            applications.map(app => {
                                                const decisionConfig = getStatusBadge(app.decision || 'PENDING');
                                                const DecisionIcon = decisionConfig.icon;
                                                return (
                                                    <tr key={app._id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                                                        <td className="px-6 py-4">
                                                            <div>
                                                                <p className="font-medium text-slate-900 dark:text-white">
                                                                    {app.applicantName}
                                                                </p>
                                                                <p className="text-sm text-slate-500">{app._id.substring(0, 8)}...</p>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">
                                                            {formatCurrency(app.loanAmount)}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="text-lg font-bold text-teal-600">
                                                                {app.creditScore || 'N/A'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className={`font-semibold ${getRiskColor(app.riskLevel)}`}>
                                                                {app.riskLevel || 'N/A'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className={`flex items-center gap-2 px-3 py-1 rounded w-fit ${decisionConfig.bg}`}>
                                                                <DecisionIcon className={`w-4 h-4 ${decisionConfig.text}`} />
                                                                <span className={`text-sm font-semibold ${decisionConfig.text}`}>
                                                                    {app.decision || 'PENDING'}
                                                                </span>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className="text-sm px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded capitalize">
                                                                {app.status || 'SUBMITTED'}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-teal-600 transition">
                                                                    <Eye className="w-4 h-4" />
                                                                </button>
                                                                <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-blue-600 transition">
                                                                    <Edit2 className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalApplications} total)
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setFilters({ ...filters, page: Math.max(1, filters.page - 1) })}
                                        disabled={filters.page === 1}
                                        className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setFilters({ ...filters, page: Math.min(pagination.totalPages, filters.page + 1) })}
                                        disabled={filters.page === pagination.totalPages}
                                        className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* STATISTICS TAB */}
                {activeTab === 'statistics' && !loading && statistics && (
                    <div className="space-y-6">
                        {/* Overview Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                                <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Total Applications</h3>
                                <p className="text-3xl font-bold text-teal-600">
                                    {statistics.overview.totalApplications}
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                                <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Average Credit Score</h3>
                                <p className="text-3xl font-bold text-blue-600">
                                    {statistics.overview.averageCreditScore}
                                </p>
                            </div>
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                                <h3 className="text-sm font-semibold text-slate-500 uppercase mb-2">Total Loan Amount</h3>
                                <p className="text-3xl font-bold text-green-600">
                                    {statistics.overview.totalLoanAmount}
                                </p>
                            </div>
                        </div>

                        {/* Decision Breakdown */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Decision Breakdown</h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Approved</p>
                                    <p className="text-2xl font-bold text-green-600">{statistics.byDecision.approved}</p>
                                </div>
                                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Rejected</p>
                                    <p className="text-2xl font-bold text-red-600">{statistics.byDecision.rejected}</p>
                                </div>
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Conditional</p>
                                    <p className="text-2xl font-bold text-yellow-600">{statistics.byDecision.conditional}</p>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Pending</p>
                                    <p className="text-2xl font-bold text-slate-600">{statistics.byDecision.pending}</p>
                                </div>
                            </div>
                        </div>

                        {/* Risk Level Breakdown */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Risk Level Distribution</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-700">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Low Risk</p>
                                    <p className="text-2xl font-bold text-green-600">{statistics.byRisk.low}</p>
                                </div>
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-700">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Medium Risk</p>
                                    <p className="text-2xl font-bold text-yellow-600">{statistics.byRisk.medium}</p>
                                </div>
                                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-700">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">High Risk</p>
                                    <p className="text-2xl font-bold text-red-600">{statistics.byRisk.high}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* FAIRNESS ANALYSIS TAB */}
                {activeTab === 'fairness' && !loading && fairnessAnalysis && (
                    <div className="space-y-6">
                        {/* Gender Analysis */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Gender Fairness Analysis</h2>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { key: 'male', label: 'Male', data: fairnessAnalysis.byGender.male },
                                        { key: 'female', label: 'Female', data: fairnessAnalysis.byGender.female },
                                        { key: 'other', label: 'Other', data: fairnessAnalysis.byGender.other }
                                    ].map(item => (
                                        <div key={item.key} className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                                            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{item.label}</h3>
                                            <div className="space-y-2 text-sm">
                                                <div>
                                                    <p className="text-slate-600 dark:text-slate-400">Applications</p>
                                                    <p className="font-bold text-slate-900 dark:text-white">{item.data.count}</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-600 dark:text-slate-400">Approval Rate</p>
                                                    <p className="font-bold text-teal-600">{item.data.approvalRate}%</p>
                                                </div>
                                                <div>
                                                    <p className="text-slate-600 dark:text-slate-400">Avg Score</p>
                                                    <p className="font-bold text-blue-600">{item.data.avgScore}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 p-4 rounded-lg">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">Gender Disparity Index</p>
                                    <p className="text-2xl font-bold text-yellow-600">{fairnessAnalysis.byGender.disparityIndex}%</p>
                                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                                        Difference in approval rates between male and female applicants
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Age Analysis */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Age Group Fairness Analysis</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {[
                                    { key: 'young', label: 'Young (< 30)', data: fairnessAnalysis.byAge.young },
                                    { key: 'middle', label: 'Middle (30-50)', data: fairnessAnalysis.byAge.middle },
                                    { key: 'senior', label: 'Senior (≥ 50)', data: fairnessAnalysis.byAge.senior }
                                ].map(item => (
                                    <div key={item.key} className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                                        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">{item.label}</h3>
                                        <div className="space-y-2 text-sm">
                                            <div>
                                                <p className="text-slate-600 dark:text-slate-400">Applications</p>
                                                <p className="font-bold text-slate-900 dark:text-white">{item.data.count}</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-600 dark:text-slate-400">Approval Rate</p>
                                                <p className="font-bold text-teal-600">{item.data.approvalRate}%</p>
                                            </div>
                                            <div>
                                                <p className="text-slate-600 dark:text-slate-400">Avg Score</p>
                                                <p className="font-bold text-blue-600">{item.data.avgScore}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* USERS TAB */}
                {activeTab === 'users' && !loading && (
                    <div className="space-y-6">
                        {/* User Filters */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                                <Filter className="w-5 h-5 text-teal-600" />
                                Filters
                            </h2>
                            <div className="flex gap-4">
                                <select
                                    value={userFilters.role}
                                    onChange={(e) => setUserFilters({ ...userFilters, role: e.target.value, page: 1 })}
                                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="">All Roles</option>
                                    <option value="USER">User</option>
                                    <option value="ADMIN">Admin</option>
                                </select>

                                <select
                                    value={userFilters.limit}
                                    onChange={(e) => setUserFilters({ ...userFilters, limit: parseInt(e.target.value), page: 1 })}
                                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                                >
                                    <option value="20">20 per page</option>
                                    <option value="50">50 per page</option>
                                    <option value="100">100 per page</option>
                                </select>
                            </div>
                        </div>

                        {/* Users Table */}
                        <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-100 dark:bg-slate-700">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white uppercase">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white uppercase">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white uppercase">Role</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white uppercase">Created</th>
                                            <th className="px-6 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                                        {users.length === 0 ? (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                                                    No users found
                                                </td>
                                            </tr>
                                        ) : (
                                            users.map(user => (
                                                <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-slate-700">
                                                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                                                        {user.fullName || 'N/A'}
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                                        {user.email}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-3 py-1 rounded text-sm font-semibold ${
                                                            user.role === 'ADMIN'
                                                                ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                                                                : 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                                        }`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">
                                                        {new Date(user.createdAt).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                disabled={user.role === 'ADMIN'}
                                                                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                <Edit2 className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setDeleteTarget(user._id);
                                                                    setShowDeleteConfirm(true);
                                                                }}
                                                                disabled={user.role === 'ADMIN'}
                                                                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    Page {pagination.currentPage} of {pagination.totalPages}
                                </p>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setUserFilters({ ...userFilters, page: Math.max(1, userFilters.page - 1) })}
                                        disabled={userFilters.page === 1}
                                        className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setUserFilters({ ...userFilters, page: Math.min(pagination.totalPages, userFilters.page + 1) })}
                                        disabled={userFilters.page === pagination.totalPages}
                                        className="px-3 py-1 border border-slate-300 dark:border-slate-600 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Dialog */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-sm w-full p-6">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                            Delete User
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-6">
                            Are you sure you want to delete this user? All associated applications will also be deleted. This action cannot be undone.
                        </p>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteUser}
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

export default AdminDashboard;