
import React from 'react';
import { Post } from '../types';
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
export interface Course {
    id: number;
    title: string;
    description: string;
    fullDescription: string;
    category: 'Sports' | 'Education' | 'Culture';
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    duration: string;
    mode: 'Online' | 'Offline' | 'Hybrid';
    image: string;
    highlights: string[];
    price: string; // New field for "Free", "Paid", or specific amount
}

export const coursesData: Course[] = [
    {
        id: 1,
        title: "Youth Leadership Bootcamp",
        description: "An intensive program designed to instill confidence, public speaking skills, and civic responsibility in young minds.",
        fullDescription: "The Youth Leadership Bootcamp is our flagship program aimed at transforming timid students into confident leaders. Over the course of 4 weeks, participants engage in interactive workshops, role-playing scenarios, and community service projects. This course focuses on building emotional intelligence, effective communication, and strategic thinking.",
        category: "Education",
        level: "Beginner",
        duration: "4 Weeks",
        mode: "Offline",
        image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d6428?auto=format&fit=crop&w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
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
export interface Event {
    id: string;
    title: string;
    category: 'Conference' | 'Training' | 'Sports' | 'Community' | 'Award';
    date: string; // ISO format YYYY-MM-DD for sorting
    displayDate: string; // User friendly format
    location: string;
    description: string;
    image: string;
    status: 'Upcoming' | 'Completed';
    price?: string; // e.g. "Free" or "₹500"
}

export const eventsData: Event[] = [
    {
        id: 'evt-001',
        title: "National Youth Conclave 2025",
        category: "Conference",
        date: "2025-01-15",
        displayDate: "Jan 15, 2025",
        location: "New Delhi, India",
        description: "A strategic gathering of 500+ student leaders to discuss policy reform and national development.",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1598426359399-7d08b8b98150?auto=format&fit=crop&w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1561917403-c6990175a503?auto=format&fit=crop&w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
        status: 'Completed',
        price: 'Free'
    }
];

// --- PLEDGE DATA ---
export interface Pledge {
    id: string;
    title: string;
    description: string;
    statement: string;
    icon: any;
}

export const pledgeData: Pledge[] = [
    {
        id: 'pledge-001',
        title: "Youth for Nation",
        description: "Commit to contributing 2 hours a week for community service.",
        statement: "I pledge to dedicate my time and energy towards the development of my community and nation.",
        icon: UsersIcon
    },
    {
        id: 'pledge-002',
        title: "Clean Environment",
        description: "Pledge to reduce plastic use and plant at least one tree a year.",
        statement: "I pledge to protect the environment by reducing waste and planting trees for a greener future.",
        icon: GlobeIcon
    },
    {
        id: 'pledge-003',
        title: "Social Harmony",
        description: "Commit to treating everyone with respect regardless of background.",
        statement: "I pledge to promote peace, unity, and brotherhood among all citizens of my country.",
        icon: HeartIcon
    },
    {
        id: 'pledge-004',
        title: "Digital Ethics",
        description: "Pledge to use social media responsibly and fight fake news.",
        statement: "I pledge to be a responsible digital citizen and verify information before sharing.",
        icon: ShieldCheckIcon
    }
];

// --- BLOG POSTS DATA ---
export const postsData: Post[] = [
    { 
        id: 10,
        title: "Building a Global Community Through Sports, Education, and Culture", 
        date: "2024-05-20", 
        category: "NGO Updates",
        summary: "An overview of the MASA vision: connecting the world through three powerful pillars of human development.",
        content: `The challenges facing humanity today require more than just isolated solutions; they demand a holistic approach that nurtures the body, mind, and spirit. At MASA World Foundation, we have identified three pillars—Sports, Education, and Culture—that act as catalysts for sustainable development.

## The Power of Sports
Sports is often seen as mere recreation, but its impact goes much deeper. It teaches discipline, resilience, and teamwork. For many young people in underprivileged areas, a sports field is the first place they learn that hard work yields results.

### Grassroots Development
Our programs start at the village level, identifying talent that often goes unnoticed. By providing equipment, coaching, and a platform to compete, we turn potential into excellence. It’s not just about winning medals; it’s about building character.

## Education for the Future
Education is the bedrock of progress. However, traditional schooling often misses critical life skills. We aim to bridge this gap.

### Leadership Workshops
We conduct workshops that focus on public speaking, ethics, and civic responsibility, ensuring our youth are not just literate, but educated in the truest sense. We believe every student has the potential to be a leader if given the right guidance.

## Cultural Preservation
In a rapidly globalizing world, maintaining one's identity is crucial. Our cultural initiatives ensure that heritage is celebrated and preserved.

### Conclusion
By weaving these three elements together, MASA World Foundation is building a global community rooted in local action. Join us in this journey of transformation.`,
        url: "/blog/building-global-community",
        image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
        author: "MASA World Foundation",
        tags: ["Vision", "Global", "Community"]
    },
    { 
        id: 1,
        title: "How Sports Build Discipline, Leadership, and Strong Character in Youth", 
        date: "2024-10-12", 
        category: "Sports",
        summary: "Sports are more than just games; they are a training ground for life. Discover how athletic training instills the discipline needed for future leaders.",
        content: `At MASA World Foundation, we view sports as a fundamental tool for character building. It is on the playground that children learn their first lessons in equality, fair play, and resilience.

## Beyond the Scoreboard
Winning is important, but the journey to the finish line matters more. Sports impose a structure on a young person's life. Waking up early for practice, respecting the coach, and playing within the rules fosters a sense of discipline that spills over into academic and personal life.

### Teamwork and Leadership
In a team sport, you learn to trust others and to be trustworthy yourself. You learn that a leader isn't just the one scoring the goals, but the one motivating the team when morale is down.

## Creating Opportunities
For many of our beneficiaries, sports is a pathway to a better future. Through our scholarship programs, talented athletes gain access to better education and career opportunities.

### Our Impact
We have seen school attendance rise and delinquency fall in communities where we have introduced structured sports programs. This proves that a ball and a field can indeed change the world.`,
        url: "/blog/sports-build-discipline",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
        author: "MASA Sports Cell",
        tags: ["Sports", "Discipline", "Youth"]
    },
    { 
        id: 2,
        title: "Education Beyond Classrooms: Preparing Youth for Real-World Challenges", 
        date: "2024-09-28", 
        category: "Education",
        summary: "True education goes beyond textbooks. We explore why leadership, ethics, and communication skills are essential for the modern world.",
        content: `Education in India has made great strides, but access to quality 'life education' remains uneven. At MASA, we believe in an education that prepares you for life, not just exams.

## The Skill Gap
Many graduates today struggle with employability not because they lack technical knowledge, but because they lack soft skills. Communication, critical thinking, and adaptability are the currencies of the modern workforce.

### MASA's Approach
We supplement formal education with practical training. Our vocational centers teach digital literacy, while our leadership camps focus on emotional intelligence.

## Ethics and Values
Knowledge without integrity is dangerous. Our curriculum heavily emphasizes value-based learning. We discuss civic duties, environmental responsibility, and social empathy.

### Success Stories
From a shy student in a rural school to a confident community organizer, we have witnessed remarkable transformations. This validates our belief that education must extend beyond the four walls of a classroom.`,
        url: "/blog/education-beyond-classrooms",
        image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
        author: "MASA Education Wing",
        tags: ["Education", "Skills", "Future"]
    },
    { 
        id: 3,
        title: "The Role of Culture in Building Unity and Social Harmony", 
        date: "2024-09-15", 
        category: "Culture",
        summary: "In a diverse world, culture is the bridge that connects us. Learn how preserving heritage fosters peace and mutual respect.",
        content: `Culture is the soul of a community. It is the language of our ancestors and the foundation of our identity. MASA World Foundation is dedicated to preserving this heritage while using it as a tool for unity.

## Celebration of Diversity
India is a land of diverse cultures. Instead of seeing this as a divide, we see it as a vibrant tapestry. Our 'Cultural Utsavs' bring together art forms from different regions, fostering mutual appreciation.

### Artisan Support
Many traditional art forms are dying because artisans cannot find a market. We support these craftsmen by providing platforms to showcase their work, ensuring that our tangible heritage survives.

## Culture as a Unifier
When people share food, music, and art, barriers dissolve. Cultural exchange programs are a core part of our strategy to promote social harmony and peace.`,
        url: "/blog/culture-social-harmony",
        image: "https://images.unsplash.com/photo-1514222709107-a180c68d72b4?auto=format&fit=crop&w=800&q=80",
        author: "Cultural Committee",
        tags: ["Culture", "Unity", "Heritage"]
    },
    { 
        id: 4,
        title: "Why Recognizing Real Heroes Matters More Than Celebrating Celebrities", 
        date: "2024-08-30", 
        category: "Awards",
        summary: "Society often idolizes fame, but the real changemakers are among us. We explain MASA’s philosophy of honoring everyday heroes.",
        content: `We live in an era of celebrity worship. While entertainers have their place, MASA believes that the true heroes are those who silently build our communities.

## The Real Hero Awards
Our awards initiative is designed to find these unsung champions. The teacher who buys books for poor students, the sanitation worker who goes beyond their duty, the citizen who fights for clean water—these are our celebrities.

### Inspiring the Next Generation
When a child sees a local social worker being honored on a stage, they learn that service is valued. They learn that you don't need to be rich or famous to make a difference.

## A Call to Action
We encourage everyone to look around their community. Identify these heroes. Nominate them. Let us shift the spotlight to where it truly belongs—on service, sacrifice, and integrity.`,
        url: "/blog/recognizing-real-heroes",
        image: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&w=800&q=80",
        author: "Vijay Babu Sharma",
        tags: ["Awards", "Heroes", "Society"]
    },
    { 
        id: 5,
        title: "Recap: Our Annual City Cleanliness Drive", 
        date: "2024-08-12", 
        category: "Events",
        summary: "A look back at our most successful community cleanliness drive, which brought together over 500 volunteers.",
        content: `It is easy to complain about dirty streets; it is harder to pick up a broom. Last week, over 500 MASA volunteers chose the latter.

## A Community Effort
The energy was electric. Students, professionals, and retirees came together with a single purpose: to reclaim their city's beauty. We targeted five major black spots in the city and cleared over 2 tons of waste.

### Beyond Cleaning
This drive wasn't just about cleaning trash; it was about spreading awareness. We spoke to shopkeepers about waste segregation and distributed cloth bags to discourage plastic use.

## The Result
The visual impact was immediate, but the behavioral impact will last longer. When citizens take ownership of their public spaces, the city changes for good. We thank every volunteer who sweated it out for a cleaner tomorrow.`,
        url: "/blog/grassroots-to-global",
        image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
        author: "MASA Team",
        tags: ["Impact", "Grassroots", "Events"]
    }
];
