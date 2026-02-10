
import React from 'react';
import { AcademicGuidance } from '../types';
import { BookOpen, Target, Briefcase, Lightbulb, CheckCircle, AlertTriangle, ArrowRight, Star } from 'lucide-react';

interface AcademicDashboardProps {
  data: AcademicGuidance;
}

const AcademicDashboard: React.FC<AcademicDashboardProps> = ({ data }) => {
  return (
    <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      
      {/* Subject Summary */}
      <div className="bg-indigo-50 rounded-[2.5rem] p-8 md:p-12 border border-indigo-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <BookOpen className="w-48 h-48 text-indigo-600" />
        </div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-xs font-bold text-indigo-600 mb-6 border border-indigo-100 shadow-sm">
            <Star className="w-3 h-3 fill-indigo-600" /> Mastery Level: Intermediate
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-6">
            Exploring <span className="text-indigo-600">{data.subject}</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            {data.summary}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Study Tips - Left Column */}
        <div id="study-tips" className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-3 mb-2 px-2">
            <Lightbulb className="text-amber-500 w-6 h-6" />
            <h3 className="text-xl font-bold text-slate-900">Study Tips</h3>
          </div>
          {data.studyTips.map((tip, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all group">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center justify-between">
                {tip.title}
                <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded uppercase text-slate-500 tracking-wider">Tip {idx + 1}</span>
              </h4>
              <p className="text-sm text-slate-500 mb-4 leading-relaxed">{tip.description}</p>
              <div className="bg-slate-50 p-3 rounded-2xl text-[11px] font-bold text-indigo-600 flex items-center gap-2">
                <CheckCircle className="w-3 h-3" /> Technique: {tip.technique}
              </div>
            </div>
          ))}
        </div>

        {/* Exam Prep & Career - Right Column */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Exam Prep */}
          <div id="exam-prep" className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Target className="text-rose-500 w-6 h-6" />
                <h3 className="text-xl font-bold text-slate-900">Exam Preparation</h3>
              </div>
              <div className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                Topic: {data.examPrep.topic}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Key Concepts</h4>
                  <ul className="space-y-2">
                    {data.examPrep.keyConcepts.map((concept, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                        {concept}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-rose-50 p-5 rounded-2xl border border-rose-100">
                  <h4 className="text-xs font-black text-rose-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3" /> Common Pitfalls
                  </h4>
                  <ul className="space-y-2">
                    {data.examPrep.commonMistakes.map((mistake, i) => (
                      <li key={i} className="text-xs font-medium text-rose-600 leading-relaxed">• {mistake}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-slate-900 p-8 rounded-3xl text-white">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Practice Question</h4>
                <p className="text-sm font-medium leading-relaxed mb-8 italic">
                  "{data.examPrep.practiceQuestion}"
                </p>
                <button className="w-full py-3 bg-white text-slate-900 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2">
                  Check Solution <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Career Path */}
          <div id="career" className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-xl shadow-indigo-100 flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-1/3 text-center md:text-left">
              <div className="bg-white/20 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto md:mx-0 mb-6">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black mb-2">Career Outlook</h3>
              <p className="text-indigo-100 text-sm font-medium">Where your studies can lead you.</p>
            </div>
            <div className="md:w-2/3 bg-white/10 rounded-3xl p-6 backdrop-blur-md border border-white/10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-bold mb-1">{data.careerPath.role}</h4>
                  <p className="text-xs text-indigo-200 font-bold uppercase tracking-widest">Target Role</p>
                </div>
                <div className="bg-white text-indigo-600 px-4 py-1 rounded-full text-xs font-black">
                  {data.careerPath.salaryOutlook}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-6">
                {data.careerPath.skillsRequired.map((skill, i) => (
                  <span key={i} className="text-[10px] font-bold bg-indigo-500/30 px-3 py-1 rounded-lg">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="text-sm font-medium text-indigo-50 leading-relaxed">
                  <span className="text-white font-bold">Next Steps:</span> {data.careerPath.nextSteps}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AcademicDashboard;
