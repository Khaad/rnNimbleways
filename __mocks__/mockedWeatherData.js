const mockedWeatherData = {
  data: {
    timelines: [
      {
        timestep: '1h',
        startTime: '2023-06-24T00:00:00Z',
        endTime: '2023-06-24T23:00:00Z',
        intervals: [
          {
            startTime: '2023-06-24T00:00:00Z',
            values: {
              windSpeed: 5,
              temperature: 22,
              temperatureApparent: 21,
            },
          },
          {
            startTime: '2023-06-24T01:00:00Z',
            values: {
              windSpeed: 7,
              temperature: 21,
              temperatureApparent: 20,
            },
          },
          // Add more intervals as needed
        ],
      },
      // You can add more timelines if needed
    ],
  },
  warnings: [
    {
      code: 246009,
      type: 'Missing Time Range',
      message:
        'The timestep is not supported in full for the time range requested.',
      meta: {
        timestep: '1h',
        from: 'now',
        to: '+1m',
      },
    },
  ],
};

export default mockedWeatherData;
