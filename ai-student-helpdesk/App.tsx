
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import AcademicDashboard from './components/Dashboard';
import AIChatAssistant from './components/AIChatAssistant';
import { getAcademicGuidance } from './services/geminiService';
import { AcademicGuidance } from './types';
import { Search, Loader2, BookOpen, GraduationCap, Sparkles, ArrowRight, BrainCircuit, Rocket, Zap } from 'lucide-react';

const SUBJECTS = [
  "Mathematics", "Computer Science", "Physics", "Biology", "World History", 
  "English Literature", "Economics", "Psychology", "Art History", "Chemistry"
];

const App: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState('Computer Science');
  const [data, setData] = useState<AcademicGuidance | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (subject: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAcademicGuidance(subject);
      if (result) {
        setData(result);
      } else {
        setError("Our advisor is currently busy. Please try another subject.");
      }
    } catch (err) {
      setError("Failed to connect to the knowledge engine.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedSubject);
  }, []);

  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sub = e.target.value;
    setSelectedSubject(sub);
    fetchData(sub);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-[120px] -mr-64 -mt-64" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-50 rounded-full blur-[100px] -ml-40 -mb-40 opacity-60" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-10 border border-indigo-100 shadow-sm">
              <Sparkles className="w-4 h-4" /> Personal Academic Success Hub
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-8 leading-[1.1]">
              Smarter Learning for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">The Modern Student</span>
            </h1>
            
            <p className="text-xl text-slate-500 font-medium mb-12 leading-relaxed max-w-2xl">
              Instant academic guidance, AI-curated study tips, and expert career paths—all in one place. No code, just intelligence.
            </p>

            <div className="w-full max-w-2xl flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-[2rem] border border-slate-200 shadow-2xl shadow-indigo-100/50">
              <div className="relative flex-grow">
                <BookOpen className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <select 
                  value={selectedSubject}
                  onChange={handleSubjectChange}
                  className="w-full h-14 pl-14 pr-6 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-100 text-slate-900 font-bold appearance-none cursor-pointer text-base"
                >
                  {SUBJECTS.map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
              </div>
              <button 
                onClick={() => fetchData(selectedSubject)}
                className="h-14 px-10 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 flex items-center justify-center gap-3"
              >
                Build Path <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="bg-white px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 space-y-8">
            <div className="relative">
              <div className="w-24 h-24 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <BrainCircuit className="w-10 h-10 text-indigo-600" />
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Analyzing the Subject...</h3>
              <p className="text-slate-400 font-medium italic">Our advisor is synthesizing tips and career data for {selectedSubject}.</p>
            </div>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto py-20 text-center">
            <div className="bg-rose-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border border-rose-100">
              <Zap className="text-rose-600 w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Knowledge Bridge Error</h3>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">{error}</p>
            <button onClick={() => fetchData(selectedSubject)} className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
              Retry Search
            </button>
          </div>
        ) : data ? (
          <AcademicDashboard data={data} />
        ) : null}

        {/* Benefits Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-20 border-t border-slate-100">
            <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-indigo-100 transition-all">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">AI Reasoning</h4>
              <p className="text-slate-500 font-medium leading-relaxed text-sm">
                Get more than just answers. Our AI explains the 'why' behind concepts, fostering true understanding.
              </p>
            </div>
            <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-indigo-100 transition-all">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Rocket className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Career Mapping</h4>
              <p className="text-slate-500 font-medium leading-relaxed text-sm">
                Bridge the gap between classroom theory and real-world careers with automated guidance.
              </p>
            </div>
            <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-indigo-100 transition-all">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">24/7 Support</h4>
              <p className="text-slate-500 font-medium leading-relaxed text-sm">
                The library closes, but our helpdesk is always open. Get help whenever inspiration (or a deadline) strikes.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Floating Assistant */}
      {data && <AIChatAssistant context={selectedSubject} />}
    </Layout>
  );
};

export default App;
