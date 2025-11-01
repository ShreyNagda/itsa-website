import Image from "next/image";
import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { SectionHeading } from "@/components/common/section-heading";
import JoinCommunitySection from "@/components/home/join-community-section";

// Faculty data structure - easily customizable
const facultyData = [
  // Faculty 1-27 (add your faculty details here)
  { name: "Prof. Rujata Chaudhari", position: "Assistant Professor", qualification: "M.E", experience: "10+ years experience", image: "rujata.png" },
  { name: "Prof. Sonia Aneesh", position: "Assistant Professor", qualification: "Pursuing PhD", experience: "15+ years experience", image: "sonia.png" },
  { name: "Prof. Sonal Balpande", position: "Assistant Professor", qualification: "M.E", experience: "15+ years experience", image: "sonal.png" },
  { name: "Prof. Vishal S. Badgujar", position: "Assistant Professor", qualification: "Pursuing PhD", experience: "10+ years experience", image: "vishal.png" },
  { name: "Prof. Ganesh Gourshete", position: "Assistant Professor", qualification: "Pursuing PhD", experience: "20+ years experience", image: "ganesh.png" },
  { name: "Prof. Apeksha Mohite", position: "Assistant Professor", qualification: "M.E", experience: "10+ years experience", image: "apeksha.png" },
  { name: "Prof. Mandar Ganjapurkar", position: "Assistant Professor", qualification: "Pursuing PhD", experience: "15+ years experience", image: "mandar.jpg" },
  { name: "Prof. Yaminee Patil", position: "Assistant Professor", qualification: "M.E", experience: "10+ years experience", image: "yaminee.jpg" },
  { name: "Prof. Sonal Jain", position: "Assistant Professor", qualification: "M.Tech", experience: "5+ years experience", image: "sonalj.png" },
  { name: "Prof. Manjusha Kashilkar", position: "Assistant Professor", qualification: "M.E", experience: "10+ years experience", image: "manjusha.png" },
  { name: "Prof. Sneha Dalvi", position: "Assistant Professor", qualification: "M.E", experience: "5+ years experience", image: "sneha.png" },
  { name: "Prof. Jayshree Jha", position: "Assistant Professor", qualification: "M.E", experience: "10+ years experience", image: "jayshree.png" },
  { name: "Prof. Geetanjali Kalme", position: "Assistant Professor", qualification: "Pursuing PhD", experience: "10+ years experience", image: "geetanjali.png" },
  { name: "Prof. Roshna Sangle", position: "Assistant Professor", qualification: "M.E", experience: "15+ years experience", image: "roshna.png" },
  { name: "Prof. Shafaque Fatma Syed", position: "Assistant Professor", qualification: "M.E", experience: "10+ years experience", image: "shafaque.png" },
  { name: "Prof. Charul Singh", position: "Assistant Professor", qualification: "M.E", experience: "3+ years experience", image: "charul.png" },
  { name: "Prof. Rucha Kulkarni", position: "Assistant Professor", qualification: "M.E", experience: "5+ years experience", image: "rucha.png" },
  { name: "Prof. Shital Agrawal", position: "Assistant Professor", qualification: "M.E", experience: "5+ years experience", image: "shital.png" },
  { name: "Prof. Urajashree Patil", position: "Assistant Professor", qualification: "M.E", experience: "10+ years experience", image: "urajashree.png" },
  { name: "Prof. Randeep Kahlon", position: "Assistant Professor", qualification: "M.E", experience: "15+ years experience", image: "randeep.jpg" },
  { name: "Prof. Sachin S. Kasare", position: "Assistant Professor", qualification: "Pursuing PhD", experience: "10+ years experience", image: "sachin.jpeg" },
  { name: "Prof. Sujata Oak", position: "Assistant Professor", qualification: "M.E", experience: "15+ years experience", image: "sujata.jpg" },
  { name: "Prof. Seema Jadhav", position: "Assistant Professor", qualification: "M.E", experience: "5+ years experience", image: "seema.jpg" },
  { name: "Prof. Snehal Mali", position: "Assistant Professor", qualification: "M.Tech", experience: "2+ years experience", image: "snehal.png" },
  { name: "Prof. Saylee Lapalikar", position: "Assistant Professor", qualification: "M.E", experience: "1+ years experience", image: "saylee.jpeg" },
  { name: "Prof. Anupama Singh", position: "Assistant Professor", qualification: "M.E", experience: "1+ years experience", image: "anupama.png" },
  { name: "Prof. Shweta Mahajan", position: "Assistant Professor", qualification: "M.E", experience: "3+ years experience", image: "shweta.png" },
];

export default function AboutPage() {
  return (
    <div className="">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Image
                src="/itsa_logo.png"
                alt="IT Logo"
                width={120}
                height={120}
                className="rounded-lg"
              />
            </div>
            <h1 className="font-geist text-4xl md:text-5xl font-bold text-primary mb-4">
              About Us
            </h1>
            <p className="font-manrope text-xl text-muted-foreground max-w-3xl mx-auto">
              Department of Information Technology APSIT
            </p>
          </div>

          {/* Mission Section */}
          <div className="mb-16">
            <SectionHeading title="Our Mission" />
            <p className="font-manrope text-muted-foreground text-lg leading-relaxed mb-4">
              M1: To develop, support and maintain state-of-art infrastructure to serve as a potent resource
hub for IT industries.
<br/>
M2: To inculcate the problem solving, analytical, logical skills and to promote the culture of
creativity and innovation among the students.
<br/>
M3: To adapt with the transformation of the technology emphasizing on inter-disciplinary
studies , exposure to emerging technologies and imbibing high standards of professional ethics
and social responsibilities in all endeavors
            </p>
            <p className="font-manrope text-muted-foreground text-lg leading-relaxed">
              Our Vision{" "}
              <strong>&quot;To be a prime center of excellence by transforming students into globally competent IT
professionals.&quot;</strong>{" "}
              reflects our commitment to student-driven initiatives that address
              real needs and create meaningful impact.
            </p>
          </div>

          {/* Values Section */}
          <div className="bg-muted/30 rounded-lg mb-16">
            <SectionHeading title="Our Values" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground text-2xl font-bold">
                    I
                  </span>
                </div>
                <h3 className="font-geist text-xl font-semibold text-primary mb-2">
                  Innovation
                </h3>
                <p className="font-manrope text-muted-foreground">
                  Embracing new technologies and creative solutions to drive
                  progress.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground text-2xl font-bold">
                    C
                  </span>
                </div>
                <h3 className="font-geist text-xl font-semibold text-primary mb-2">
                  Community
                </h3>
                <p className="font-manrope text-muted-foreground">
                  Building strong connections and supporting each other&apos;s
                  growth.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-foreground text-2xl font-bold">
                    E
                  </span>
                </div>
                <h3 className="font-geist text-xl font-semibold text-primary mb-2">
                  Excellence
                </h3>
                <p className="font-manrope text-muted-foreground">
                  Striving for the highest standards in everything we do.
                </p>
              </div>
            </div>
          </div>

          {/* Faculty Section */}
          <div className="mb-16">
            <SectionHeading title="Our Faculty" subtitle="Meet our dedicated and experienced faculty members" />
            
            {/* Head of Department - Single Panel */}
            <div className="flex justify-center mb-12">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 w-64 text-center border border-gray-100 dark:border-gray-700">
                <div className="relative mb-4">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center overflow-hidden">
                    <Image
                      src="/facultyimages/kbd.jpg"
                      alt="HOD Profile"
                      width={96}
                      height={96}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">★</span>
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-primary mb-1">Dr. Kiran Deshpande</h3>
                <p className="text-sm text-muted-foreground mb-2">Head of Department</p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Ph.D.<br/>
                  20+ years experience
                </p>
              </div>
            </div>

            {/* Faculty Grid - Remaining 27 Members */}
            <div className="flex flex-wrap justify-center gap-6">
              {facultyData.map((faculty, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 text-center border border-gray-100 dark:border-gray-700 group w-[180px] sm:w-[200px]">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      <Image
                        src={`/facultyimages/${faculty.image}`}
                        alt={`${faculty.name} Profile`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <h3 className="font-semibold text-base text-primary mb-1 group-hover:text-primary/80 transition-colors">
                    {faculty.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{faculty.position}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {faculty.qualification}<br/>
                    {faculty.experience}
                  </p>
                </div>
              ))}
            </div>

            {/* Faculty Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">28</div>
                <div className="text-sm text-muted-foreground">Faculty Members</div>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">15+</div>
                <div className="text-sm text-muted-foreground">Years Average Experience</div>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Research Publications</div>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <div className="text-2xl font-bold text-primary">100%</div>
                <div className="text-sm text-muted-foreground">PhD/M.Tech Qualified</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <JoinCommunitySection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
