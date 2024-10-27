import React, { useEffect, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { UserCircle, Calendar, LogOut, Edit, ChevronRight, Bell } from 'lucide-react';
import EditProfileForm from './EditProfileForm';

interface DashboardProps {
    userId: string;
}

interface UserData {
    name: string;
    email: string;
    phoneNumber: string;
}

export const Dashboard = ({ userId }: DashboardProps) => {
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        name: 'User',
        email: '',
        phoneNumber: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDocRef = doc(db, 'users', userId);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserData(userDoc.data() as UserData);
                } else {
                    toast.error('User data not found');
                }
            } catch (error) {
                toast.error('Failed to fetch user data');
                console.error('Error fetching user data:', error);
            }
        };

        if (userId) {
            fetchUserData();
        }
    }, [userId]);

    const handleProfileUpdate = (updatedName: string, updatedPhone: string) => {
        setUserData({ ...userData, name: updatedName, phoneNumber: updatedPhone });
        setIsEditProfileOpen(false);
        toast.success('Profile updated successfully');
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success('Logged out successfully');
            navigate('/login');
        } catch (error) {
            toast.error('Failed to log out');
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="min-h-screen bg-white font-['SF Pro Display']">
            {/* Top Navigation Bar */}
            <div className="border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-medium text-black">Dashboard</h1>
                        <div className="flex items-center gap-4">
                            <button
                                title='Notifications'
                                className="p-2 hover:bg-gray-50 rounded-full">
                                <Bell size={20} className="text-gray-600" />
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            >
                                <LogOut size={18} />
                                Log Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Calendar Section */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Calendar Preview Card */}
                        <div onClick={() => navigate('/calendar')}
                            className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-medium">Your Calendar</h2>
                                    <Calendar size={24} className="text-emerald-600" />
                                </div>
                                {/* Calendar Preview Placeholder */}
                                <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-7 gap-2">
                                    {[...Array(7)].map((_, i) => (
                                        <div key={i} className="aspect-square bg-white rounded border border-gray-100"></div>
                                    ))}
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
                                <span className="text-sm text-gray-600 font-semibold">View full calendar</span>
                                <ChevronRight size={16} className="text-gray-400" />
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-emerald-50 rounded-lg p-6">
                                <h3 className="text-sm text-emerald-600 font-medium mb-2">Upcoming Events</h3>
                                <p className="text-2xl font-medium">3</p>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-6">
                                <h3 className="text-sm text-blue-600 font-medium mb-2">Tasks Due Today</h3>
                                <p className="text-2xl font-medium">2</p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Section */}
                    <div className="space-y-6">
                        {/* Profile Card */}
                        <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="bg-gray-50 p-3 rounded-full">
                                    <UserCircle size={40} className="text-gray-600" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-medium">{userData.name}</h2>
                                    <p className="text-gray-600 text-sm">{userData.email}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm text-gray-600 mb-1">Phone</p>
                                    <p className="font-medium">{userData.phoneNumber || 'Not set'}</p>
                                </div>

                                <button
                                    onClick={() => setIsEditProfileOpen(true)}
                                    className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <Edit size={18} className="text-gray-600" />
                                        <span className="text-gray-600">Edit Profile</span>
                                    </div>
                                    <ChevronRight size={18} className="text-gray-400" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Profile Modal */}
                {isEditProfileOpen && (
                    <EditProfileForm
                        userId={userId}
                        initialName={userData.name}
                        initialPhoneNumber={userData.phoneNumber}
                        onSave={handleProfileUpdate}
                        onClose={() => setIsEditProfileOpen(false)}
                    />
                )}
            </div>
            <Toaster position="top-center" />
        </div>
    );
};

export default Dashboard;