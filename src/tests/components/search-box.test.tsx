import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../../components/SearchBox';

const renderSearchComponent = () => {
  const onChange = vi.fn();
  render(<SearchBox onChange={onChange} />);
  return {
    input: screen.getByPlaceholderText(/search/i),
    onChange,
  };
};
describe('SearchBox', () => {
  it('should render the input field for searching', () => {
    const { input } = renderSearchComponent();
    expect(input).toBeInTheDocument();
  });

  it('should call onChange when enter is pressed', async () => {
    const { onChange, input } = renderSearchComponent();
    const user = userEvent.setup();
    const searchTerm = 'SearchTerm';
    await user.type(input, searchTerm + '{enter}');

    expect(onChange).toHaveBeenCalledWith(searchTerm);
  });
});
