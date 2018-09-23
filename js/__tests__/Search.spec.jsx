import React from 'react';
import { shallow } from 'enzyme';
import preload from '../../data.json';
import Search from '../Search';
import ShowCard from '../ShowCard';

test('Search renders correctly', () => {
  const component = shallow(<Search shows={preload.shows} />);
  expect(component).toMatchSnapshot();
});

test('Search should render correct amount of shows', () => {
  const component = shallow(<Search shows={preload.shows} />);
  expect(component.find(ShowCard).length).toEqual(preload.shows.length);
});

test('Search should render correct amount of shows based on search term', () => {
  const component = shallow(<Search shows={preload.shows} />);
  const searchWord = 'black';

  component.find('input').simulate('change', { target: { value: searchWord } });

  const showCount = preload.shows.filter(show => {
    const showCardText = `${show.title} ${show.description}`.toUpperCase();

    return showCardText.indexOf(searchWord.toUpperCase()) >= 0;
  }).length;

  expect(component.find(ShowCard).length).toEqual(showCount);
});
