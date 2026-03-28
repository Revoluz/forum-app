/**
 * skenario testing
 *
 * - ThreadItem component
 *   - should display the correct thread title
 *   - should display the correct upvote and downvote counts
createdAt
 */

import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import ThreadItem from './ThreadItem';
import { use } from 'react';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);
const fakeThreadItem = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2021-06-21T07:00:00.000Z',
  ownerId: 'users-1',
  upVotesBy: ['users-2', 'users-3'],
  downVotesBy: ['users-4'],
  totalComments: 0,
  user: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://example.com/avatar.jpg',
  },
};
describe('ThreadItem component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should display the correct thread title', async () => {
    render(<ThreadItem {...fakeThreadItem} />);

    const titleElement = await screen.getByText(fakeThreadItem.title);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(fakeThreadItem.title);
  });

  it('should display the correct upvote and downvote counts', async () => {
    render(<ThreadItem {...fakeThreadItem} />);
    // get element from id
    const voteCountElement = screen.getByTestId('vote-count');
    const voteCount =
      fakeThreadItem.upVotesBy.length - fakeThreadItem.downVotesBy.length;
    expect(voteCountElement).toBeInTheDocument();
    expect(voteCountElement).toHaveTextContent(voteCount.toString());
  });
});
