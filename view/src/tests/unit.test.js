import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../components/Home';
import Rentcarreviews from '../components/Rentcarreviews';
import Rentacar from '../components/Rentacar';

//Unit 1
test('Should render Home Button on navbar', () => {
  render(<Home />);
  const homeBtn = screen.getByText(/home/i);

  expect(homeBtn).toBeInTheDocument();
});

//unit test 2
test('Should render Buy a car on navbar', () => {
  render(<Home />);
  const buyAcar = screen.getByText(/Buy A Car/i);

  expect(buyAcar).toBeInTheDocument();
});

//unit test 3
test('Should render carreview section', () => {
  render(<Rentcarreviews />);
  const reviewSec = screen.getAllByTestId('reviewSec');

  expect(reviewSec).toBeInTheDocument();
});

//unit test 4
test('Should render Rent a car section', () => {
  render(<Rentacar />);
  const rentacar = screen.getByText(/Rent A Car/i);

  expect(rentacar).toBeInTheDocument();
});
