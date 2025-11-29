// src/components/ApplicationForm.jsx

import { useState } from "react";

const initialForm = {
    applicantName: '',
    age: '',
    gender: 'MALE',
    maritalStatus: 'SINGLE',
    annualIncome: '',
    monthlyDebt: '',
    employmentStatus: 'FULL_TIME',
    employmentYears: '',
    creditHistoryYears: '',
    existingLoans: '',
    hasDefaultHistory: false,
    loanAmount: '',
    loanPurpose: 'PERSONAL',
    loanTenure: '',
    hasCollateral: false,
    collateralValue: '',
    homeOwnership: 'RENT'
};

function ApplicationForm({ onSubmit, loading }) {
    const [form, setForm] = useState(initialForm);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Minimal checks
        if (!form.applicantName || !form.age || !form.annualIncome || !form.loanAmount) {
            setError("Fill all required fields!");
            return;
        }
        setError('');
        onSubmit(form);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
            <h2 className="text-2xl font-bold mb-4">New Loan Application</h2>

            {error && (
                <div className="p-2 bg-red-50 border border-red-200 text-red-700 rounded">
                    {error}
                </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
                {/* Left */}
                <div className="space-y-4">
                    <div>
                        <label className="font-medium block mb-1">Applicant Name</label>
                        <input type="text" name="applicantName" value={form.applicantName}
                            onChange={handleChange}
                            required className="input" placeholder="Full Name" />
                    </div>
                    <div>
                        <label className="font-medium block mb-1">Age</label>
                        <input type="number" name="age" value={form.age}
                            onChange={handleChange}
                            required min={18} className="input" placeholder="Age" />
                    </div>
                    <div>
                        <label className="font-medium block mb-1">Gender</label>
                        <select name="gender" value={form.gender}
                            onChange={handleChange}
                            className="input">
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                            <option value="OTHER">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-medium block mb-1">Marital Status</label>
                        <select name="maritalStatus" value={form.maritalStatus}
                            onChange={handleChange}
                            className="input">
                            <option value="SINGLE">Single</option>
                            <option value="MARRIED">Married</option>
                            <option value="DIVORCED">Divorced</option>
                            <option value="WIDOWED">Widowed</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-medium block mb-1">Annual Income (₹)</label>
                        <input type="number" name="annualIncome" value={form.annualIncome}
                            onChange={handleChange}
                            required min={0} className="input" placeholder="e.g. 500000" />
                    </div>
                    <div>
                        <label className="font-medium block mb-1">Monthly Debt (₹)</label>
                        <input type="number" name="monthlyDebt" value={form.monthlyDebt}
                            onChange={handleChange}
                            required min={0} className="input" placeholder="e.g. 12000" />
                    </div>
                </div>
                {/* Right */}
                <div className="space-y-4">
                    <div>
                        <label className="font-medium block mb-1">Employment Status</label>
                        <select name="employmentStatus" value={form.employmentStatus}
                            onChange={handleChange} className="input">
                            <option value="FULL_TIME">Full Time</option>
                            <option value="PART_TIME">Part Time</option>
                            <option value="SELF_EMPLOYED">Self Employed</option>
                            <option value="UNEMPLOYED">Unemployed</option>
                            <option value="RETIRED">Retired</option>
                        </select>
                    </div>
                    <div>
                        <label className="font-medium block mb-1">Employment Years</label>
                        <input type="number" name="employmentYears" value={form.employmentYears}
                            onChange={handleChange}
                            min={0} className="input" placeholder="Years" />
                    </div>
                    <div>
                        <label className="font-medium block mb-1">Credit History Years</label>
                        <input type="number" name="creditHistoryYears" value={form.creditHistoryYears}
                            onChange={handleChange}
                            min={0} required className="input" placeholder="Years" />
                    </div>
                    <div>
                        <label className="font-medium block mb-1">Existing Loans</label>
                        <input type="number" name="existingLoans" value={form.existingLoans}
                            onChange={handleChange}
                            min={0} className="input" placeholder="Number" />
                    </div>
                    <div>
                        <label className="font-medium block mb-1">Any Default History?</label>
                        <input type="checkbox" name="hasDefaultHistory"
                            checked={form.hasDefaultHistory}
                            onChange={handleChange}
                            className="ml-2 align-middle" /> Yes
                    </div>
                </div>
            </div>
            {/* Loan section */}
            <div className="grid md:grid-cols-3 gap-6">
                <div>
                    <label className="font-medium block mb-1">Loan Amount (₹)</label>
                    <input type="number" name="loanAmount" value={form.loanAmount}
                        onChange={handleChange}
                        required min={1000} className="input" placeholder="e.g. 500000" />
                </div>
                <div>
                    <label className="font-medium block mb-1">Loan Purpose</label>
                    <select name="loanPurpose" value={form.loanPurpose}
                        onChange={handleChange} className="input">
                        <option value="PERSONAL">Personal</option>
                        <option value="HOME">Home</option>
                        <option value="CAR">Car</option>
                        <option value="EDUCATION">Education</option>
                        <option value="BUSINESS">Business</option>
                        <option value="MEDICAL">Medical</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>
                <div>
                    <label className="font-medium block mb-1">Loan Tenure (months)</label>
                    <input type="number" name="loanTenure" value={form.loanTenure}
                        onChange={handleChange}
                        min={6} required className="input" placeholder="e.g. 60" />
                </div>
            </div>
            {/* Collateral */}
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="font-medium block mb-1">Collateral Provided?</label>
                    <input type="checkbox" name="hasCollateral"
                        checked={form.hasCollateral}
                        onChange={handleChange} className="ml-2 align-middle" /> Yes
                </div>
                <div>
                    <label className="font-medium block mb-1">Collateral Value (₹)</label>
                    <input type="number" name="collateralValue" value={form.collateralValue}
                        onChange={handleChange}
                        min={0} className="input" placeholder="e.g. 200000" />
                </div>
            </div>
            <div>
                <label className="font-medium block mb-1">Home Ownership</label>
                <select name="homeOwnership" value={form.homeOwnership}
                    onChange={handleChange} className="input">
                    <option value="RENT">Rent</option>
                    <option value="OWN">Own</option>
                    <option value="MORTGAGE">Mortgage</option>
                    <option value="OTHER">Other</option>
                </select>
            </div>
            <button type="submit" disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg font-semibold mt-3 hover:from-teal-600 hover:to-teal-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {loading ? "Submitting..." : "Submit Application"}
            </button>
        </form>
    );
}

export default ApplicationForm;
