import { Theme } from '@radix-ui/themes';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OrderStatusSelector from '../../components/OrderStatusSelector';

const renderComponent = () => {
  const onChange = vi.fn();
  render(
    <Theme>
      <OrderStatusSelector onChange={onChange} />
    </Theme>,
  );
  return {
    button: screen.getByRole('combobox'),
    getOptions: async () => screen.getAllByRole('option'),
    user: userEvent.setup(),
    onChange,
    getOption: (label: RegExp) => screen.findByRole('option', { name: label }),
  };
};

describe('OrderStatusSelector', () => {
  it('should render new as the default value', () => {
    const { button } = renderComponent();
    expect(button).toHaveTextContent(/new/i);
  });
  it('should render correct status', async () => {
    const { button, getOptions, user } = renderComponent();
    await user.click(button);

    const options = await getOptions();
    expect(options).toHaveLength(3);

    const labels = options.map((option) => option.textContent);
    expect(labels).toEqual(['New', 'Processed', 'Fulfilled']);
  });

  it.each([
    {
      label: /processed/i,
      value: 'processed',
    },
    {
      label: /fulfilled/i,
      value: 'fulfilled',
    },
  ])(
    'should call onChange with $value when $label is selected',
    async ({ label, value }) => {
      const { button, user, onChange, getOption } = renderComponent();
      await user.click(button);
      const options = await getOption(label);
      await user.click(options);

      expect(onChange).toHaveBeenCalledWith(value);
    },
  );

  it('should call onChange with "new"  when the New option is selected', async () => {
    const { button, user, onChange, getOption } = renderComponent();
    await user.click(button);

    const processedOption = await getOption(/processed/i);
    await user.click(processedOption);

    await user.click(button);
    const newOption = await getOption(/new/i);
    await user.click(newOption);

    expect(onChange).toHaveBeenCalledWith('new');
  });
});
