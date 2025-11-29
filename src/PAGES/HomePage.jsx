// src/PAGES/HomePage.jsx - ENHANCED VERSION

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
    Calculator,
    Shield,
    TrendingUp,
    CheckCircle,
    ArrowRight,
    Zap,
    Users,
    Award,
    Lock,
    Smartphone,
    FileText,
    BarChart3,
    Star,
    Mail,
    ChevronDown,
    Play
} from 'lucide-react'
import { Brain, Home, Car, CreditCard, DollarSign, Briefcase } from 'lucide-react'

function HomePage() {
    const { isAuthenticated } = useSelector((state) => state.auth)
    const [expandedFaq, setExpandedFaq] = useState(null)

    // Quick Process Steps
    const quickSteps = [
        {
            icon: FileText,
            number: 1,
            title: 'Fill Form',
            description: 'Complete your application in 5 minutes'
        },
        {
            icon: Brain,
            number: 2,
            title: 'Get Analysis',
            description: 'AI analyzes your creditworthiness instantly'
        },
        {
            icon: CheckCircle,
            number: 3,
            title: 'Get Score',
            description: 'Receive your credit score and recommendations'
        }
    ]

    // Extended Features
    const features = [
        {
            icon: Calculator,
            title: 'Instant Calculation',
            description: 'Get your credit score calculated in seconds. No waiting, no hassle.'
        },
        {
            icon: Shield,
            title: '100% Transparent',
            description: 'See exactly how your score is calculated with detailed factor breakdown.'
        },
        {
            icon: Award,
            title: 'Fair Assessment',
            description: 'Algorithm designed to be fair and unbiased across all demographics.'
        },
        {
            icon: Lock,
            title: 'Bank-Level Security',
            description: 'Your data is encrypted and protected with military-grade security.'
        },
        {
            icon: Smartphone,
            title: 'Mobile Friendly',
            description: 'Access your credit score anytime, anywhere from your mobile device.'
        },
        {
            icon: TrendingUp,
            title: 'Actionable Insights',
            description: 'Get personalized recommendations to improve your credit score.'
        }
    ]

    // Statistics
    const stats = [
        { value: '50K+', label: 'Active Users' },
        { value: '₹500Cr+', label: 'Loans Processed' },
        { value: '95%', label: 'Accuracy Rate' },
        { value: '24/7', label: 'Support' }
    ]

    // Testimonials
    const testimonials = [
        {
            name: 'Rajesh Kumar',
            role: 'Small Business Owner',
            text: 'This platform helped me understand my credit profile. Now I got approved for a business loan!',
            rating: 5
        },
        {
            name: 'Priya Sharma',
            role: 'Student',
            text: 'Transparent and easy to use. I was able to see my score and improve it within months.',
            rating: 5
        },
        {
            name: 'Amit Patel',
            role: 'Professional',
            text: 'Finally, a fair credit scoring system. No hidden factors, just honest evaluation.',
            rating: 5
        }
    ]

    // Use Cases
    const useCases = [
        {
            icon: Home,
            title: 'Home Loans',
            description: 'Get pre-approved for home loans with your credit score'
        },
        {
            icon: Car,
            title: 'Auto Loans',
            description: 'Finance your vehicle with favorable terms'
        },
        {
            icon: CreditCard,
            title: 'Credit Cards',
            description: 'Apply for credit cards with better rewards'
        },
        {
            icon: DollarSign,
            title: 'Personal Loans',
            description: 'Quick approval for personal finances'
        },
        {
            icon: TrendingUp,
            title: 'Investment',
            description: 'Build credit history for better investment opportunities'
        },
        {
            icon: Briefcase,
            title: 'Business Credit',
            description: 'Establish credit for your business ventures'
        }
    ]

    // FAQ Data
    const faqs = [
        {
            question: 'What is a credit score?',
            answer: 'A credit score is a numerical representation of your creditworthiness, typically ranging from 300 to 850. It reflects your credit history, payment behavior, and financial responsibility.'
        },
        {
            question: 'How quickly will I get my score?',
            answer: 'You\'ll receive your credit score instantly after completing the application form. The entire process takes less than 5 minutes.'
        },
        {
            question: 'Is my personal information safe?',
            answer: 'Yes! We use bank-level encryption (256-bit SSL) and follow strict data protection standards. Your information is never shared with third parties.'
        },
        {
            question: 'Can I improve my credit score?',
            answer: 'Absolutely! Our platform provides actionable recommendations to help you improve your score. Focus on timely payments and reducing credit utilization.'
        },
        {
            question: 'How much does it cost?',
            answer: 'Getting your credit score is completely free! We offer comprehensive credit analysis without any hidden charges.'
        },
        {
            question: 'What happens after I get my score?',
            answer: 'You can use your score to apply for loans, credit cards, and other financial products. We also provide personalized recommendations for improvement.'
        }
    ]

    // Resources/Blog
    const resources = [
        {
            title: '5 Ways to Improve Your Credit Score',
            category: 'Guide',
            readTime: '5 min read'
        },
        {
            title: 'Understanding Credit Factors',
            category: 'Tutorial',
            readTime: '8 min read'
        },
        {
            title: 'Credit Score FAQ',
            category: 'FAQ',
            readTime: '10 min read'
        }
    ]

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-teal-50 to-slate-100 dark:from-slate-900 dark:via-teal-900/20 dark:to-slate-900">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(20, 184, 166) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center space-x-2 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 px-4 py-2 rounded-full text-sm font-medium">
                                <Zap className="w-4 h-4" />
                                <span>Fair & Transparent Credit Scoring</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                                Get Your Credit Score
                                <span className="block bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">
                                    In Minutes
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                                Fair, transparent, and instant credit scoring powered by advanced algorithms.
                                Know your creditworthiness and make informed financial decisions.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                {isAuthenticated ? (
                                    <Link
                                        to="/dashboard"
                                        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 font-semibold shadow-lg hover:shadow-xl transition-all group"
                                    >
                                        Go to Dashboard
                                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            to="/register"
                                            className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg hover:from-teal-600 hover:to-teal-700 font-semibold shadow-lg hover:shadow-xl transition-all group"
                                        >
                                            Get Started Free
                                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                        <Link
                                            to="/how-it-works"
                                            className="inline-flex items-center justify-center px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 font-semibold border-2 border-slate-200 dark:border-slate-700 transition-all"
                                        >
                                            Learn More
                                        </Link>
                                    </>
                                )}
                            </div>

                            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 dark:border-slate-700">
                                <div>
                                    <div className="text-3xl font-bold text-slate-900 dark:text-white">500+</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Applications</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-slate-900 dark:text-white">95%</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Accuracy</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-slate-900 dark:text-white">24/7</div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">Available</div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="relative bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                                <div className="text-center space-y-4">
                                    <div className="inline-flex items-center justify-center w-48 h-48 rounded-full bg-gradient-to-br from-teal-500 to-teal-600 mx-auto">
                                        <div className="bg-white dark:bg-slate-800 rounded-full w-40 h-40 flex flex-col items-center justify-center">
                                            <div className="text-5xl font-bold text-slate-900 dark:text-white">720</div>
                                            <div className="text-sm text-slate-600 dark:text-slate-400">Credit Score</div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-600 dark:text-slate-400">Score Range</span>
                                            <span className="font-semibold text-slate-900 dark:text-white">300 - 850</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-teal-500 to-teal-600" style={{ width: '75%' }} />
                                        </div>
                                        <div className="text-center">
                                            <span className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                Excellent Credit
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -top-6 -right-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 animate-float hidden md:block">
                                <div className="flex items-center space-x-2">
                                    <TrendingUp className="w-5 h-5 text-green-500" />
                                    <span className="text-sm font-semibold text-slate-900 dark:text-white">+50 Points</span>
                                </div>
                            </div>

                            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 rounded-lg shadow-lg p-4 animate-float-delayed hidden md:block">
                                <div className="flex items-center space-x-2">
                                    <Shield className="w-5 h-5 text-teal-500" />
                                    <span className="text-sm font-semibold text-slate-900 dark:text-white">Secure</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Process Section */}
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Simple 3-Step Process
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Get your credit score in just minutes
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {quickSteps.map((step, idx) => {
                            const Icon = step.icon
                            return (
                                <div key={idx} className="relative">
                                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/30 dark:to-teal-900/10 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
                                        <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-600 text-white rounded-full mb-6 mx-auto">
                                            <span className="text-2xl font-bold">{step.number}</span>
                                        </div>
                                        <Icon className="w-8 h-8 text-teal-600 mx-auto mb-4" />
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-600 dark:text-slate-400">
                                            {step.description}
                                        </p>
                                    </div>
                                    {idx < 2 && (
                                        <div className="hidden md:flex absolute top-1/3 -right-4 z-10">
                                            <ArrowRight className="w-8 h-8 text-teal-600" />
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Extended Features Section */}
            <section className="py-20 bg-slate-50 dark:bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Why Choose Our Credit Scoring?
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                            Transparent, fair, and instant credit evaluation powered by advanced algorithms
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon
                            return (
                                <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl p-8 hover:shadow-xl transition-shadow">
                                    <div className="bg-gradient-to-br from-teal-500 to-teal-600 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {feature.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-20 bg-gradient-to-r from-teal-600 to-teal-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-teal-100">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            What Users Say
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Join thousands of satisfied customers
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, idx) => (
                            <div key={idx} className="bg-slate-50 dark:bg-slate-800 rounded-xl p-8 hover:shadow-lg transition-shadow">
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <p className="text-slate-600 dark:text-slate-300 mb-6">
                                    "{testimonial.text}"
                                </p>
                                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                                    <div className="font-semibold text-slate-900 dark:text-white">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-sm text-slate-600 dark:text-slate-400">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="py-20 bg-slate-50 dark:bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Use Your Credit Score
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Access better financial opportunities
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {useCases.map((useCase, idx) => {
                            const Icon = useCase.icon
                            return (
                                <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl p-8 hover:shadow-lg transition-shadow">
                                    <Icon className="w-8 h-8 text-teal-600 mb-4" />
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                        {useCase.title}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {useCase.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <div key={idx} className="bg-slate-50 dark:bg-slate-800 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                                >
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white text-left">
                                        {faq.question}
                                    </h3>
                                    <ChevronDown className={`w-5 h-5 text-teal-600 transition-transform ${expandedFaq === idx ? 'rotate-180' : ''}`} />
                                </button>
                                {expandedFaq === idx && (
                                    <div className="px-6 py-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
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

            {/* Resources Section */}
            <section className="py-20 bg-slate-50 dark:bg-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                            Learning Resources
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-400">
                            Improve your financial literacy
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {resources.map((resource, idx) => (
                            <Link key={idx} to="#" className="bg-white dark:bg-slate-900 rounded-xl p-8 hover:shadow-lg transition-all group cursor-pointer">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="inline-flex px-3 py-1 bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 rounded-full text-sm font-medium">
                                        {resource.category}
                                    </span>
                                    <Play className="w-5 h-5 text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-teal-600 transition">
                                    {resource.title}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                    {resource.readTime}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Signup */}
            <section className="py-20 bg-gradient-to-r from-teal-600 to-blue-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Stay Updated
                    </h2>
                    <p className="text-xl text-teal-100 mb-8">
                        Get tips, guides, and updates about credit management
                    </p>
                    <div className="flex gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                        />
                        <button className="px-8 py-3 bg-white text-teal-600 rounded-lg hover:bg-slate-50 font-semibold transition-all">
                            <Mail className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            {!isAuthenticated && (
                <section className="py-20 bg-gradient-to-r from-teal-500 to-teal-600">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Check Your Credit Score?
                        </h2>
                        <p className="text-xl text-teal-100 mb-8">
                            Join thousands of users who trust our fair credit scoring system
                        </p>
                        <Link
                            to="/register"
                            className="inline-flex items-center px-8 py-4 bg-white text-teal-600 rounded-lg hover:bg-slate-50 font-semibold shadow-lg hover:shadow-xl transition-all group"
                        >
                            Get Started Now
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </section>
            )}
        </div>
    )
}

export default React.memo(HomePage)

// Note: Import the missing icons at the top:
// import { Brain, Home, Car, CreditCard, DollarSign, Briefcase } from 'lucide-react'
// (Add these to your existing imports)