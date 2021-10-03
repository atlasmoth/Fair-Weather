const initialCities = [
  {
    coord: {
      lon: 139.6917,
      lat: 35.6895,
    },
    weather: [
      {
        id: 801,
        main: "Clouds",
        description: "few clouds",
        icon: "02d",
      },
    ],
    base: "stations",
    main: {
      temp: 23.64,
      feels_like: 23.73,
      temp_min: 21.74,
      temp_max: 25.97,
      pressure: 1023,
      humidity: 64,
    },
    visibility: 10000,
    wind: {
      speed: 1.79,
      deg: 331,
      gust: 5.36,
    },
    clouds: {
      all: 20,
    },
    dt: 1633221421,
    sys: {
      type: 2,
      id: 2038398,
      country: "JP",
      sunrise: 1633207041,
      sunset: 1633249390,
    },
    timezone: 32400,
    id: 1850144,
    name: "Tokyo",
    cod: 200,
  },
  {
    coord: {
      lon: 77.2167,
      lat: 28.6667,
    },
    weather: [
      {
        id: 701,
        main: "Mist",
        description: "mist",
        icon: "50n",
      },
    ],
    base: "stations",
    main: {
      temp: 27.05,
      feels_like: 31.32,
      temp_min: 27.05,
      temp_max: 27.05,
      pressure: 1007,
      humidity: 94,
    },
    visibility: 3000,
    wind: {
      speed: 2.06,
      deg: 230,
    },
    clouds: {
      all: 40,
    },
    dt: 1633221353,
    sys: {
      type: 1,
      id: 9165,
      country: "IN",
      sunrise: 1633221898,
      sunset: 1633264514,
    },
    timezone: 19800,
    id: 1273294,
    name: "Delhi",
    cod: 200,
  },
  {
    coord: {
      lon: 121.4581,
      lat: 31.2222,
    },
    weather: [
      {
        id: 500,
        main: "Rain",
        description: "light rain",
        icon: "10d",
      },
    ],
    base: "stations",
    main: {
      temp: 26.51,
      feels_like: 26.51,
      temp_min: 25.93,
      temp_max: 26.92,
      pressure: 1016,
      humidity: 72,
    },
    visibility: 10000,
    wind: {
      speed: 7,
      deg: 170,
    },
    rain: {
      "1h": 0.15,
    },
    clouds: {
      all: 0,
    },
    dt: 1633221472,
    sys: {
      type: 1,
      id: 9659,
      country: "CN",
      sunrise: 1633211326,
      sunset: 1633253855,
    },
    timezone: 28800,
    id: 1796236,
    name: "Shanghai",
    cod: 200,
  },
  {
    coord: {
      lon: -46.6361,
      lat: -23.5475,
    },
    weather: [
      {
        id: 801,
        main: "Clouds",
        description: "few clouds",
        icon: "02n",
      },
    ],
    base: "stations",
    main: {
      temp: 20.77,
      feels_like: 21.23,
      temp_min: 17.87,
      temp_max: 23.03,
      pressure: 1017,
      humidity: 89,
    },
    visibility: 10000,
    wind: {
      speed: 1.54,
      deg: 10,
    },
    clouds: {
      all: 20,
    },
    dt: 1633221219,
    sys: {
      type: 1,
      id: 8394,
      country: "BR",
      sunrise: 1633164338,
      sunset: 1633208749,
    },
    timezone: -10800,
    id: 3448439,
    name: "São Paulo",
    cod: 200,
  },
  {
    coord: {
      lon: -99.1277,
      lat: 19.4285,
    },
    weather: [
      {
        id: 803,
        main: "Clouds",
        description: "broken clouds",
        icon: "04n",
      },
    ],
    base: "stations",
    main: {
      temp: 20.61,
      feels_like: 20.01,
      temp_min: 13.83,
      temp_max: 20.96,
      pressure: 1023,
      humidity: 49,
    },
    visibility: 10000,
    wind: {
      speed: 4.92,
      deg: 120,
    },
    clouds: {
      all: 75,
    },
    dt: 1633221299,
    sys: {
      type: 2,
      id: 47729,
      country: "MX",
      sunrise: 1633177645,
      sunset: 1633220632,
    },
    timezone: -18000,
    id: 3530597,
    name: "Mexico City",
    cod: 200,
  },
  {
    coord: {
      lon: 31.2497,
      lat: 30.0626,
    },
    weather: [
      {
        id: 803,
        main: "Clouds",
        description: "broken clouds",
        icon: "04n",
      },
    ],
    base: "stations",
    main: {
      temp: 23.73,
      feels_like: 23.33,
      temp_min: 21.9,
      temp_max: 23.73,
      pressure: 1014,
      humidity: 45,
    },
    visibility: 10000,
    wind: {
      speed: 3.6,
      deg: 320,
    },
    clouds: {
      all: 75,
    },
    dt: 1633221247,
    sys: {
      type: 2,
      id: 2037059,
      country: "EG",
      sunrise: 1633232962,
      sunset: 1633275509,
    },
    timezone: 7200,
    id: 360630,
    name: "Cairo",
    cod: 200,
  },
  {
    coord: {
      lon: 72.8479,
      lat: 19.0144,
    },
    weather: [
      {
        id: 721,
        main: "Haze",
        description: "haze",
        icon: "50n",
      },
    ],
    base: "stations",
    main: {
      temp: 26.99,
      feels_like: 31.8,
      temp_min: 26.99,
      temp_max: 26.99,
      pressure: 1007,
      humidity: 100,
    },
    visibility: 3000,
    wind: {
      speed: 0,
      deg: 0,
    },
    clouds: {
      all: 40,
    },
    dt: 1633221389,
    sys: {
      type: 1,
      id: 9052,
      country: "IN",
      sunrise: 1633222771,
      sunset: 1633265738,
    },
    timezone: 19800,
    id: 1275339,
    name: "Mumbai",
    cod: 200,
  },
  {
    coord: {
      lon: 116.3972,
      lat: 39.9075,
    },
    weather: [
      {
        id: 804,
        main: "Clouds",
        description: "overcast clouds",
        icon: "04d",
      },
    ],
    base: "stations",
    main: {
      temp: 19.9,
      feels_like: 20.22,
      temp_min: 17.9,
      temp_max: 19.94,
      pressure: 1009,
      humidity: 87,
      sea_level: 1009,
      grnd_level: 1004,
    },
    visibility: 6442,
    wind: {
      speed: 1.8,
      deg: 3,
      gust: 3.83,
    },
    clouds: {
      all: 100,
    },
    dt: 1633221478,
    sys: {
      type: 2,
      id: 2021025,
      country: "CN",
      sunrise: 1633212731,
      sunset: 1633254879,
    },
    timezone: 28800,
    id: 1816670,
    name: "Beijing",
    cod: 200,
  },
  {
    coord: {
      lon: 90.4074,
      lat: 23.7104,
    },
    weather: [
      {
        id: 721,
        main: "Haze",
        description: "haze",
        icon: "50d",
      },
    ],
    base: "stations",
    main: {
      temp: 26.99,
      feels_like: 29.53,
      temp_min: 26.99,
      temp_max: 26.99,
      pressure: 1007,
      humidity: 78,
    },
    visibility: 3500,
    wind: {
      speed: 4.12,
      deg: 190,
    },
    clouds: {
      all: 75,
    },
    dt: 1633221312,
    sys: {
      type: 1,
      id: 9145,
      country: "BD",
      sunrise: 1633218639,
      sunset: 1633261443,
    },
    timezone: 21600,
    id: 1185241,
    name: "Dhaka",
    cod: 200,
  },
  {
    coord: {
      lon: 135.5022,
      lat: 34.6937,
    },
    weather: [
      {
        id: 801,
        main: "Clouds",
        description: "few clouds",
        icon: "02d",
      },
    ],
    base: "stations",
    main: {
      temp: 23.6,
      feels_like: 23.63,
      temp_min: 22.9,
      temp_max: 24.47,
      pressure: 1023,
      humidity: 62,
    },
    visibility: 10000,
    wind: {
      speed: 0.51,
      deg: 0,
    },
    clouds: {
      all: 20,
    },
    dt: 1633221478,
    sys: {
      type: 1,
      id: 8032,
      country: "JP",
      sunrise: 1633208025,
      sunset: 1633250416,
    },
    timezone: 32400,
    id: 1853909,
    name: "Osaka",
    cod: 200,
  },
  {
    coord: {
      lon: -74.006,
      lat: 40.7143,
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01n",
      },
    ],
    base: "stations",
    main: {
      temp: 18.94,
      feels_like: 18.59,
      temp_min: 14.11,
      temp_max: 21.79,
      pressure: 1018,
      humidity: 65,
    },
    visibility: 10000,
    wind: {
      speed: 1.79,
      deg: 214,
      gust: 2.68,
    },
    clouds: {
      all: 1,
    },
    dt: 1633221257,
    sys: {
      type: 2,
      id: 2008776,
      country: "US",
      sunrise: 1633172019,
      sunset: 1633214203,
    },
    timezone: -14400,
    id: 5128581,
    name: "New York",
    cod: 200,
  },
  {
    coord: {
      lon: 67.0822,
      lat: 24.9056,
    },
    weather: [
      {
        id: 802,
        main: "Clouds",
        description: "scattered clouds",
        icon: "03n",
      },
    ],
    base: "stations",
    main: {
      temp: 26.9,
      feels_like: 30.35,
      temp_min: 26.9,
      temp_max: 26.9,
      pressure: 1008,
      humidity: 89,
    },
    visibility: 6000,
    wind: {
      speed: 2.57,
      deg: 260,
    },
    clouds: {
      all: 40,
    },
    dt: 1633221277,
    sys: {
      type: 1,
      id: 7576,
      country: "PK",
      sunrise: 1633224260,
      sunset: 1633267015,
    },
    timezone: 18000,
    id: 1174872,
    name: "Karachi",
    cod: 200,
  },
  {
    coord: {
      lon: -58.3772,
      lat: -34.6132,
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01n",
      },
    ],
    base: "stations",
    main: {
      temp: 15.67,
      feels_like: 15.15,
      temp_min: 11.63,
      temp_max: 16.85,
      pressure: 1012,
      humidity: 71,
    },
    visibility: 10000,
    wind: {
      speed: 1.54,
      deg: 260,
    },
    clouds: {
      all: 0,
    },
    dt: 1633221411,
    sys: {
      type: 1,
      id: 8224,
      country: "AR",
      sunrise: 1633166902,
      sunset: 1633211820,
    },
    timezone: -10800,
    id: 3435910,
    name: "Buenos Aires",
    cod: 200,
  },
  {
    coord: {
      lon: 106.5528,
      lat: 29.5628,
    },
    weather: [
      {
        id: 800,
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    base: "stations",
    main: {
      temp: 28.76,
      feels_like: 31.71,
      temp_min: 28.46,
      temp_max: 31.72,
      pressure: 972,
      humidity: 67,
    },
    visibility: 10000,
    wind: {
      speed: 0.89,
      deg: 315,
      gust: 0.89,
    },
    clouds: {
      all: 0,
    },
    dt: 1633221353,
    sys: {
      type: 2,
      id: 2032683,
      country: "CN",
      sunrise: 1633214872,
      sunset: 1633257462,
    },
    timezone: 28800,
    id: 1814906,
    name: "Chongqing",
    cod: 200,
  },
  {
    coord: {
      lon: 28.9833,
      lat: 41.0351,
    },
    weather: [
      {
        id: 802,
        main: "Clouds",
        description: "scattered clouds",
        icon: "03n",
      },
    ],
    base: "stations",
    main: {
      temp: 14.46,
      feels_like: 13.84,
      temp_min: 13.09,
      temp_max: 17.26,
      pressure: 1022,
      humidity: 72,
    },
    visibility: 10000,
    wind: {
      speed: 2.06,
      deg: 50,
    },
    clouds: {
      all: 40,
    },
    dt: 1633221373,
    sys: {
      type: 1,
      id: 6970,
      country: "TR",
      sunrise: 1633233753,
      sunset: 1633275806,
    },
    timezone: 10800,
    id: 745042,
    name: "Istanbul",
    cod: 200,
  },
];
export default initialCities;
