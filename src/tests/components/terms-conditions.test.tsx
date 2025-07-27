import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TermsAndConditions from '../../components/TermsAndConditions';

describe('TermsAndConditions', () => {
  const renderComponent = () => {
    render(<TermsAndConditions />);
    return {
      heading: screen.getByRole('heading'),
      checkbox: screen.getByRole('checkbox'),
      button: screen.getByRole('button', { name: 'Submit' }),
    };
  };

  it('should render with correct text and state', () => {
    const { heading, checkbox, button } = renderComponent();

    expect(heading).toHaveTextContent('Terms & Conditions');
    expect(checkbox).not.toBeChecked();
    expect(button).toBeDisabled();
  });

  it('should enable the button when the checkbox is checked', async () => {
    const { checkbox, button } = renderComponent();
    expect(checkbox).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(checkbox);

    expect(button).toBeEnabled();
  });
});
