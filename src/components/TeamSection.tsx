import { useEffect, useRef } from 'react'

const team = [
  {
    name: 'Hassan Ali Sheikh', id: '7014253', email: '70142953@student.uol.edu.pk',
    role: 'Hardware & ESP32 Lead',
    focus: 'ESP32 firmware, CSI data collection, sensor calibration and triangulation geometry.',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1c3511d19-1772663317958.png',
    tags: ['ESP32','Hardware','C++'], index: '01',
  },
  {
    name: 'M. Shahab Sadiq', id: '70141388', email: '70141388@student.uol.edu.pk',
    role: 'AI & Signal Processing',
    focus: 'CSI signal analysis, FFT-based breathing detection, movement classification algorithms.',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1a6b3b56b-1772663395342.png',
    tags: ['Python','FFT','ML'], index: '02',
  },
  {
    name: 'Moazzma Nazir', id: '70142226', email: '70142226@student.uol.edu.pk',
    role: 'App & Dashboard Dev',
    focus: 'Mobile app design, real-time heatmap visualization, alert system and user experience.',
    avatar: 'https://img.rocket.new/generatedImages/rocket_gen_img_1badc737b-1772663314778.png',
    tags: ['React Native','UI/UX','IoT'], index: '03',
  },
]

export default function TeamSection() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.remove('reveal-hidden') })
    }, { threshold: 0.08 })
    ref.current?.querySelectorAll('.reveal-on-scroll').forEach(el => { el.classList.add('reveal-hidden'); observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  return (
    <section id="team" ref={ref} className="py-24 lg:py-36 bg-[#0F1210] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-15"/>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.06)] to-transparent"/>
      <div className="section-container relative z-10">
        <div className="mb-16 reveal-on-scroll">
          <div className="mono-label mb-4">The Team</div>
          <h2 className="section-title text-ice max-w-2xl">
            Built by students, <span className="italic" style={{ color: '#F5A623' }}>for the real world.</span>
          </h2>
          <p className="font-body text-[rgba(232,237,240,0.5)] text-lg mt-4 max-w-xl">
            Three Computer Science students from the University of Lahore — turning a security problem into a privacy solution.
          </p>
        </div>

        {/* Supervisor */}
        <div className="mb-12 p-5 rounded-[3px] flex items-center gap-5 reveal-on-scroll"
          style={{ background: 'rgba(245,166,35,0.05)', border: '1px solid rgba(245,166,35,0.2)', transitionDelay: '50ms' }}>
          <div className="w-10 h-10 rounded-[2px] flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(245,166,35,0.15)', border: '1px solid rgba(245,166,35,0.3)' }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2 L9 9 M5 16 L9 9 L13 16" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="2" r="2" stroke="#F5A623" strokeWidth="1"/>
            </svg>
          </div>
          <div>
            <div className="font-mono text-[9px] font-bold uppercase tracking-widest text-amber mb-0.5">Project Supervisor</div>
            <div className="font-display text-[16px] font-bold text-ice">Ma'am Saman Asad</div>
            <div className="font-mono text-[10px] text-ice-muted">Department of CS &amp; IT · Faculty of Information Technology · UOL</div>
          </div>
          <div className="ml-auto hidden md:block">
            <div className="font-mono text-[9px] text-ice-muted uppercase tracking-widest">Project Date</div>
            <div className="font-mono text-[11px] text-amber">30 Jan 2026</div>
          </div>
        </div>

        {/* Team grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {team.map((member, i) => (
            <div key={member.id} className="feature-card reveal-on-scroll" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="p-6">
                <div className="flex items-start gap-4 mb-5">
                  <div className="relative w-14 h-14 flex-shrink-0 rounded-[3px] overflow-hidden">
                    <img src={member.avatar} alt={member.name}
                      className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"/>
                    <div className="absolute bottom-0 right-0 bg-[#0A0C0B] px-1 py-0.5">
                      <span className="font-mono text-[8px] font-bold text-amber">{member.index}</span>
                    </div>
                  </div>
                  <div>
                    <div className="font-mono text-[9px] font-bold text-amber uppercase tracking-widest mb-0.5">{member.index}</div>
                    <h3 className="font-display text-[16px] font-bold text-ice leading-tight">{member.name}</h3>
                    <div className="font-mono text-[10px] text-ice-muted mt-0.5">{member.role}</div>
                  </div>
                </div>
                <p className="font-body text-[12px] text-[rgba(232,237,240,0.5)] leading-relaxed mb-4">{member.focus}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {member.tags.map(tag => (
                    <span key={tag} className="font-mono text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-[2px]"
                      style={{ background: 'rgba(245,166,35,0.1)', color: '#F5A623', border: '1px solid rgba(245,166,35,0.2)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="border-t border-[rgba(255,255,255,0.05)] pt-3 space-y-1">
                  <div className="font-mono text-[9px] text-ice-muted truncate">
                    <span className="text-[rgba(245,166,35,0.5)] mr-1">ID:</span>{member.id}
                  </div>
                  <div className="font-mono text-[9px] text-ice-muted truncate">
                    <span className="text-[rgba(245,166,35,0.5)] mr-1">@:</span>{member.email}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-4 text-center rounded-[3px] reveal-on-scroll"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', transitionDelay: '300ms' }}>
          <div className="font-mono text-[10px] text-ice-muted uppercase tracking-widest">
            THE UNIVERSITY OF LAHORE · Department of Computer Science &amp; IT · Faculty of Information Technology
          </div>
          <div className="font-mono text-[10px] text-amber mt-1 uppercase tracking-widest">Final Year Project · Batch 2022–2026</div>
        </div>
      </div>
    </section>
  )
}
