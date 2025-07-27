import { render, screen } from '@testing-library/react';
import UserList from '../../components/UserList';
import { User } from '../../entities';

describe('UserList', () => {
  it('should render a message when there are no users', () => {
    const users: User[] = [];
    render(<UserList users={users} />);
    expect(screen.getByText(/no users/i)).toBeInTheDocument();
  });

  it('should render a list of users', () => {
    const users = [
      { id: 1, name: 'Oscar', isAdmin: true },
      { id: 2, name: 'John', isAdmin: false },
      { id: 3, name: 'Jane', isAdmin: true },
    ];

    render(<UserList users={users} />);
    users.forEach((user) => {
      const link = screen.getByRole('link', { name: user.name });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/users/${user.id}`);
    });
  });
});
