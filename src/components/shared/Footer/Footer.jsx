import CompanyInfo from './CompanyInfo';
import Copyright from './Copyright';
import QuickLinks from './QuickLinks';
import SocialSection from './SocialSection';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-[#2c3e50] to-[#34495e] text-white px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                <CompanyInfo />
                <QuickLinks />
                <SocialSection />
            </div>
            <Copyright />
        </footer>
    );
}
