
import React from 'react';
import { GraduationCap, BookOpen, Target, Briefcase, Mail, Phone, MapPin, Sparkles } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Top Banner */}
      <div className="bg-indigo-600 py-2 text-center">
        <p className="text-white text-xs font-medium flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3" /> New: Career Guidance features are now live!
        </p>
      </div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl">
                <GraduationCap className="text-white w-7 h-7" />
              </div>
              <span className="text-2xl font-bold text-slate-900 tracking-tight">AI Student<span className="text-indigo-600">Helpdesk</span></span>
            </div>
            
            <div className="hidden md:flex items-center space-x-10 text-sm font-semibold text-slate-600">
              <a href="#study-tips" className="hover:text-indigo-600 transition-colors">Study Tips</a>
              <a href="#exam-prep" className="hover:text-indigo-600 transition-colors">Exam Prep</a>
              <a href="#career" className="hover:text-indigo-600 transition-colors">Career Guidance</a>
            </div>

            <div className="flex items-center gap-4">
              <a href="#contact" className="bg-slate-900 text-white px-6 py-2.5 rounded-full font-bold hover:bg-slate-800 transition-all text-sm shadow-lg shadow-slate-200">
                Contact
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer id="contact" className="bg-slate-50 border-t border-slate-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-indigo-600 p-1.5 rounded-lg">
                  <GraduationCap className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold text-slate-900">AI Student Helpdesk</span>
              </div>
              <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">
                Empowering students with AI-driven academic support. Built with Google AI Studio for a smarter learning experience.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:border-indigo-600 cursor-pointer transition-colors">
                  <span className="text-xs font-bold">In</span>
                </div>
                <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:border-indigo-600 cursor-pointer transition-colors">
                  <span className="text-xs font-bold">Tw</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-slate-900 font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-sm text-slate-500 font-medium">
                <li><a href="#" className="hover:text-indigo-600">Learning Paths</a></li>
                <li><a href="#" className="hover:text-indigo-600">Resource Library</a></li>
                <li><a href="#" className="hover:text-indigo-600">Student Community</a></li>
                <li><a href="#" className="hover:text-indigo-600">Tutor Support</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-slate-900 font-bold mb-6">Get In Touch</h4>
              <ul className="space-y-4 text-sm text-slate-500 font-medium">
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 text-indigo-600" /> support@studenthelp.ai</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 text-indigo-600" /> +1 (800) HELP-STU</li>
                <li className="flex items-center gap-3"><MapPin className="w-4 h-4 text-indigo-600" /> Academic Plaza, SF</li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-200 text-center text-xs text-slate-400 font-medium">
            &copy; {new Date().getFullYear()} AI Student Helpdesk. For educational purposes only.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
