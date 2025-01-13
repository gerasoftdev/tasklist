import { createRoot } from 'react-dom/client';
import { App } from '@/app';

const el = document.getElementById('root');
if (el) {
  const root = createRoot(el);
  root.render(<App />);
} else {
  throw new Error('Could not find root element');
}