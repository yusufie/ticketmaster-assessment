import { act, renderHook } from '@testing-library/react';
import { useEventStore } from '@/stores/eventStore';

describe('useEventStore', () => {
  beforeEach(() => {
    // Clear the store before each test
    act(() => {
      useEventStore.getState().setCurrentPage(1);
      useEventStore.getState().setTotalPages(1);
      useEventStore.getState().setSearchKeyword('');
      useEventStore.getState().setSortOption('relevance,desc');
    });
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useEventStore());
    expect(result.current.currentPage).toBe(1);
    expect(result.current.totalPages).toBe(1);
    expect(result.current.searchKeyword).toBe('');
    expect(result.current.sortOption).toBe('relevance,desc');
  });

  it('should update currentPage', () => {
    const { result } = renderHook(() => useEventStore());
    act(() => {
      result.current.setCurrentPage(2);
    });
    expect(result.current.currentPage).toBe(2);
  });

  it('should update totalPages', () => {
    const { result } = renderHook(() => useEventStore());
    act(() => {
      result.current.setTotalPages(10);
    });
    expect(result.current.totalPages).toBe(10);
  });

  it('should update searchKeyword', () => {
    const { result } = renderHook(() => useEventStore());
    act(() => {
      result.current.setSearchKeyword('concert');
    });
    expect(result.current.searchKeyword).toBe('concert');
  });

  it('should update sortOption', () => {
    const { result } = renderHook(() => useEventStore());
    act(() => {
      result.current.setSortOption('date,asc');
    });
    expect(result.current.sortOption).toBe('date,asc');
  });

  it('should maintain separate states for different properties', () => {
    const { result } = renderHook(() => useEventStore());
    act(() => {
      result.current.setCurrentPage(3);
      result.current.setTotalPages(5);
      result.current.setSearchKeyword('festival');
      result.current.setSortOption('name,desc');
    });
    expect(result.current.currentPage).toBe(3);
    expect(result.current.totalPages).toBe(5);
    expect(result.current.searchKeyword).toBe('festival');
    expect(result.current.sortOption).toBe('name,desc');
  });
});