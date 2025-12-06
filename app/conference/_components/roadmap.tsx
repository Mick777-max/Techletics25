'use client';

const timelineData = [
  {
    date: '15th February',
    text: 'Abstract Submission Closes.',
  },
  {
    date: '20th February',
    text: 'Intimation of Acceptance.',
  },
  {
    date: '22nd February',
    text: 'Camera-ready paper & final registration (including fee payment).',
  },
  {
    date: '25th February',
    text: 'Submission of Presentation.',
  },
  {
    date: '28th February',
    text: 'Presentation (Hybrid - Offline/Online).',
  },
  {
    date: '29th February',
    text: 'Results & Awards Distribution.',
  },
];

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';

import 'react-vertical-timeline-component/style.min.css';

export default function Roadmap() {
  return (
    <section className="relative mx-auto max-w-screen-xl items-center justify-center py-[4rem] max-lg:px-3">
      <h1 className="mb-[0.5rem] text-wrap font-orbitron text-3xl font-medium text-quarternary md:text-5xl">
        CONFERENCE <span className="text-secondary">ROADMAP</span>
      </h1>

      <VerticalTimeline lineColor="#D4AF40" layout="1-column-left">
        {timelineData.map((item, index) => (
          // <div></div>
          <VerticalTimelineElement
            className="cursor-cell transition-all duration-300 hover:scale-105"
            key={index}
            iconStyle={{
              background: '#FFF7DB',
              color: '#000',
              border: '3px solid black',
            }}
            contentStyle={{
              background: '#FFF7DB',
              color: '#000',
              border: '2px solid black',
              boxShadow: 'none',
            }}
            contentArrowStyle={{ borderRight: '7px solid #000' }}
          >
            <div className="flex items-center gap-4 overflow-clip">
              <span className="text-wrap font-orbitron text-xl font-bold text-quarternary">
                {item.date}
              </span>

              <span className="text-wrap break-words">{item.text}</span>
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </section>
  );
}
