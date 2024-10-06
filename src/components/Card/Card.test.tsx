import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/Card/Card';

describe('Card Components', () => {
  describe('Card', () => {
    it('renders children correctly', () => {
      render(<Card>Test Content</Card>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      const { container } = render(<Card>Test Content</Card>);
      expect(container.firstChild).toHaveClass('overflow-hidden rounded-lg bg-gray-700 container-shadow');
    });

    it('applies custom classes', () => {
      const { container } = render(<Card className="custom-class">Test Content</Card>);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('CardHeader', () => {
    it('renders children correctly', () => {
      render(<CardHeader>Header Content</CardHeader>);
      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      const { container } = render(<CardHeader>Header Content</CardHeader>);
      expect(container.firstChild).toHaveClass('px-6 py-4 border-b border-gray-200');
    });

    it('applies custom classes', () => {
      const { container } = render(<CardHeader className="custom-header">Header Content</CardHeader>);
      expect(container.firstChild).toHaveClass('custom-header');
    });
  });

  describe('CardContent', () => {
    it('renders children correctly', () => {
      render(<CardContent>Content</CardContent>);
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      const { container } = render(<CardContent>Content</CardContent>);
      expect(container.firstChild).toHaveClass('px-6 py-4');
    });

    it('applies custom classes', () => {
      const { container } = render(<CardContent className="custom-content">Content</CardContent>);
      expect(container.firstChild).toHaveClass('custom-content');
    });
  });

  describe('CardTitle', () => {
    it('renders children correctly', () => {
      render(<CardTitle>Card Title</CardTitle>);
      expect(screen.getByText('Card Title')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      const { container } = render(<CardTitle>Card Title</CardTitle>);
      expect(container.firstChild).toHaveClass('text-xl font-semibold');
    });

    it('applies custom classes', () => {
      const { container } = render(<CardTitle className="custom-title">Card Title</CardTitle>);
      expect(container.firstChild).toHaveClass('custom-title');
    });
  });

  describe('Nested Components', () => {
    it('renders nested components correctly', () => {
      render(
        <Card>
          <CardHeader>
            <CardTitle>Nested Title</CardTitle>
          </CardHeader>
          <CardContent>Nested Content</CardContent>
        </Card>
      );

      expect(screen.getByText('Nested Title')).toBeInTheDocument();
      expect(screen.getByText('Nested Content')).toBeInTheDocument();
    });
  });
});