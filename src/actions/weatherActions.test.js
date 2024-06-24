import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {
  fetchWeather,
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
} from './weatherActions';
import mockedWeatherData from '../../__mocks__/mockedWeatherData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const axiosMock = new MockAdapter(axios);

describe('weatherActions', () => {
  it('creates FETCH_WEATHER_SUCCESS when fetching weather has been done', () => {
    const data = mockedWeatherData;
    axiosMock.onGet('/weather', {params: {timestep: '1h'}}).reply(200, data);

    const expectedActions = [
      {type: FETCH_WEATHER_REQUEST},
      {type: FETCH_WEATHER_SUCCESS, payload: data},
    ];
    const store = mockStore({weather: {}});

    return store.dispatch(fetchWeather()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it('creates FETCH_WEATHER_FAILURE when fetching weather fails', () => {
    axiosMock.onGet('/weather', {params: {timestep: '1h'}}).reply(500);

    const expectedActions = [
      {type: FETCH_WEATHER_REQUEST},
      {
        type: FETCH_WEATHER_FAILURE,
        payload: 'Request failed with status code 500',
      },
    ];
    const store = mockStore({weather: {}});

    return store.dispatch(fetchWeather()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
