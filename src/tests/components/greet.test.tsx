import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import Greet from '../../components/Greet';

describe('Greet', () => {
  it('should render Hello with the name when it is provided', () => {
    render(<Greet name='Oscar' />);
    screen.debug();
  });
});
