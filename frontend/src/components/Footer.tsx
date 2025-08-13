
export const Footer = () => {
    return(
    <footer className="bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                    <div className="flex flex-col items-center md:items-start">
                        <div className="text-2xl font-bold text-green-400 mb-2">
                            WryTr
                        </div>
                        <p className="text-gray-400 text-center md:text-left max-w-md">
                            Empowering writers to share their stories with a global audience.
                        </p>
                    </div>
            
                    <div className="flex space-x-8 text-sm">
                        <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</a>
                        <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Terms of Service</a>
                        <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Contact Us</a>
                    </div>
                </div>
        </div>
    </footer>
    );
}