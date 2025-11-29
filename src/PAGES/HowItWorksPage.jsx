// src/PAGES/HowItWorksPage.jsx

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    FileText,
    Brain,
    CheckCircle,
    DollarSign,
    Clock,
    Shield,
    ArrowRight,
    Zap,
    TrendingUp,
    BarChart3,
    AlertCircle,
    Lightbulb
} from 'lucide-react'

function HowItWorksPage() {
    const navigate = useNavigate()
    const [activeStep, setActiveStep] = useState(0)

    // Process Steps
    const steps = [
        {
            number: 1,
            icon: FileText,
            title: 'Fill Application',
            description: 'Complete a simple form with your basic information and financial details',
            details: [
                'Personal information (name, age, contact)',
                'Employment details (company, tenure, salary)',
                'Financial information (income, existing loans)',
                'Loan requirements (amount, purpose, tenure)'
            ],
            time: '5-10 minutes'
        },
        {
            number: 2,
            icon: Brain,
            title: 'AI Analysis',
            description: 'Our advanced ML algorithm analyzes your creditworthiness',
            details: [
                'Machine learning model evaluation',
                'Credit score calculation',
                'Risk assessment analysis',
                'Fairness check (no bias)'
            ],
            time: 'Real-time'
        },
        {
            number: 3,
            icon: BarChart3,
            title: 'Credit Score',
            description: 'Receive your detailed credit score and analysis report',
            details: [
                'Credit score (300-850 range)',
                'Score breakdown by category',
                'Key strengths and weaknesses',
                'Recommendations for improvement'
            ],
            time: 'Instant'
        },
        {
            number: 4,
            icon: CheckCircle,
            title: 'Decision',
            description: 'Get your loan application decision instantly',
            details: [
                'Status: Approved/Rejected/Conditional',
                'Decision explanation',
                'Conditions (if applicable)',
                'Next steps information'
            ],
            time: 'Immediate'
        },
        {
            number: 5,
            icon: DollarSign,
            title: 'Fund Transfer',
            description: 'If approved, funds are transferred to your account',
            details: [
                'Loan disbursement process',
                'Fund transfer to bank account',
                'Repayment schedule',
                'Account management access'
            ],
            time: '2-3 days'
        }
    ]

    // Key Metrics
    const metrics = [
        { icon: Zap, label: 'Instant Decisions', value: '< 5 seconds' },
        { icon: TrendingUp, label: 'Approval Rate', value: '92%' },
        { icon: Clock, label: 'Fund Disbursement', value: '2-3 days' },
        { icon: Shield, label: 'Data Security', value: '256-bit SSL' }
    ]

    // Algorithm Factors
    const factors = [
        {
            title: 'Payment History',
            percentage: 35,
            description: 'Your track record of paying bills on time'
        },
        {
            title: 'Credit Utilization',
            percentage: 30,
            description: 'How much of your available credit you use'
        },
        {
            title: 'Credit History Length',
            percentage: 15,
            description: 'How long you\'ve been using credit'
        },
        {
            title: 'Credit Mix',
            percentage: 10,
            description: 'Variety of credit types (loans, cards, etc)'
        },
        {
            title: 'Recent Inquiries',
            percentage: 10,
            description: 'New credit applications and inquiries'
        }
    ]

    // Benefits
    const benefits = [
        {
            icon: Lightbulb,
            title: 'Transparent Process',
            description: 'Understand exactly how your score is calculated'
        },
        {
            icon: Shield,
            title: 'Secure & Safe',
            description: 'Your data is encrypted and protected'
        },
        {
            icon: Zap,
            title: 'Fast & Easy',
            description: 'Get results in seconds, not days'
        },
        {
            icon: TrendingUp,
            title: 'Improve Your Score',
            description: 'Actionable recommendations to boost creditworthiness'
        },
        {
            icon: CheckCircle,
            title: 'Fair Decisions',
            description: 'Unbiased AI algorithm for equal opportunities'
        },
        {
            icon: AlertCircle,
            title: '24/7 Support',
            description: 'Our team is always available to help'
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            {/* Hero Section */}
            <section className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-teal-600 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-4xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                        How It Works
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                        Get your credit score and loan decision in 5 simple steps
                    </p>
                </div>
            </section>

            {/* Process Steps - Interactive */}
            <section className="py-20 px-4 md:px-8 lg:px-16">
                <div className="max-w-6xl mx-auto">
                    {/* Desktop Timeline */}
                    <div className="hidden md:block">
                        <div className="relative">
                            {/* Timeline Line */}
                            <div className="absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-teal-600 to-blue-600"></div>

                            {/* Steps Grid */}
                            <div className="grid grid-cols-5 gap-4 relative z-10">
                                {steps.map((step, index) => {
                                    const Icon = step.icon
                                    return (
                                        <div key={index} className="flex flex-col items-center">
                                            <button
                                                onClick={() => setActiveStep(index)}
                                                className={`w-16 h-16 rounded-full flex items-center justify-center transition mb-4 ${
                                                    activeStep === index
                                                        ? 'bg-teal-600 text-white scale-110'
                                                        : 'bg-white dark:bg-slate-800 text-teal-600 hover:bg-slate-50 dark:hover:bg-slate-700'
                                                }`}
                                            >
                                                <Icon className="w-8 h-8" />
                                            </button>
                                            <h3 className="text-sm font-semibold text-center text-slate-900 dark:text-white">
                                                {step.title}
                                            </h3>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Active Step Details */}
                        <div className="mt-16 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-12">
                            <div className="flex gap-8">
                                <div className="flex-shrink-0">
                                    {React.createElement(steps[activeStep].icon, {
                                        className: 'w-16 h-16 text-teal-600'
                                    })}
                                </div>
                                <div className="flex-grow">
                                    <div className="flex items-center gap-4 mb-4">
                                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                                            Step {steps[activeStep].number}: {steps[activeStep].title}
                                        </h2>
                                        <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300 rounded-full text-sm font-semibold">
                                            {steps[activeStep].time}
                                        </span>
                                    </div>
                                    <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                                        {steps[activeStep].description}
                                    </p>
                                    <ul className="space-y-3">
                                        {steps[activeStep].details.map((detail, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <CheckCircle className="w-5 h-5 text-teal-600 flex-shrink-0" />
                                                <span className="text-slate-600 dark:text-slate-300">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Version */}
                    <div className="md:hidden space-y-6">
                        {steps.map((step, index) => {
                            const Icon = step.icon
                            return (
                                <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden">
                                    <button
                                        onClick={() => setActiveStep(activeStep === index ? null : index)}
                                        className="w-full px-6 py-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                                    >
                                        <div className="flex items-center gap-4 text-left">
                                            <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900 flex items-center justify-center flex-shrink-0">
                                                <Icon className="w-6 h-6 text-teal-600" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                                    {step.title}
                                                </h3>
                                                <p className="text-sm text-teal-600 font-semibold">
                                                    {step.time}
                                                </p>
                                            </div>
                                        </div>
                                        <ArrowRight className={`w-5 h-5 text-slate-400 transition-transform ${activeStep === index ? 'rotate-90' : ''}`} />
                                    </button>
                                    {activeStep === index && (
                                        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700">
                                            <p className="text-slate-600 dark:text-slate-300 mb-4">
                                                {step.description}
                                            </p>
                                            <ul className="space-y-2">
                                                {step.details.map((detail, idx) => (
                                                    <li key={idx} className="flex items-start gap-2">
                                                        <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                                                        <span className="text-sm text-slate-600 dark:text-slate-300">{detail}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Key Metrics */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-white dark:bg-slate-800">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-16">
                        Why Choose Our Platform
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {metrics.map((metric, index) => {
                            const Icon = metric.icon
                            return (
                                <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-6 text-center">
                                    <Icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                                    <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                                        {metric.value}
                                    </div>
                                    <div className="text-slate-600 dark:text-slate-300">
                                        {metric.label}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Algorithm Factors */}
            <section className="py-20 px-4 md:px-8 lg:px-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-16">
                        Credit Score Calculation
                    </h2>
                    <div className="space-y-6">
                        {factors.map((factor, index) => (
                            <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        {factor.title}
                                    </h3>
                                    <span className="text-teal-600 font-bold text-lg">
                                        {factor.percentage}%
                                    </span>
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 mb-4">
                                    {factor.description}
                                </p>
                                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-teal-600 to-blue-600 h-2 rounded-full transition-all duration-500"
                                        style={{ width: `${factor.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-white dark:bg-slate-800">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-16">
                        Benefits
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => {
                            const Icon = benefit.icon
                            return (
                                <div key={index} className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-800 rounded-xl p-8 text-center hover:shadow-lg transition">
                                    <Icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300">
                                        {benefit.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-teal-600 to-blue-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-teal-100 mb-8">
                        Complete your application now and get your credit score instantly
                    </p>
                    <button
                        onClick={() => navigate('/apply')}
                        className="px-8 py-3 bg-white text-teal-600 hover:bg-slate-100 rounded-lg font-semibold transition inline-flex items-center gap-2"
                    >
                        Start Application
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>
        </div>
    )
}

export default React.memo(HowItWorksPage)