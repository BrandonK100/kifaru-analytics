import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import StatCard from './StatCard';

describe('StatCard', () => {
  it('renders label and value correctly', () => {
    render(<StatCard label="Test" value={42} />);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('renders delta with up arrow when direction is up', () => {
    render(<StatCard label="T" value={1} delta={{ direction: 'up', text: '5%' }} />);
    expect(screen.getByText(/↑/)).toBeInTheDocument();
    expect(screen.getByText(/5%/)).toBeInTheDocument();
  });

  it('renders delta with down arrow when direction is down', () => {
    render(<StatCard label="T" value={1} delta={{ direction: 'down', text: '2%' }} />);
    expect(screen.getByText(/↓/)).toBeInTheDocument();
    expect(screen.getByText(/2%/)).toBeInTheDocument();
  });

  it('renders skeleton when loading prop is true', () => {
    render(<StatCard label="T" value={1} loading />);
    // skeleton is a div with aria-hidden, check that the label is not present
    expect(screen.queryByText('T')).not.toBeInTheDocument();
  });

  it('does not render delta when delta prop is undefined', () => {
    render(<StatCard label="T" value={1} />);
    expect(screen.queryByText(/↑|↓/)).not.toBeInTheDocument();
  });
});
