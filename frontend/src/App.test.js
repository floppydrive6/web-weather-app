// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import {render} from '@testing-library/react';
import App from './App';

jest.mock('leaflet');

it('renders circle message', () => {
  const {getByText} = render(<App/>);
  expect(getByText('circle radius in kilometers:')).toBeInTheDocument();
});
