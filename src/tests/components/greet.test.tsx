import { render, screen } from '@testing-library/react';
import Greet from '../../components/Greet';

describe('Greet', () => {
  it('should render Hello with the name when it is provided', () => {
    render(<Greet name='Oscar' />);
    const heading = screen.getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Hello Oscar');
  });

  it('should render a button when no name is provided', () => {
    render(<Greet name='' />);
    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Login');
  });
});
