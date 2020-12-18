import { render, screen } from '@testing-library/react';
//import App from './App';
import Welcome from './Components/Welcome';
import About from './Components/About';
import Footer from './Components/Footer';

test('renders the Welcome Header', () => {
    render(<Welcome />);
    const h1Element = screen.getByText(/Welcome/i);
    expect(h1Element).toBeInTheDocument();
});
test('renders the About Info', () => {
    render(<About />);
    const h1AboutElement = screen.getByText(/About Section/i);
    const pAboutElement = screen.getByText(/This is a placeholder/i);
    expect(h1AboutElement).toBeInTheDocument();
    expect(pAboutElement).toBeInTheDocument();
});
test('renders the Footer', () => {
    render(<Footer />);
    const footerElement = screen.getByText(/Footer/i);
    const footerSpan = screen.getByText(/@Dec/i);
    expect(footerElement).toBeInTheDocument();
    expect(footerSpan).toBeInTheDocument();
});
