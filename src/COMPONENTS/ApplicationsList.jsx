// src/components/ApplicationsList.jsx

import { Link } from 'react-router-dom';
import { ArrowRight, FileText, XCircle, CheckCircle } from 'lucide-react';

function ApplicationsList({ data = [], onCalculate, onDelete }) {
    if (!data.length) {
        return (
            <div className="text-center py-16 text-slate-500">
                <FileText className="mx-auto mb-2 w-10 h-10" />
                No applications found.
            </div>
        );
    }
    return (
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
            {data.map(app => (
                <div 
                    key={app._id}
                    className="flex flex-col md:flex-row md:items-center justify-between py-6 gap-2"
                >
                    <div>
                        <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
                            {app.applicantName}
                        </h4>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Loan of ₹{app.loanAmount} | for <span className="capitalize">{app.loanPurpose}</span> | Tenure: {app.loanTenure} months
                        </p>
                        <p className="text-xs text-slate-400">
                            Applied on {new Date(app.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 mt-3 md:mt-0">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            app.decision === "APPROVED" ? "bg-green-200 text-green-800" :
                            app.decision === "REJECTED" ? "bg-red-200 text-red-800" :
                            app.decision === "CONDITIONAL" ? "bg-yellow-200 text-yellow-800" :
                            "bg-slate-200 text-slate-800"
                        }`}>
                            {app.decision || "PENDING"}
                        </span>
                        <span className="text-xs text-slate-600 dark:text-slate-300">
                            Score: {app.creditScore || "N/A"}
                        </span>
                        <Link to={`/applications/${app._id}`} className="btn-link">
                            View <ArrowRight className="inline w-4 h-4" />
                        </Link>
                        {!app.creditScore &&
                            <button onClick={() => onCalculate(app._id)}
                                className="px-3 py-1 bg-teal-500 hover:bg-teal-600 text-white rounded text-xs"
                            >Calculate Score</button>
                        }
                        <button onClick={() => onDelete(app._id)}
                            className="px-3 py-1 bg-red-400 hover:bg-red-500 text-white rounded text-xs"
                        ><XCircle className="inline w-4 h-4" /></button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ApplicationsList;
