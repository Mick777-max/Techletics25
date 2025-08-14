const { render, screen } = require('@testing-library/react');
const Home = require('../app/(notprotected)/home');

test('hello world!', () => {
	render(<Home />);
	const linkElement = screen.getByText(/welcome/i);
	expect(linkElement).toBeInTheDocument();
});