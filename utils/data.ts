
import React from 'react';
import { Post, Pledge } from '../types';
import { UsersIcon, GlobeIcon, HeartIcon, ShieldCheckIcon } from '../components/icons/FeatureIcons';

// Replaced with a professional placeholder representing leadership
export const FOUNDER_IMAGE_URL = 'https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=768,h=782,fit=crop/AMq4Dg7v0wH5yKM1/founder-B9OrhqqUN6Kq3Qir.jpeg';

export const calculateReadingTime = (text: string): string => {
    const wordsPerMinute = 200;
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
};

// --- COURSES DATA ---
export const coursesData = [
    {
        id: 1,
        title: "Youth Leadership Bootcamp",
        description: "An intensive program designed to instill confidence, public speaking skills, and civic responsibility in young minds.",
        fullDescription: "The Youth Leadership Bootcamp is our flagship program aimed at transforming timid students into confident leaders. Over the course of 4 weeks, participants engage in interactive workshops, role-playing scenarios, and community service projects. This course focuses on building emotional intelligence, effective communication, and strategic thinking.",
        category: "Education",
        level: "Beginner",
        duration: "4 Weeks",
        mode: "Offline",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
        highlights: ["Public Speaking Mastery", "Team Building Activities", "Community Service Project", "Certificate of Completion"],
        price: "Free"
    },
    {
        id: 2,
        title: "Football Coaching Certification",
        description: "Learn the fundamentals of coaching football, including tactics, player management, and grassroot development.",
        fullDescription: "This certification course is designed for aspiring coaches who want to make a difference at the grassroots level. It covers modern coaching methodologies, player psychology, injury prevention, and game tactics. Participants will get hands-on experience working with our youth teams.",
        category: "Sports",
        level: "Intermediate",
        duration: "3 Months",
        mode: "Hybrid",
        image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=800&q=80",
        highlights: ["FIFA Grassroots Methodology", "Practical Field Sessions", "Player Psychology", "License upon passing exam"],
        price: "₹4,999"
    },
    {
        id: 3,
        title: "Digital Literacy for Everyone",
        description: "A foundational course covering computer basics, internet safety, and essential digital tools for the modern world.",
        fullDescription: "In today's digital age, basic computer skills are essential. This course starts from the very basics—operating a computer—and moves to using the internet safely, online banking, accessing government services, and using productivity software like Word and Excel.",
        category: "Education",
        level: "Beginner",
        duration: "6 Weeks",
        mode: "Online",
        image: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&w=800&q=80",
        highlights: ["Internet Safety & Security", "Smartphone Usage", "Government E-Services", "Basic Office Tools"],
        price: "Free"
    },
    {
        id: 4,
        title: "Traditional Art & Craft Workshop",
        description: "Hands-on training in indigenous Indian art forms, supporting cultural preservation and artisan skills.",
        fullDescription: "Immerse yourself in the rich heritage of Indian arts. This workshop invites master artisans to teach traditional forms such as Madhubani painting, pottery, or textile weaving. It’s an effort to keep our cultural legacy alive while providing a creative outlet for participants.",
        category: "Culture",
        level: "Beginner",
        duration: "2 Weeks",
        mode: "Offline",
        image: "https://images.unsplash.com/photo-1459908676235-d5f02a50184b?auto=format&fit=crop&w=800&q=80",
        highlights: ["Learn from Master Artisans", "Materials Provided", "Take Home Your Art", "Exhibition Opportunity"],
        price: "₹1,499"
    },
    {
        id: 5,
        title: "Advanced Self-Defense Tactics",
        description: "Specialized training for individuals looking to master self-protection techniques and situational awareness.",
        fullDescription: "Going beyond basic self-defense, this course teaches advanced techniques for situational control, disarming, and protecting others. It combines elements from various martial arts and focuses heavily on mental conditioning and reflex training.",
        category: "Sports",
        level: "Advanced",
        duration: "8 Weeks",
        mode: "Offline",
        image: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&w=800&q=80",
        highlights: ["Situational Awareness", "Multiple Attacker Scenarios", "Pressure Point Control", "Legal Aspects of Self-Defense"],
        price: "₹2,999"
    },
    {
        id: 6,
        title: "Community Management 101",
        description: "Learn how to mobilize communities, organize events, and drive social change effectively.",
        fullDescription: "This course is for aspiring social workers and community leaders. Learn the art of mobilization, conflict resolution, volunteer management, and event planning. The course includes case studies from successful Masa World Foundation initiatives.",
        category: "Education",
        level: "Intermediate",
        duration: "5 Weeks",
        mode: "Online",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
        highlights: ["Volunteer Management", "Fundraising Basics", "Event Planning Logic", "Social Impact Measurement"],
        price: "Free"
    }
];

// --- EVENTS DATA ---
export const eventsData = [
    {
        id: 'evt-001',
        title: "National Youth Conclave 2025",
        category: "Conference",
        date: "2025-01-15",
        displayDate: "Jan 15, 2025",
        location: "New Delhi, India",
        description: "A strategic gathering of 500+ student leaders to discuss policy reform and national development.",
        image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
        status: 'Upcoming',
        price: '₹500'
    },
    {
        id: 'evt-002',
        title: "Women's Self-Defense Workshop",
        category: "Training",
        date: "2024-11-10",
        displayDate: "Nov 10, 2024",
        location: "Mumbai, Maharashtra",
        description: "Empowering women with essential self-defense techniques and situational awareness skills.",
        image: "https://images.unsplash.com/photo-1515526188328-35a027959d9a?auto=format&fit=crop&w=800&q=80",
        status: 'Upcoming',
        price: 'Free'
    },
    {
        id: 'evt-003',
        title: "MASA Sports Meet",
        category: "Sports",
        date: "2024-08-15",
        displayDate: "Aug 15, 2024",
        location: "National Stadium, Delhi",
        description: "Celebrating sportsmanship and athletic excellence with over 1000 young participants.",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
        status: 'Completed',
        price: 'Free'
    },
    {
        id: 'evt-004',
        title: "Rural Health Checkup Camp",
        category: "Community",
        date: "2024-07-20",
        displayDate: "July 20, 2024",
        location: "Varanasi, UP",
        description: "Providing free medical consultations and basic medicines to underserved rural communities.",
        image: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&w=800&q=80",
        status: 'Completed',
        price: 'Free'
    }
];

// --- PLEDGE DATA ---
export const pledgeData: Pledge[] = [
    {
        id: 'pledge-001',
        title: "Youth for Nation",
        category: 'Civic Duty',
        description: "Commit to contributing 2 hours a week for community service.",
        statement: "I pledge to dedicate my time and energy towards the development of my community and nation.",
        oathText: `I solemnly affirm my dedication to the betterment of my nation. I will strive to be a responsible citizen, upholding the values of our constitution.

I will contribute my time and skills to community service, working towards a society that is just, equitable, and progressive. I will inspire others to join in this noble cause.`,
        icon: 'UsersIcon',
        imageUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-002',
        title: "Clean Environment",
        category: 'Environment',
        description: "Pledge to reduce plastic use and plant at least one tree a year.",
        statement: "I pledge to protect the environment by reducing waste and planting trees for a greener future.",
        oathText: `I recognize my duty to protect and preserve our planet's natural resources. I pledge to adopt sustainable practices in my daily life.

I will actively work to reduce pollution, conserve water and energy, and promote a clean and green environment. I will plant trees and encourage others to do the same, for the well-being of all living creatures.`,
        icon: 'GlobeIcon',
        imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-003',
        title: "Social Harmony",
        category: 'Social',
        description: "Commit to treating everyone with respect regardless of background.",
        statement: "I pledge to promote peace, unity, and brotherhood among all citizens of my country.",
        oathText: `I believe in the strength of diversity. I pledge to treat every individual with respect and dignity, regardless of their religion, caste, gender, or social status.

I will stand against discrimination and work towards fostering a society built on mutual respect, understanding, and social harmony. I will be a voice for peace and unity.`,
        icon: 'HeartIcon',
        imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-004',
        title: "Digital Ethics",
        category: 'Digital',
        description: "Pledge to use social media responsibly and fight fake news.",
        statement: "I pledge to be a responsible digital citizen and verify information before sharing.",
        oathText: `In this digital age, I recognize the power and responsibility that comes with being online. I pledge to use social media and other digital platforms ethically.

I will not create or spread misinformation. I will verify facts before sharing, engage in respectful online discourse, and use technology to create a positive and informed digital community.`,
        icon: 'ShieldCheckIcon',
        imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-005',
        title: "Voter Awareness",
        category: 'Civic Duty',
        description: "Pledge to vote in every election and encourage others to do so.",
        statement: "I pledge to be an informed and active participant in democracy.",
        oathText: `I, as a responsible citizen, pledge to exercise my right to vote in every election. I will encourage my family and friends to register and vote, contributing to a stronger democracy.`,
        icon: 'UsersIcon',
        imageUrl: 'https://images.unsplash.com/photo-1555626312-84f93336c19f?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-006',
        title: "Water Conservation",
        category: 'Environment',
        description: "Commit to saving water in daily life and fixing leaks promptly.",
        statement: "I pledge to conserve every drop of water for a sustainable future.",
        oathText: `I pledge to be mindful of my water usage. I will fix leaks, reduce wastage, and promote rainwater harvesting in my community to conserve our most precious resource.`,
        icon: 'GlobeIcon',
        imageUrl: 'https://images.unsplash.com/photo-1559825481-6d452d8618f8?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-007',
        title: "Women's Safety",
        category: 'Social',
        description: "Pledge to create safe spaces and stand up against harassment.",
        statement: "I pledge to respect and protect the dignity and safety of women.",
        oathText: `I pledge to treat all women with respect and stand against any form of harassment or violence. I will be an active bystander and help create safer public and private spaces for everyone.`,
        icon: 'HeartIcon',
        imageUrl: 'https://images.unsplash.com/photo-1598426359399-7d08b8b98150?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-008',
        title: "Anti-Cyberbullying",
        category: 'Digital',
        description: "Commit to promoting positive online interactions and reporting bullying.",
        statement: "I pledge to make the internet a kinder and safer space for all.",
        oathText: `I pledge to be a positive force online. I will not engage in or tolerate cyberbullying, and I will report any harmful content I see to make the digital world a safer community.`,
        icon: 'ShieldCheckIcon',
        imageUrl: 'https://images.unsplash.com/photo-1554224155-169544351717?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-009',
        title: "Road Safety",
        category: 'Civic Duty',
        description: "Pledge to follow all traffic rules and drive responsibly.",
        statement: "I pledge to prioritize safety on the roads for myself and others.",
        oathText: `I pledge to be a responsible road user. I will obey traffic laws, wear a helmet or seatbelt, avoid distractions while driving, and respect pedestrians to make our roads safer.`,
        icon: 'UsersIcon',
        imageUrl: 'https://images.unsplash.com/photo-1574943340283-29024348a474?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-010',
        title: "Waste Segregation",
        category: 'Environment',
        description: "Commit to segregating waste at home and work.",
        statement: "I pledge to segregate my waste to support recycling and a cleaner city.",
        oathText: `I pledge to segregate my waste into wet, dry, and hazardous categories. I will promote this practice in my household and community to aid recycling and reduce landfill burden.`,
        icon: 'GlobeIcon',
        imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac07829?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-011',
        title: "Support for Elderly",
        category: 'Social',
        description: "Pledge to spend time with and assist elderly members of my community.",
        statement: "I pledge to respect and care for our elders.",
        oathText: `I pledge to honor and support the elderly in my family and community. I will offer my time, assistance, and companionship to ensure they feel valued and cared for.`,
        icon: 'HeartIcon',
        imageUrl: 'https://images.unsplash.com/photo-1590704257933-58d35f24f57c?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-012',
        title: "Promote Literacy",
        category: 'Social',
        description: "Dedicate time to teach a child or an adult how to read and write.",
        statement: "I pledge to share the gift of knowledge and fight illiteracy.",
        oathText: `I pledge to contribute to a literate society. I will dedicate my time to teach someone to read and write, or support organizations working towards education for all.`,
        icon: 'HeartIcon',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-013',
        title: "Blood Donation",
        category: 'Civic Duty',
        description: "Pledge to donate blood regularly and save lives.",
        statement: "I pledge to be a regular blood donor and a lifesaver.",
        oathText: `I pledge to donate blood whenever I am eligible. I understand that my contribution can save lives, and I will encourage others to join this noble cause.`,
        icon: 'UsersIcon',
        imageUrl: 'https://images.unsplash.com/photo-1582719478212-c85ab653486e?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-014',
        title: "Conserve Electricity",
        category: 'Environment',
        description: "Commit to switching off lights and appliances when not in use.",
        statement: "I pledge to conserve energy for a brighter, greener planet.",
        oathText: `I pledge to be conscious of my electricity consumption. I will switch off lights and appliances when not needed and promote the use of energy-efficient devices.`,
        icon: 'GlobeIcon',
        imageUrl: 'https://images.unsplash.com/photo-1589578228253-333d283b3889?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-015',
        title: "Mental Health Awareness",
        category: 'Social',
        description: "Pledge to talk openly about mental health and support those in need.",
        statement: "I pledge to fight stigma and promote mental well-being.",
        oathText: `I pledge to foster an environment of understanding around mental health. I will listen without judgment, offer support, and help break the stigma associated with seeking help.`,
        icon: 'HeartIcon',
        imageUrl: 'https://images.unsplash.com/photo-1594125674939-57e084285b52?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-016',
        title: "Digital Detox",
        category: 'Digital',
        description: "Commit to taking regular breaks from screens for mental well-being.",
        statement: "I pledge to balance my digital life with real-world connections.",
        oathText: `I pledge to prioritize my well-being by taking regular breaks from digital devices. I will use this time to connect with nature, family, and myself.`,
        icon: 'ShieldCheckIcon',
        imageUrl: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-017',
        title: "Support Local Artisans",
        category: 'Civic Duty',
        description: "Pledge to buy and promote products from local craftsmen.",
        statement: "I pledge to support local economies and preserve traditional arts.",
        oathText: `I pledge to value and support local artisans and craftsmen. I will prioritize buying handmade and local products to help sustain their art and our cultural heritage.`,
        icon: 'UsersIcon',
        imageUrl: 'https://images.unsplash.com/photo-1592477344487-1b076041a0b3?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-018',
        title: "Protect Wildlife",
        category: 'Environment',
        description: "Commit to protecting animals and their natural habitats.",
        statement: "I pledge to be a voice for the voiceless and protect our wildlife.",
        oathText: `I pledge to respect all living beings and their right to exist. I will not harm wildlife, and I will support conservation efforts to protect our planet's biodiversity.`,
        icon: 'GlobeIcon',
        imageUrl: 'https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-019',
        title: "Anti-Corruption",
        category: 'Civic Duty',
        description: "Pledge to neither give nor take bribes and to report corruption.",
        statement: "I pledge to uphold integrity and fight against corruption.",
        oathText: `I pledge to live by the principles of honesty and integrity. I will neither offer nor accept bribes, and I will stand against corruption in all its forms to build a just nation.`,
        icon: 'UsersIcon',
        imageUrl: 'https://images.unsplash.com/photo-1591115765324-212b189a1969?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-020',
        title: "Equality for All",
        category: 'Social',
        description: "Pledge to treat all individuals as equal, irrespective of gender, caste, or religion.",
        statement: "I pledge to champion equality and stand against discrimination.",
        oathText: `I pledge to uphold the value of equality. I will treat every person with dignity and respect, and I will actively oppose any form of discrimination in my community and workplace.`,
        icon: 'HeartIcon',
        imageUrl: 'https://images.unsplash.com/photo-1605289357111-872f132e7d32?auto=format&fit=crop&w=400&q=80'
    },
     {
        id: 'pledge-021',
        title: "Cyber Safety for Children",
        category: 'Digital',
        description: "Commit to creating a safer online environment for children.",
        statement: "I pledge to protect children from online threats and exploitation.",
        oathText: `I pledge to be vigilant about children's safety online. I will educate them about digital risks, monitor their online activities responsibly, and report any suspicious behavior.`,
        icon: 'ShieldCheckIcon',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4133704a426d?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-022',
        title: "Animal Welfare",
        category: 'Social',
        description: "Pledge to be kind to all animals and support their welfare.",
        statement: "I pledge to show compassion to animals and advocate for their rights.",
        oathText: `I pledge to treat all animals with kindness and compassion. I will provide aid to animals in distress, support animal shelters, and be a voice for their welfare.`,
        icon: 'HeartIcon',
        imageUrl: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-023',
        title: "No Food Waste",
        category: 'Environment',
        description: "Commit to reducing food waste by planning meals and using leftovers.",
        statement: "I pledge to value my food and waste nothing.",
        oathText: `I pledge to be mindful of food consumption. I will avoid wasting food, share my excess, and support initiatives that fight hunger and food wastage in my community.`,
        icon: 'GlobeIcon',
        imageUrl: 'https://images.unsplash.com/photo-1627822099933-585a06511b84?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-024',
        title: "Uphold Constitutional Values",
        category: 'Civic Duty',
        description: "Pledge to respect and uphold the values enshrined in our Constitution.",
        statement: "I pledge to be a law-abiding citizen and respect our Constitution.",
        oathText: `I pledge my allegiance to the Constitution. I will uphold its values of justice, liberty, equality, and fraternity, and I will perform my fundamental duties as a citizen.`,
        icon: 'UsersIcon',
        imageUrl: 'https://images.unsplash.com/photo-1603527268802-7c3866c5d129?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-025',
        title: "Mindful Online Conduct",
        category: 'Digital',
        description: "Commit to engaging in respectful and constructive online discussions.",
        statement: "I pledge to contribute positively to online discourse.",
        oathText: `I pledge to be a responsible digital communicator. I will engage in respectful debates, avoid spreading negativity, and strive to create a constructive online environment.`,
        icon: 'ShieldCheckIcon',
        imageUrl: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-026',
        title: "Child Protection",
        category: 'Social',
        description: "Pledge to stand against child labor and ensure children's rights.",
        statement: "I pledge to protect every child's right to a safe and happy childhood.",
        oathText: `I pledge to protect children from harm, abuse, and exploitation. I will not employ child labor, and I will report any instance of child abuse to the authorities.`,
        icon: 'HeartIcon',
        imageUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-027',
        title: "Fitness & Health",
        category: 'Social',
        description: "Pledge to dedicate at least 30 minutes daily to physical activity.",
        statement: "I pledge to prioritize my physical and mental well-being.",
        oathText: `I pledge to take care of my body and mind. I will engage in regular physical activity, eat a balanced diet, and prioritize my mental health for a healthier and happier life.`,
        icon: 'HeartIcon',
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-028',
        title: "Respect for Public Property",
        category: 'Civic Duty',
        description: "Commit to protecting and maintaining public parks, monuments, and transport.",
        statement: "I pledge to treat public property as my own and protect our shared heritage.",
        oathText: `I pledge to respect and protect public property. I will not deface monuments, damage public infrastructure, or litter in public spaces, treating them with the same care as my own home.`,
        icon: 'UsersIcon',
        imageUrl: 'https://images.unsplash.com/photo-1588282322673-c31945a30c3e?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-029',
        title: "Promote Sportsmanship",
        category: 'Social',
        description: "Pledge to play fair, respect opponents, and embrace both victory and defeat gracefully.",
        statement: "I pledge to uphold the true spirit of sportsmanship in every game.",
        oathText: `I pledge to be a true sportsperson. I will play by the rules, respect my opponents and officials, and exhibit grace in both victory and defeat, inspiring others to do the same.`,
        icon: 'HeartIcon',
        imageUrl: 'https://images.unsplash.com/photo-1565992441121-4367c2967103?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-030',
        title: "Support Education for Girls",
        category: 'Social',
        description: "Pledge to support initiatives that promote education for every girl child.",
        statement: "I pledge to champion the right of every girl to an education.",
        oathText: `I pledge my support for girls' education. I will advocate for equal learning opportunities and contribute to initiatives that help keep girls in school, empowering them for a brighter future.`,
        icon: 'HeartIcon',
        imageUrl: 'https://images.unsplash.com/photo-1588075592446-265fd1e6e76f?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-031',
        title: "Financial Literacy",
        category: 'Digital',
        description: "Commit to learning about responsible financial management.",
        statement: "I pledge to become financially literate and secure my future.",
        oathText: `I pledge to take control of my financial future. I will learn about budgeting, saving, investing, and avoiding debt to build a secure and stable life for myself and my family.`,
        icon: 'ShieldCheckIcon',
        imageUrl: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-032',
        title: "Cleanliness in my Community",
        category: 'Civic Duty',
        description: "Pledge to keep my immediate surroundings clean and participate in cleanliness drives.",
        statement: "I pledge to be an ambassador for cleanliness in my community.",
        oathText: `I pledge to maintain cleanliness in my home, workplace, and public spaces. I will not litter and will actively participate in community cleanliness initiatives for a healthier environment.`,
        icon: 'UsersIcon',
        imageUrl: 'https://images.unsplash.com/photo-1618521630643-b19623e4d872?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-033',
        title: "Say No to Single-Use Plastic",
        category: 'Environment',
        description: "Commit to using reusable alternatives to plastic bags, bottles, and cutlery.",
        statement: "I pledge to reduce my plastic footprint for a healthier planet.",
        oathText: `I pledge to minimize my use of single-use plastics. I will carry reusable bags, bottles, and containers, and encourage businesses and individuals to adopt sustainable alternatives.`,
        icon: 'GlobeIcon',
        imageUrl: 'https://images.unsplash.com/photo-1619472629858-38b4d9142429?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-034',
        title: "Disability Inclusion",
        category: 'Social',
        description: "Pledge to create an inclusive environment for people with disabilities.",
        statement: "I pledge to see the ability in disability and promote inclusion.",
        oathText: `I pledge to respect and support people with disabilities. I will advocate for accessible spaces and equal opportunities, and I will work to create a society where everyone feels included.`,
        icon: 'HeartIcon',
        imageUrl: 'https://images.unsplash.com/photo-1484807352052-23338990c6c6?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-035',
        title: "Promote Organ Donation",
        category: 'Civic Duty',
        description: "Pledge to register as an organ donor and inform my family.",
        statement: "I pledge to give the gift of life through organ donation.",
        oathText: `I pledge my organs for donation after my death to save lives. I will inform my family of my decision and encourage others to understand the importance of this noble act.`,
        icon: 'UsersIcon',
        imageUrl: 'https://images.unsplash.com/photo-1631894959432-c7509e5b7297?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-036',
        title: "Sustainable Commuting",
        category: 'Environment',
        description: "Commit to using public transport, cycling, or walking more often.",
        statement: "I pledge to reduce my carbon footprint by commuting sustainably.",
        oathText: `I pledge to reduce my reliance on private vehicles. I will opt for public transport, carpooling, cycling, or walking whenever possible to reduce air pollution and traffic congestion.`,
        icon: 'GlobeIcon',
        imageUrl: 'https://images.unsplash.com/photo-1579525412581-93e11a3c6130?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-037',
        title: "Youth Mentorship",
        category: 'Social',
        description: "Pledge to guide and mentor a young person in my community.",
        statement: "I pledge to invest in the next generation by being a mentor.",
        oathText: `I pledge to share my knowledge and experience by mentoring a young person. I will provide guidance, support, and encouragement to help them achieve their potential.`,
        icon: 'HeartIcon',
        imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-038',
        title: "Mindful Consumption",
        category: 'Environment',
        description: "Commit to buying only what I need and choosing sustainable products.",
        statement: "I pledge to consume responsibly for a better world.",
        oathText: `I pledge to be a mindful consumer. I will buy only what I need, choose sustainable and ethically made products, and reduce my overall consumption to protect our planet.`,
        icon: 'GlobeIcon',
        imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-039',
        title: "Respect for All Professions",
        category: 'Civic Duty',
        description: "Pledge to respect every job and the dignity of labor.",
        statement: "I pledge to value every individual's contribution to society.",
        oathText: `I pledge to respect every profession and the dignity of labor. I will treat everyone, from sanitation workers to CEOs, with equal respect and acknowledge their contribution to society.`,
        icon: 'UsersIcon',
        imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-040',
        title: "Support for Mental Health",
        category: 'Social',
        description: "Pledge to create a supportive environment for those facing mental health challenges.",
        statement: "I pledge to be an advocate for mental health and an empathetic listener.",
        oathText: `I pledge to listen without judgment and support those around me facing mental health struggles. I will encourage open conversations and help break the stigma.`,
        icon: 'HeartIcon',
        imageUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-041',
        title: "Data Privacy Advocate",
        category: 'Digital',
        description: "Pledge to protect my personal data and respect the privacy of others online.",
        statement: "I pledge to be vigilant about digital privacy for myself and my community.",
        oathText: `I pledge to be a responsible guardian of data. I will protect my personal information online, use strong passwords, and respect the privacy and data of others.`,
        icon: 'ShieldCheckIcon',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4133704a426d?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-042',
        title: "Lifelong Learning",
        category: 'Social',
        description: "Pledge to continuously learn new skills and share knowledge.",
        statement: "I pledge to be a lifelong learner and contribute to a knowledgeable society.",
        oathText: `I pledge to embrace lifelong learning. I will continuously seek new knowledge and skills, and I will share what I learn to empower others in my community.`,
        icon: 'HeartIcon',
        imageUrl: 'https://images.unsplash.com/photo-1491841550275-5b462bf985ca?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-043',
        title: "Respect for Diversity",
        category: 'Civic Duty',
        description: "Pledge to celebrate cultural, linguistic, and social diversity.",
        statement: "I pledge to see strength in our diversity and promote unity.",
        oathText: `I pledge to respect and celebrate the diversity of my nation. I will interact with people from different backgrounds with an open mind and work towards a society where everyone feels they belong.`,
        icon: 'UsersIcon',
        imageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=400&q=80'
    },
    {
        id: 'pledge-044',
        title: "Green Commuting",
        category: 'Environment',
        description: "Pledge to use public transport, carpool, or cycle to reduce emissions.",
        statement: "I pledge to choose greener modes of transport whenever possible.",
        oathText: `I pledge to reduce my carbon footprint by making sustainable travel choices. I will prioritize public transport, carpooling, cycling, or walking for my daily commute.`,
        icon: 'GlobeIcon',
        imageUrl: 'https://images.unsplash.com/photo-1507643179-811632269a47?auto=format&fit=crop&w=400&q=80'
    }
];

export const pledgeCategories = Array.from(new Set(pledgeData.map(p => p.category)));

// --- BLOG POSTS DATA ---
export const postsData: Post[] = [
    { 
        id: 10,
        title: "Building a Global Community Through Sports, Education, and Culture", 
        date: "2024-05-20", 
        category: "NGO Updates",
        summary: "An overview of the MASA vision: connecting the world through three powerful pillars of human development.",
        content: `The challenges facing humanity demand a holistic approach that nurtures the body, mind, and spirit. At MASA World Foundation, we have identified three pillars—Sports, Education, and Culture—that act as powerful catalysts for sustainable development and global unity.

## The Power of Sports
Sports are far more than recreation; they are a crucible for character. It is on the playing field that young people learn discipline, resilience, and teamwork—qualities that define future leaders.

### Grassroots Development
Our programs begin at the village level, identifying talent that often goes unnoticed. By providing equipment, coaching, and a platform to compete, we transform raw potential into excellence. It’s not just about winning medals; it’s about building character that lasts a lifetime.

## Education for the Future
Education is the bedrock of progress. However, traditional schooling often overlooks critical life skills. We aim to bridge this gap by preparing youth for real-world challenges.

### Leadership Workshops
We conduct dynamic workshops focused on public speaking, ethical leadership, and civic responsibility. Our goal is to ensure our youth are not just literate, but are educated in the truest sense, ready to lead and inspire.

## Cultural Preservation
In a rapidly globalizing world, a strong cultural identity is crucial. Our cultural initiatives are designed to celebrate heritage, preserve traditions, and foster mutual respect among diverse communities.

### Conclusion
By weaving these three essential elements together, MASA World Foundation is building a global community rooted in local action. We invite you to join us in this transformative journey.`,
        url: "/blog/building-global-community",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
        author: "MASA World Foundation",
        tags: ["Vision", "Global", "Community"],
        status: "Published"
    },
    { 
        id: 1,
        title: "How Sports Build Discipline and Strong Character in Youth", 
        date: "2024-10-12", 
        category: "Sports",
        summary: "Sports are more than just games; they are a training ground for life. Discover how athletic training instills the discipline needed for future leaders.",
        content: `At MASA World Foundation, we view sports as a fundamental tool for character development. It is on the playground that children learn their first lessons in equality, fair play, and resilience against adversity.

## Beyond the Scoreboard
Winning is a goal, but the journey to the finish line matters more. Sports impose a structure on a young person's life—waking up for practice, respecting the coach, and adhering to rules fosters a discipline that elevates their academic and personal lives.

### Teamwork and Leadership
In a team sport, one learns to trust others and to be trustworthy. A leader emerges not just by scoring goals, but by motivating the team when morale is low. These are invaluable life lessons.

## Creating Opportunities
For many of our beneficiaries, sports offer a tangible pathway to a better future. Through our scholarship programs, talented athletes gain access to superior education and career opportunities, breaking cycles of poverty.

### Our Impact
We have seen school attendance rise and delinquency fall in communities where we have introduced structured sports programs. This proves that a ball and a field can indeed change the world, one child at a time.`,
        url: "/blog/sports-build-discipline",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
        author: "MASA Sports Cell",
        tags: ["Sports", "Discipline", "Youth"],
        status: "Published"
    },
    { 
        id: 2,
        title: "Education Beyond Classrooms: Preparing Youth for Real-World Challenges", 
        date: "2024-09-28", 
        category: "Education",
        summary: "True education transcends textbooks. We explore why leadership, ethics, and communication are essential skills for the modern world.",
        content: `While literacy rates in India have improved, access to quality 'life education' remains a challenge. At MASA, we believe in an education that prepares young people for life, not just for exams.

## The Modern Skill Gap
Many graduates today struggle with employability, not due to a lack of technical knowledge, but a deficit in soft skills. Communication, critical thinking, and adaptability are the currencies of the modern workforce.

### MASA's Holistic Approach
We supplement formal education with practical, real-world training. Our vocational centers focus on crucial skills like digital literacy, while our leadership camps are designed to build emotional intelligence and problem-solving abilities.

## Ethics and Values
Knowledge without integrity can be destructive. Our curriculum therefore emphasizes value-based learning, covering topics like civic duties, environmental responsibility, and social empathy.

### Success Stories
From a shy student in a rural school who is now a confident community organizer, we have witnessed remarkable transformations. This validates our belief that true education must extend beyond the four walls of a classroom.`,
        url: "/blog/education-beyond-classrooms",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
        author: "MASA Education Wing",
        tags: ["Education", "Skills", "Future"],
        status: "Published"
    },
    { 
        id: 3,
        title: "The Role of Culture in Building Unity and Social Harmony", 
        date: "2024-09-15", 
        category: "Culture",
        summary: "In a diverse world, culture is the bridge that connects us. Learn how preserving heritage fosters peace and mutual respect.",
        content: `Culture is the soul of a community, the language of our ancestors, and the foundation of our identity. MASA World Foundation is dedicated to preserving this rich heritage while using it as a powerful tool for unity.

## A Celebration of Diversity
India is a land of myriad cultures. We see this not as a divide, but as a vibrant tapestry of human expression. Our 'Cultural Utsavs' bring together art forms from different regions, fostering mutual appreciation and understanding.

### Supporting Our Artisans
Many traditional art forms are at risk of disappearing because artisans struggle to find a sustainable market. We support these craftsmen by providing platforms to showcase their work, connecting them with new audiences and ensuring that our tangible heritage survives for future generations.

## Culture as a Unifying Force
When people share food, music, and art, social barriers dissolve. Cultural exchange programs are a core part of our strategy to promote social harmony, build bridges of understanding, and foster lasting peace.`,
        url: "/blog/culture-social-harmony",
        image: "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=800&q=80",
        author: "Cultural Committee",
        tags: ["Culture", "Unity", "Heritage"],
        status: "Published"
    },
    { 
        id: 4,
        title: "Why Recognizing Real Heroes Matters", 
        date: "2024-08-30", 
        category: "Awards",
        summary: "Society often idolizes fame, but the real changemakers are among us. We explain MASA’s philosophy of honoring everyday heroes.",
        content: `We live in an era of celebrity worship. While entertainers and athletes have their place, MASA believes that the true heroes are those who silently and selflessly build our communities day after day.

## The Real Hero Awards
Our awards initiative is designed to find these unsung champions. The teacher who buys books for poor students, the sanitation worker who goes beyond their duty, the citizen who fights for clean water—these are the role models our society needs.

### Inspiring the Next Generation
When a child sees a local social worker being honored on a national stage, they learn that service is a value to aspire to. They learn that you don't need to be rich or famous to make a profound difference in the lives of others.

## A Call to Action
We encourage everyone to look around their community. Identify these heroes. Nominate them for our awards. Let us work together to shift the spotlight to where it truly belongs: on service, sacrifice, and integrity.`,
        url: "/blog/recognizing-real-heroes",
        image: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=800&q=80",
        author: "Vijay Babu Sharma",
        tags: ["Awards", "Heroes", "Society"],
        status: "Published"
    },
    { 
        id: 5,
        title: "Recap: Our Annual City Cleanliness Drive", 
        date: "2024-08-12", 
        category: "Events",
        summary: "A look back at our most successful community cleanliness drive, which brought together over 500 volunteers to reclaim public spaces.",
        content: `It is easy to complain about dirty streets; it is harder to pick up a broom and make a change. Last week, over 500 MASA volunteers chose the latter, demonstrating the power of collective action.

## A True Community Effort
The energy was electric. Students, professionals, and retirees came together with a single purpose: to restore their city's beauty. We targeted five major neglected areas in the city and successfully cleared over two tons of waste in a single day.

### Beyond Just Cleaning
This drive wasn't just about picking up trash; it was about spreading a message of ownership and responsibility. We engaged with local shopkeepers about waste segregation and distributed reusable cloth bags to discourage single-use plastic.

## The Lasting Result
The visual impact was immediate, but the behavioral impact is what will truly last. When citizens take ownership of their public spaces, the entire city transforms for the better. We thank every volunteer who contributed to a cleaner tomorrow.`,
        url: "/blog/grassroots-to-global",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
        author: "MASA Team",
        tags: ["Impact", "Grassroots", "Events"],
        status: "Published"
    }
];
