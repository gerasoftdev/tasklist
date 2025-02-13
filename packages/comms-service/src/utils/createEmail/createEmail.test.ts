import { describe, it, expect } from 'vitest';
import { createEmail, EmailElements } from '@/utils/createEmail';

const domain = 'example.com';

describe('createEmail', () => {
  it('should generate an email with a title and elements correctly formatted', () => {
    const title = 'Test Email';
    const elements = [
      { type: EmailElements.h1, text: 'Welcome to Blogdone' } as const,
      { type: EmailElements.h2, text: 'Latest Updates' } as const,
      { type: EmailElements.text, text: 'This is a text paragraph.' } as const,
      {
        type: EmailElements.link,
        href: 'https://example.com',
        text: 'Click here',
      } as const,
      {
        type: EmailElements.button,
        href: 'https://example.com',
        text: 'Get Started',
      } as const,
    ];

    const extraStyles = '.custom-style { font-size: 20px; }';
    const result = createEmail({ title, elements, extraStyles, domain });

    expect(result).toContain('<title>Test Email</title>');

    expect(result).toContain('<h1>Welcome to Blogdone</h1>');
    expect(result).toContain('<h2>Latest Updates</h2>');
    expect(result).toContain('<p>This is a text paragraph.</p>');
    expect(result).toContain(
      "<a target='_blank' href='https://example.com'>Click here</a>",
    );
    expect(result).toContain(
      "<a class='btn btn-primary' target='_blank' href='https://example.com'>Get Started</a>",
    );

    expect(result).toContain(extraStyles);
  });

  it('should generate an email with default empty styles when no extraStyles are provided', () => {
    const title = 'No Extra Styles';
    const elements = [
      { type: EmailElements.text, text: 'This is a simple email.' } as const,
    ];

    const result = createEmail({ title, elements, domain });

    expect(result).toContain('<title>No Extra Styles</title>');
    expect(result).toContain('<p>This is a simple email.</p>');
    expect(result).toContain('');
  });

  it('should return an empty string when no elements are provided', () => {
    const title = 'Empty Email';
    const result = createEmail({ title, elements: [], domain });

    expect(result).toContain('<title>Empty Email</title>');
    expect(result).toContain('<td class="container"><p class="footer"');
  });
});
