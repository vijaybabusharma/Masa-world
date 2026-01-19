
import React, { useEffect, useState } from 'react';
import { NavigationProps } from '../types';
import { 
    UsersIcon, 
    CalendarDaysIcon, 
    CreditCardIcon, 
    DocumentTextIcon, 
    BellIcon,
    ArrowRightIcon,
    ShieldCheckIcon,
    DownloadIcon
} from '../components/icons/FeatureIcons';
import DigitalIdCard from '../components/DigitalIdCard';

const DashboardPage: React.FC<NavigationProps> = ({ navigateTo }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userPhoto, setUserPhoto] = useState('https://i.pravatar.cc/150?u=aishasharma');

    const mockUser = {
      name: "Aisha Sharma",
      memberId: "MASA-2024-8451",
      category: "Life Member",
      issueDate: "Jan 01, 2024",
      validThru: "Lifetime",
    };

    useEffect(() => {
        const auth = sessionStorage.getItem('masa_member_auth');
        if (auth === 'true') {
            setIsLoggedIn(true);
        } else {
            navigateTo('login');
        }
    }, [navigateTo]);

    const handleLogout = () => {
        sessionStorage.removeItem('masa_member_auth');
        navigateTo('home');
    };

    const handleDownload = (format: 'PNG' | 'PDF') => {
        console.log(`Simulating download of Member ID card as ${format}...`);
        alert(`Downloading ID Card as ${format} (simulated).`);
    };
    
    const handlePhotoUpdate = () => {
        // This is a mock. In a real app, this would open a file dialog.
        const newPhotoId = Date.now();
        setUserPhoto(`https://i.pravatar.cc/150?u=${newPhotoId}`);
        alert("Member photo updated (simulated).");
    };

    if (!isLoggedIn) {
        return null; // or a loading spinner
    }

    const dashboardItems = [
        { title: "My Profile", icon: UsersIcon, desc: "View and edit your personal details." },
        { title: "Event Registrations", icon: CalendarDaysIcon, desc: "See your upcoming and past events." },
        { title: "Payment History", icon: CreditCardIcon, desc: "Review your membership contributions." },
        { title: "Download Certificate", icon: DocumentTextIcon, desc: "Access your official membership certificate." },
        { title: "Announcements", icon: BellIcon, desc: "Latest news and updates from MASA." },
    ];

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-masa-charcoal">Member Dashboard</h1>
                    <button onClick={handleLogout} className="text-sm font-medium text-red-600 hover:underline">Logout</button>
                </div>
            </header>

            <main className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Welcome Banner */}
                    <div className="bg-white p-8 rounded-2xl shadow-md mb-12 border-l-4 border-masa-orange">
                        <h2 className="text-3xl font-bold text-masa-charcoal">Welcome Back, {mockUser.name.split(' ')[0]}!</h2>
                        <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-4 text-gray-600">
                            <div className="flex items-center gap-2">
                                <ShieldCheckIcon className="h-5 w-5 text-green-500"/>
                                <p><strong>Membership Status:</strong> {mockUser.category} (Active)</p>
                            </div>
                            <p><strong>Member Since:</strong> {mockUser.issueDate}</p>
                        </div>
                    </div>
                    
                    {/* Digital ID Card Section */}
                    <div className="mb-12">
                        <div className="grid md:grid-cols-12 gap-8 items-center">
                            <div className="md:col-span-12 lg:col-span-4">
                                <DigitalIdCard {...mockUser} photoUrl={userPhoto} />
                            </div>
                            <div className="md:col-span-12 lg:col-span-8 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                                <h3 className="font-bold text-2xl text-masa-charcoal">Your Digital Member ID</h3>
                                <p className="text-gray-600 mt-2 mb-6">Keep your digital ID handy on your mobile device. Download it as an image or a printable PDF. The QR code can be scanned for quick verification.</p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button onClick={() => handleDownload('PNG')} className="flex-1 flex items-center justify-center gap-2 bg-masa-blue text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-900 transition-colors shadow-sm">
                                        <DownloadIcon className="h-5 w-5"/> Download as Image
                                    </button>
                                    <button onClick={() => handleDownload('PDF')} className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-800 px-6 py-3 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                                        <DownloadIcon className="h-5 w-5"/> Download as PDF
                                    </button>
                                </div>
                                 <div className="mt-6 pt-6 border-t border-gray-100">
                                    <button onClick={handlePhotoUpdate} className="text-sm font-bold text-masa-blue hover:underline">
                                        Update Profile Photo (Mock)
                                    </button>
                                     <p className="text-xs text-gray-500 mt-1">Changes will be reflected on your ID card.</p>
                                 </div>
                            </div>
                        </div>
                    </div>


                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {dashboardItems.map(item => (
                            <div key={item.title} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-masa-blue transition-all duration-300 group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-50 rounded-full text-masa-blue">
                                        <item.icon className="h-6 w-6"/>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-masa-charcoal">{item.title}</h3>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                    </div>
                                    <ArrowRightIcon className="h-5 w-5 ml-auto text-gray-300 group-hover:text-masa-blue transition-colors"/>
                                </div>
                            </div>
                        ))}
                         <div className="bg-masa-orange text-white p-6 rounded-2xl shadow-lg md:col-span-2 lg:col-span-1 flex flex-col justify-center items-center text-center">
                            <h3 className="text-2xl font-bold">Ready to Do More?</h3>
                            <p className="opacity-80 my-2">Explore ways to deepen your impact.</p>
                             <button onClick={() => navigateTo('get-involved')} className="mt-2 bg-white text-masa-orange font-bold px-6 py-2 rounded-full hover:bg-orange-50 transition-colors">
                                Volunteer Now
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
