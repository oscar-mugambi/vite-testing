import { render, screen } from '@testing-library/react';
import UserAccount from '../../components/UserAccount';
import { User } from '../../entities';

describe('UserAccount', () => {
  it('should render the user name', () => {
    const user: User = { name: 'Oscar', isAdmin: true, id: 1 };
    render(<UserAccount user={user} />);
    expect(screen.getByText(user.name)).toBeInTheDocument();
  });
  it('should render edit button if user is admin', () => {
    const user: User = { name: 'Oscar', isAdmin: true, id: 1 };
    render(<UserAccount user={user} />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/edit/i);
  });
  it('should not render edit button if user is admin', () => {
    const user: User = { name: 'Oscar', isAdmin: false, id: 1 };
    render(<UserAccount user={user} />);
    const button = screen.queryByRole('button');
    expect(button).not.toBeInTheDocument();
  });
});
