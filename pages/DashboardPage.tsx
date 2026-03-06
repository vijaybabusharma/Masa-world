
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
        <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="container mx-auto px-6 lg:px-12 h-20 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-masa-orange rounded-lg flex items-center justify-center font-bold text-white">M</div>
                        <h1 className="text-xl font-bold tracking-tight uppercase">Member<span className="text-masa-orange">Hub</span></h1>
                    </div>
                    <button onClick={handleLogout} className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider hover:text-red-500 transition-colors">Sign Out</button>
                </div>
            </header>

            <main className="py-12 lg:py-16">
                <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                    {/* Welcome Banner */}
                    <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-sm mb-8 border border-gray-100 relative overflow-hidden group">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-masa-orange/5 rounded-full blur-[80px] group-hover:bg-masa-orange/10 transition-colors duration-500"></div>
                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                                <div>
                                    <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-none mb-4">
                                        Welcome, <span className="text-masa-orange">{mockUser.name.split(' ')[0]}</span>
                                    </h2>
                                    <div className="flex flex-wrap items-center gap-4">
                                        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
                                            <ShieldCheckIcon className="h-3 w-3 text-emerald-500"/>
                                            <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">{mockUser.category} • Active</span>
                                        </div>
                                        <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                                            Member Since {mockUser.issueDate}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                        <UsersIcon className="h-5 w-5 text-masa-orange" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Member ID</p>
                                        <p className="text-sm font-bold text-gray-900">{mockUser.memberId}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Digital ID Card Section */}
                    <div className="mb-8">
                        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
                            <div className="lg:col-span-4">
                                <DigitalIdCard {...mockUser} photoUrl={userPhoto} />
                            </div>
                            <div className="lg:col-span-8 bg-white p-8 lg:p-12 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
                                <div className="max-w-2xl">
                                    <h3 className="font-bold text-2xl lg:text-3xl text-gray-900 tracking-tight mb-4">Your Digital Identity</h3>
                                    <p className="text-gray-500 font-medium text-base leading-relaxed mb-8">Keep your digital ID handy on your mobile device. Download it as an image or a printable PDF. The QR code can be scanned for quick verification at MASA events and partner locations.</p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <button onClick={() => handleDownload('PNG')} className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white px-6 py-4 rounded-xl font-semibold text-xs uppercase tracking-wider hover:bg-masa-orange transition-all duration-300 shadow-sm active:scale-95">
                                            <DownloadIcon className="h-4 w-4"/> Download Image
                                        </button>
                                        <button onClick={() => handleDownload('PDF')} className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-900 px-6 py-4 rounded-xl font-semibold text-xs uppercase tracking-wider hover:bg-gray-200 transition-all duration-300 active:scale-95">
                                            <DownloadIcon className="h-4 w-4"/> Download PDF
                                        </button>
                                    </div>
                                    <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                        <div>
                                            <button onClick={handlePhotoUpdate} className="text-xs font-semibold text-masa-orange uppercase tracking-wider hover:underline">
                                                Update Profile Photo
                                            </button>
                                            <p className="text-[10px] text-gray-400 font-medium mt-1 uppercase tracking-wider">Changes reflect instantly on your ID card</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dashboardItems.map(item => (
                            <div key={item.title} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                                <div className="flex flex-col gap-4">
                                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-masa-orange group-hover:bg-masa-orange group-hover:text-white transition-all duration-300 shadow-sm">
                                        <item.icon className="h-6 w-6"/>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-1">{item.title}</h3>
                                        <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] font-semibold text-masa-orange uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                                        Open Section <ArrowRightIcon className="h-3 w-3"/>
                                    </div>
                                </div>
                            </div>
                        ))}
                         <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg md:col-span-2 lg:col-span-1 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                            <div className="absolute -top-16 -right-16 w-48 h-48 bg-masa-orange/20 rounded-full blur-[60px] group-hover:bg-masa-orange/30 transition-colors duration-500"></div>
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold tracking-tight mb-2">Ready to Do More?</h3>
                                <p className="text-gray-400 text-sm font-medium mb-6">Explore ways to deepen your impact and connect with the community.</p>
                                <button onClick={() => navigateTo('get-involved')} className="bg-masa-orange text-white font-semibold text-xs uppercase tracking-wider px-8 py-3 rounded-xl hover:bg-orange-600 transition-all duration-300 shadow-md active:scale-95">
                                    Volunteer Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
