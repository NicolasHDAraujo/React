import { render, screen } from '@testing-library/react';

import { Posts } from '.';

const props = {
  posts: [
    {
      id: 1,
      title: 'title',
      body: 'body',
      cover: 'img/img.png',
    },
    {
      id: 2,
      title: 'title 2',
      body: 'body 2',
      cover: 'img/img2.png',
    },
    {
      id: 1,
      title: 'title 3',
      body: 'body 3',
      cover: 'img/img3.png',
    },
  ],
};

describe('<Posts />', () => {
  it('should render posts', () => {
    render(<Posts {...props} />);

    expect(screen.getAllRole('heading', { name: /title/i })).toHaveLength(3);
    expect(screen.getAllRole('img', { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByText(/body/i)).toHaveLength(3);
    expect(screen.getAllRole('img', { name: /title 3/i })).toHaveAttribute('src', 'img/img3.png');
  });

  it('should not render post', () => {
    render(<Posts />);
    expect(screen.queryAllByRole('heading', { name: /title/i })).toHaveLength(0);
  });

  it('should match snapshot', () => {
    const { container } = render(<Posts {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
