import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import ExpandableText from '../../components/ExpandableText';

const shortText = 'Short text under the limit.';
const longText = 'A'.repeat(300);

describe('ExpandableText', () => {
  it('renders full text if it is shorter than or equal to 255 characters', () => {
    render(<ExpandableText text={shortText} />);

    expect(screen.getByText(shortText)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders truncated text and "Show More" button if text is longer than 255 characters', () => {
    render(<ExpandableText text={longText} />);

    const truncated = longText.substring(0, 255) + '...';
    expect(screen.getByText(truncated)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /show more/i }),
    ).toBeInTheDocument();
  });

  it('expands to show full text when "Show More" is clicked', async () => {
    render(<ExpandableText text={longText} />);
    const user = userEvent.setup();

    await user.click(screen.getByRole('button', { name: /show more/i }));

    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /show less/i }),
    ).toBeInTheDocument();
  });

  it('collapses back to truncated text when "Show Less" is clicked', async () => {
    render(<ExpandableText text={longText} />);
    const user = userEvent.setup();

    const button = screen.getByRole('button', { name: /show more/i });
    await user.click(button);
    await user.click(screen.getByRole('button', { name: /show less/i }));

    const truncated = longText.substring(0, 255) + '...';
    expect(screen.getByText(truncated)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /show more/i }),
    ).toBeInTheDocument();
  });
});
