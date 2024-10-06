import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import TableSkeleton from '@/components/TableSkeleton/TableSkeleton';

describe('TableSkeleton', () => {
  it('renders with correct testid', () => {
    render(<TableSkeleton />);
    expect(screen.getByTestId('event-table-skeleton')).toBeInTheDocument();
  });

  it('has animate-pulse class for loading animation', () => {
    render(<TableSkeleton />);
    const skeleton = screen.getByTestId('event-table-skeleton');
    expect(skeleton).toHaveClass('animate-pulse');
  });

  it('renders a table with header and body', () => {
    render(<TableSkeleton />);
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(table.querySelector('thead')).toBeInTheDocument();
    expect(table.querySelector('tbody')).toBeInTheDocument();
  });

  it('renders correct number of header columns', () => {
    render(<TableSkeleton />);
    const headerCells = screen.getAllByRole('columnheader');
    expect(headerCells).toHaveLength(6);
  });

  it('renders 20 skeleton rows', () => {
    render(<TableSkeleton />);
    const rows = screen.getAllByRole('row');
    // 21 because there's 1 header row and 20 body rows
    expect(rows).toHaveLength(21);
  });

  it('renders correct number of cells in each row', () => {
    render(<TableSkeleton />);
    const firstDataRow = screen.getAllByRole('row')[1]; // 0 is header, 1 is first data row
    const cells = within(firstDataRow).getAllByRole('cell');
    expect(cells).toHaveLength(6);
  });

  it('applies correct styles to the skeleton', () => {
    render(<TableSkeleton />);
    const skeleton = screen.getByTestId('event-table-skeleton');
    expect(skeleton).toHaveClass('overflow-x-auto rounded-lg container-shadow');
  });

  it('renders skeleton blocks for content', () => {
    render(<TableSkeleton />);
    const firstDataRow = screen.getAllByRole('row')[1]; // 0 is header, 1 is first data row
    const skeletonBlocks = within(firstDataRow).getAllByRole('cell').flatMap(cell => 
      Array.from(cell.querySelectorAll('div[class*="bg-gray-400"]'))
    );
    expect(skeletonBlocks.length).toBeGreaterThan(0);
  });
});