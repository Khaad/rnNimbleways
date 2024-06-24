import weatherReducer from './weatherReducer';
import {
  FETCH_WEATHER_REQUEST,
  FETCH_WEATHER_SUCCESS,
  FETCH_WEATHER_FAILURE,
} from '../actions/weatherActions';
import mockedWeatherData from '../../__mocks__/mockedWeatherData';

describe('weatherReducer', () => {
  it('should return the initial state', () => {
    expect(weatherReducer(undefined, {})).toEqual({
      loading: false,
      data: null,
      error: null,
    });
  });

  it('should handle FETCH_WEATHER_REQUEST', () => {
    expect(weatherReducer(undefined, {type: FETCH_WEATHER_REQUEST})).toEqual({
      loading: true,
      data: null,
      error: null,
    });
  });

  it('should handle FETCH_WEATHER_SUCCESS', () => {
    const payload = mockedWeatherData;
    expect(
      weatherReducer(undefined, {type: FETCH_WEATHER_SUCCESS, payload}),
    ).toEqual({
      loading: false,
      data: payload,
      error: null,
    });
  });

  it('should handle FETCH_WEATHER_FAILURE', () => {
    const error = 'Request failed';
    expect(
      weatherReducer(undefined, {type: FETCH_WEATHER_FAILURE, payload: error}),
    ).toEqual({
      loading: false,
      data: null,
      error,
    });
  });
});
