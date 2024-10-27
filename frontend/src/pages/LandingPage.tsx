import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { Calendar, Clock, Users, Layout, ArrowRight } from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Calendar className="w-6 h-6 text-emerald-600" />,
      title: "Smart Scheduling",
      description: "Intelligent calendar syncing across all your devices"
    },
    {
      icon: <Clock className="w-6 h-6 text-emerald-600" />,
      title: "Time Management",
      description: "Set smart reminders and never miss important events"
    },
    {
      icon: <Users className="w-6 h-6 text-emerald-600" />,
      title: "Team Collaboration",
      description: "Share and coordinate schedules effortlessly"
    },
    {
      icon: <Layout className="w-6 h-6 text-emerald-600" />,
      title: "Flexible Views",
      description: "Customize your calendar view to suit your needs"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-['SF Pro Display']">
      {/* Hero Section */}
      <div className="container mx-auto px-4 pt-20 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-medium text-black leading-tight tracking-tight">
                Organize Your Time,
                <span className="text-emerald-600"> Simplify Your Life</span>
              </h1>
              <p className="mt-6 text-xl text-gray-600 font-normal leading-relaxed">
                The smart calendar that adapts to your lifestyle. Schedule, collaborate, and stay organized with our intuitive platform.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => navigate('/signup')}
                  className="px-8 py-4 bg-black text-white rounded-lg font-medium shadow-sm hover:bg-gray-900 transition-all flex items-center justify-center group"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="px-8 py-4 border border-gray-200 text-black rounded-lg font-medium hover:border-gray-300 transition-all"
                >
                  Sign In
                </button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="w-full h-96 bg-emerald-50 rounded-lg shadow-sm transform rotate-2">
                <div className="absolute inset-0 bg-white rounded-lg -rotate-4 shadow-sm border border-gray-100">
                  <div className="p-6">
                    <div className="h-4 w-32 bg-emerald-50 rounded mb-4"></div>
                    <div className="space-y-3">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="flex gap-2">
                          <div className="h-4 w-4 bg-emerald-100 rounded"></div>
                          <div className="h-4 w-48 bg-gray-50 rounded"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-medium text-black tracking-tight">
                Everything you need to stay organized
              </h2>
              <p className="mt-4 text-xl text-gray-600 font-normal">
                Powerful features to help you manage your time effectively
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium text-black mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Toaster position="top-center" />
    </div>
  );
};

export default LandingPage;