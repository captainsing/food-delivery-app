import React, { useState } from 'react';

export default function DeveloperCard() {
  const [isOpen, setIsOpen] = useState(false);

  // 📸 NOTE: Apni photo 'frontend/public/' folder me daal kar '/my-photo.jpg' set kar sakte hain
  const developerPhoto = "/profile.jpg";

  return (
    <>
      <section className="my-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 text-white shadow-2xl border border-slate-700 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          
          {/* Profile Image Frame */}
          <div 
            onClick={() => setIsOpen(true)}
            className="relative group shrink-0 cursor-pointer"
            title="Click to view full details"
          >
            <div className="w-36 h-36 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-red-500/80 shadow-2xl p-1 bg-slate-800 flex items-center justify-center group-hover:border-red-400 transition-all">
              <img 
                src={developerPhoto} 
                alt="Kaptan Singh" 
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute bottom-2 right-2 bg-emerald-500 text-white p-1.5 rounded-full shadow-lg border-2 border-slate-900">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {/* Developer Bio & Details */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider">
              ⭐ Software Engineer
            </div>

            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
              Kaptan Singh
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
              Passionate Software Engineer specializing in modern web development with <b>React, Tailwind CSS, JavaScript, and Node.js</b>. Focused on building high-performance, dynamic, and fully responsive applications.
            </p>

            {/* Tech Badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
              {['React.js', 'Tailwind CSS', 'JavaScript', 'Node.js', 'PostgreSQL', 'REST API'].map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-xl bg-slate-800/80 border border-slate-700 text-[11px] font-semibold text-slate-300">
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Links & Modal Trigger */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-4">
              
              {/* Full Details Modal Trigger Button */}
              <button
                onClick={() => setIsOpen(true)}
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-500/20 active:scale-95"
              >
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>View Full Details</span>
              </button>

              {/* Portfolio Link */}
              <a 
                href="https://captainsingh.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
              >
                <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span>Portfolio</span>
              </a>

              {/* LinkedIn Button */}
              <a 
                href="https://www.linkedin.com/in/%F0%9F%92%AB-kaptan-singh-%F0%9F%A4%9F-373715222/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-2xl bg-[#0A66C2] hover:bg-[#084e96] text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <span>LinkedIn</span>
              </a>

              {/* GitHub Button */}
              <a 
                href="https://github.com/captainsing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-2 transition-all active:scale-95"
              >
                <svg className="w-4 h-4 fill-current text-slate-200" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </a>

            </div>
          </div>

        </div>
      </section>

      {/* 🚀 Interactive Developer Full Detail Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-3xl p-6 md:p-8 text-white relative shadow-2xl overflow-y-auto max-h-[90vh]">
            
            {/* Close Button */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-5 border-b border-slate-800 pb-6 mb-6">
              <img 
                src={developerPhoto} 
                alt="Kaptan Singh" 
                className="w-20 h-20 rounded-full object-cover border-2 border-red-500 shadow-md"
              />
              <div>
                <h3 className="text-2xl font-black text-white">Kaptan Singh</h3>
                <p className="text-red-400 font-bold text-xs uppercase tracking-wider">Full Stack Software Engineer</p>
                <p className="text-slate-400 text-xs mt-1">Specialized in High Performance Web Apps</p>
              </div>
            </div>

            {/* Detailed Content */}
            <div className="space-y-6 text-sm">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">About Me</h4>
                <p className="text-slate-300 leading-relaxed">
                  Software Engineer with hands-on expertise in developing scalable web applications using 
                  React.js, Node.js, Express, and PostgreSQL. Experienced in designing fully dynamic user experiences, 
                  optimizing performance, and integrating REST APIs.
                </p>
              </div>

              {/* Core Skills */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Core Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {['React.js', 'Tailwind CSS', 'JavaScript (ES6+)', 'Node.js', 'Express.js', 'PostgreSQL', 'RESTful APIs', 'Git / GitHub'].map((skill) => (
                    <span key={skill} className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Key Accomplishments</h4>
                <ul className="space-y-2 text-slate-300 list-disc list-inside">
                  <li>Built fully dynamic Food Delivery platform with Neon PostgreSQL integration.</li>
                  <li>Designed ATS-optimized high-performance UI architectures.</li>
                  <li>Implemented secure JWT authentication and role-based data flow.</li>
                </ul>
              </div>

              {/* Contact Footer */}
              <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-400">📧 contact me - kap3tansingh9@gmail.com</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                >
                  Close Window
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}