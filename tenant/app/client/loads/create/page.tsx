
import type { Metadata } from 'next';
import Index from './CreatePage';

export const metadata: Metadata = {
  title: 'Create Load',
  description: '',
};

export default function Page() {
  return <Index />;
}