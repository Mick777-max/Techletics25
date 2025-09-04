import type { Metadata } from 'next';
import Conference from './conference';

export const metadata: Metadata = {
  title: 'Conference',
  description: "Join our technical conference at Techletics '25",
};

export default function ConferencePage() {
  return (
    <div>
      <Conference />
    </div>
  );
}
