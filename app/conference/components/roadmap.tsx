'use client';

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
        <VerticalTimelineElement
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
              15th February
            </span>

            <span className="break-words font-opensans">
              Abstract Submission Closes.
            </span>
          </div>
        </VerticalTimelineElement>

        <VerticalTimelineElement
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
              20th February
            </span>
            <span className="text-wrap break-words">
              Intimation of Acceptance.
            </span>
          </div>
        </VerticalTimelineElement>

        <VerticalTimelineElement
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
              22nd February
            </span>
            <span className="text-wrap break-words">
              Camera-ready paper & final registration (including fee payment).
            </span>
          </div>
        </VerticalTimelineElement>

        <VerticalTimelineElement
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
              25th February
            </span>
            <span className="text-wrap break-words">
              Submission of Presentation.
            </span>
          </div>
        </VerticalTimelineElement>

        <VerticalTimelineElement
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
              28th February
            </span>
            <span className="text-wrap break-words">
              Presentation (Hybrid - Offline/Online).
            </span>
          </div>
        </VerticalTimelineElement>

        <VerticalTimelineElement
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
              29th February
            </span>
            <span className="text-wrap break-words">
              Results & Awards Distribution.
            </span>
          </div>
        </VerticalTimelineElement>
      </VerticalTimeline>
    </section>
  );
}
