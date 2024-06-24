// src/actions/weatherActions.js

import axios from 'axios';
import axiosInstance from '../config/axiosConfig';

// Action types
export const FETCH_WEATHER_REQUEST = 'FETCH_WEATHER_REQUEST';
export const FETCH_WEATHER_SUCCESS = 'FETCH_WEATHER_SUCCESS';
export const FETCH_WEATHER_FAILURE = 'FETCH_WEATHER_FAILURE';

export const POST_WEATHER_REQUEST = 'POST_WEATHER_REQUEST';
export const POST_WEATHER_SUCCESS = 'POST_WEATHER_SUCCESS';
export const POST_WEATHER_FAILURE = 'POST_WEATHER_FAILURE';

// Synchronous action creators
export const fetchWeatherRequest = () => ({
  type: FETCH_WEATHER_REQUEST,
});

export const fetchWeatherSuccess = data => ({
  type: FETCH_WEATHER_SUCCESS,
  payload: data,
});

export const fetchWeatherFailure = error => ({
  type: FETCH_WEATHER_FAILURE,
  payload: error,
});

// Thunk action creators
export const fetchWeather = () => {
  console.log('came here :>> ');
  return async dispatch => {
    dispatch(fetchWeatherRequest());
    try {
      const response = await axios.get('http://192.168.1.103:3000/weather');
      dispatch(fetchWeatherSuccess(response.data));
    } catch (error) {
      dispatch(fetchWeatherFailure(error.message));
    }
  };
};
