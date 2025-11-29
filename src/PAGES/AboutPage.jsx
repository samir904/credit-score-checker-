// src/PAGES/AboutPage.jsx
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { 
    Heart, 
    Shield, 
    TrendingUp, 
    Users, 
    Award, 
    Target,
    ArrowRight,
    CheckCircle2,
    Zap,
    Lock
} from 'lucide-react'

function AboutPage() {
    const navigate = useNavigate()

    // FAQ Data
    const faqs = [
        {
            question: 'What is a credit score?',
            answer: 'A credit score is a numerical representation of your creditworthiness, typically ranging from 300 to 850. It reflects your credit history, payment behavior, and financial responsibility.'
        },
        {
            question: 'How is my credit score calculated?',
            answer: 'Your credit score is calculated using our advanced ML algorithm that analyzes payment history, credit utilization, length of credit history, credit mix, and recent inquiries.'
        },
        {
            question: 'How often is my score updated?',
            answer: 'Your credit score is calculated in real-time when you apply. Updates occur whenever new financial information is added to your profile.'
        },
        {
            question: 'Is my data secure?',
            answer: 'Yes! We use bank-level encryption and security protocols to protect your personal and financial information. Your data is never shared with third parties.'
        },
        {
            question: 'Can I improve my credit score?',
            answer: 'Absolutely! By maintaining on-time payments, reducing credit utilization, and building a diverse credit mix, you can significantly improve your score.'
        },
        {
            question: 'What happens after I apply for a loan?',
            answer: 'After analysis, you\'ll receive a decision (Approved, Rejected, or Conditional). For approved applications, funds are typically disbursed within 2-3 business days.'
        }
    ]

    // Core Values
    const values = [
        {
            icon: Heart,
            title: 'Trust',
            description: 'We believe in complete transparency with our users'
        },
        {
            icon: Shield,
            title: 'Security',
            description: 'Your data is protected with military-grade encryption'
        },
        {
            icon: TrendingUp,
            title: 'Innovation',
            description: 'Using cutting-edge AI and ML for accurate assessments'
        },
        {
            icon: Users,
            title: 'Community',
            description: 'Empowering individuals to achieve financial goals'
        }
    ]

    // Statistics
    const stats = [
        { number: '50K+', label: 'Active Users' },
        { number: '₹500Cr+', label: 'Loans Processed' },
        { number: '95%', label: 'Customer Satisfaction' },
        { number: '24/7', label: 'Support Available' }
    ]

    const [expandedFaq, setExpandedFaq] = React.useState(null)

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
                        About Credit Score Checker
                    </h1>
                    <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                        Empowering individuals with accurate credit assessment and fair loan opportunities
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/apply')}
                            className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold transition"
                        >
                            Get Started Now
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="px-8 py-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-semibold transition"
                        >
                            Sign In
                        </button>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 md:p-12">
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                            <Target className="w-8 h-8 text-teal-600" />
                            Our Mission
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
                            To revolutionize credit assessment in India by providing fair, transparent, and instant credit decisions to everyone. We believe that financial inclusion should not be complicated.
                        </p>
                        <p className="text-lg text-slate-600 dark:text-slate-300">
                            Our platform uses advanced machine learning algorithms to analyze creditworthiness fairly and objectively, eliminating biases and providing equal opportunities to all applicants regardless of their background.
                        </p>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-white dark:bg-slate-800">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-16">
                        Our Impact
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl font-bold text-teal-600 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-slate-600 dark:text-slate-300">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-16">
                        Our Core Values
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => {
                            const Icon = value.icon
                            return (
                                <div key={index} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-lg transition text-center">
                                    <Icon className="w-12 h-12 text-teal-600 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                        {value.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300">
                                        {value.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Key Features Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-white dark:bg-slate-800">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-16">
                        Why Choose Us
                    </h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <Zap className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                        Instant Decisions
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300">
                                        Get your credit assessment and loan decision in seconds, not days
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Lock className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                        Bank-Level Security
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300">
                                        Your data is encrypted and protected with industry-leading security
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Award className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                        AI-Powered Algorithm
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300">
                                        Advanced machine learning for fair and accurate credit assessment
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <CheckCircle2 className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                        Transparent Process
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300">
                                        Understand exactly how your score is calculated and why decisions are made
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Users className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                        Inclusive Lending
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300">
                                        Fair opportunities for everyone regardless of background or history
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Shield className="w-6 h-6 text-teal-600 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                        24/7 Support
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-300">
                                        Our customer support team is always available to help you
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-16">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                                >
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white text-left">
                                        {faq.question}
                                    </h3>
                                    <ArrowRight className={`w-5 h-5 text-teal-600 transition-transform ${expandedFaq === index ? 'rotate-90' : ''}`} />
                                </button>
                                {expandedFaq === index && (
                                    <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-700">
                                        <p className="text-slate-600 dark:text-slate-300">
                                            {faq.answer}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-teal-600 to-blue-600">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">
                        Ready to Check Your Credit Score?
                    </h2>
                    <p className="text-xl text-teal-100 mb-8">
                        Join thousands of users who have already improved their financial health
                    </p>
                    <button
                        onClick={() => navigate('/apply')}
                        className="px-8 py-3 bg-white text-teal-600 hover:bg-slate-100 rounded-lg font-semibold transition inline-flex items-center gap-2"
                    >
                        Start Your Application
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </section>
        </div>
    )
}

export default React.memo(AboutPage)

