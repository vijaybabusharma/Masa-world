
import { Post } from '../types';

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
