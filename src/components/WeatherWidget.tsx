"use client";

import { useEffect, useState } from "react";
import useSWR from "swr";

function Skeleton() {
  return (
    <>
      <div className="flex gap-3 items-center">
        <div className="bg-ctp-surface0 rounded-full w-12 h-12 m-2 animate-pulse"></div>
        <div className="flex items-center flex-col gap-3">
          <div className="w-25 h-5 rounded-md bg-ctp-surface0 animate-pulse"></div>
          <div className="flex gap-3 items-center">
            <div className="flex flex-col gap-3">
              <div className="w-32 h-4 rounded-md bg-ctp-surface0 animate-pulse"></div>
              <div className="w-36 h-4 rounded-md bg-ctp-surface0 animate-pulse"></div>
              <div className="w-32 h-4 rounded-md bg-ctp-surface0 animate-pulse"></div>
              <div className="w-40 h-4 rounded-md bg-ctp-surface0 animate-pulse"></div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-36 h-4 rounded-md bg-ctp-surface0 animate-pulse"></div>
              <div className="flex gap-2">
                <div className="w-10 h-4 rounded-md bg-ctp-surface0 animate-pulse"></div>
                <div className="w-4 h-4 rounded-full bg-ctp-surface0 animate-pulse"></div>
              </div>
              <div className="w-40 h-4 rounded-md bg-ctp-surface0 animate-pulse"></div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="w-44 h-4 rounded-md bg-ctp-surface0 animate-pulse"></div>
              <div className="w-54 h-4 rounded-md bg-ctp-surface0 animate-pulse"></div>
              <div className="w-52 h-4 rounded-md bg-ctp-surface0 animate-pulse"></div>
              <div className="w-40 h-4 rounded-md bg-ctp-surface0 animate-pulse"></div>
            </div>
          </div>
          <div className="w-50 h-5 rounded-md bg-ctp-surface0 animate-pulse"></div>
        </div>
        <button className="p-2 rounded-md cursor-not-allowed">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="fill-ctp-surface0 w-8 h-8 max-w-8 max-h-8 animate-pulse"
          >
            <path d="M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z" />
          </svg>
        </button>
      </div>
    </>
  );
}

const WIND_DIR_TO_CLASS: { [dir: string]: string } = {
  N: "towards-0-deg",
  NNE: "towards-23-deg",
  NE: "towards-45-deg",
  ENE: "towards-68-deg",
  E: "towards-90-deg",
  ESE: "towards-113-deg",
  SE: "towards-135-deg",
  SSE: "towards-158-deg",
  S: "towards-180-deg",
  SSW: "towards-203-deg",
  SW: "towards-225-deg",
  WSW: "towards-248-deg",
  W: "towards-270-deg",
  WNW: "towards-293-deg",
  NW: "towards-313-deg",
  NNW: "towards-336-deg",
};

const CONDITION_TO_ICON: { [cond: number]: [string, string] } = {
  1000: ["wi-day-sunny", "wi-night-clear"],
  1003: ["wi-day-cloudy", "wi-night-alt-cloudy"],
  1006: ["wi-day-cloudy", "wi-night-alt-cloudy"],
  1009: ["wi-cloud", "wi-cloud"],
  1030: ["wi-day-fog", "wi-night-fog"],
  1063: ["wi-day-rain", "wi-night-alt-rain"],
  1066: ["wi-day-snow", "wi-night-alt-snow"],
  1069: ["wi-day-sleet", "wi-night-alt-sleet"],
  1072: ["wi-day-rain-mix", "wi-night-alt-rain-mix"],
  1087: ["wi-day-lightning", "wi-night-alt-lightning"],
  1114: ["wi-day-snow-wind", "wi-night-alt-snow-wind"],
  1117: ["wi-snow-wind", "wi-snow-wind"],
  1135: ["wi-fog", "wi-fog"],
  1147: ["wi-fog", "wi-fog"],
  1150: ["wi-day-sprinkle", "wi-night-alt-sprinkle"],
  1153: ["wi-sprinkle", "wi-sprinkle"],
  1168: ["wi-day-rain-mix", "wi-night-alt-rain-mix"],
  1171: ["wi-rain-mix", "wi-rain-mix"],
  1180: ["wi-day-rain", "wi-night-alt-rain"],
  1183: ["wi-rain", "wi-rain"],
  1186: ["wi-rain", "wi-rain"],
  1189: ["wi-rain", "wi-rain"],
  1192: ["wi-rain", "wi-rain"],
  1195: ["wi-rain", "wi-rain"],
  1198: ["wi-rain-mix", "wi-rain-mix"],
  1201: ["wi-rain-mix", "wi-rain-mix"],
  1204: ["wi-sleet", "wi-sleet"],
  1207: ["wi-sleet", "wi-sleet"],
  1210: ["wi-day-snow", "wi-night-alt-snow"],
  1213: ["wi-snow", "wi-snow"],
  1216: ["wi-snow", "wi-snow"],
  1219: ["wi-snow", "wi-snow"],
  1222: ["wi-snow", "wi-snow"],
  1225: ["wi-snow", "wi-snow"],
  1237: ["wi-hail", "wi-hail"],
  1240: ["wi-showers", "wi-showers"],
  1243: ["wi-showers", "wi-showers"],
  1246: ["wi-showers", "wi-showers"],
  1249: ["wi-sleet", "wi-sleet"],
  1252: ["wi-sleet", "wi-sleet"],
  1255: ["wi-snow", "wi-snow"],
  1258: ["wi-snow", "wi-snow"],
  1261: ["wi-hail", "wi-hail"],
  1264: ["wi-hail", "wi-hail"],
  1273: ["wi-day-storm-showers", "wi-night-alt-storm-showers"],
  1276: ["wi-thunderstorm", "wi-thunderstorm"],
  1279: ["wi-day-snow-thunderstorm", "wi-night-alt-snow-thunderstorm"],
  1282: ["wi-snow-thunderstorm", "wi-snow-thunderstorm"],
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function WeatherWidget() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [noLocation, setNoLocation] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      // Retrieve latitude & longitude coordinates from `navigator.geolocation` Web API
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          setLocation({ latitude, longitude });
        },
        () => setNoLocation(true),
      );
    } else {
      setNoLocation(true);
    }
  }, []);

  let { data, error, mutate, isValidating } = useSWR(
    () =>
      location
        ? `/api/get-weather?q=${location?.latitude},${location?.longitude}`
        : null,
    fetcher,
    {
      refreshInterval: 900_000,
    },
  );

  if (noLocation) {
    return (
      <p className="text-ctp-red text-center">
        Unable to get weather data:
        <br />
        Location services denied.
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-ctp-red text-center">Failed to get weather data.</p>
    );
  }

  if (!location) {
    return <Skeleton />;
  }

  if (!data || isValidating) {
    return <Skeleton />;
  }

  return (
    <>
      <div className="text-ctp-text flex gap-3 items-center">
        <i
          className={`wi ${data.current.is_day === 1 ? CONDITION_TO_ICON[data.current.condition.code][0] : CONDITION_TO_ICON[data.current.condition.code][1]} text-3xl p-2`}
        ></i>
        <div className="flex items-center flex-col gap-3">
          <div className="text-ctp-yellow font-bold">{data.location.name}</div>
          <div className="flex gap-3 items-center">
            <div>
              <div>Conditions: {data.current.condition.text}</div>
              <div>Temperature: {Math.round(data.current.temp_c)}°C</div>
              <div>Feels like: {Math.round(data.current.feelslike_c)}°C</div>
              <div>Wind chill: {Math.round(data.current.windchill_c)}°C</div>
            </div>
            <div>
              <div>Wind: {data.current.wind_kph}km/h</div>
              <div>
                {data.current.wind_degree.toString().padStart(3, "0")}°{" "}
                {/* TODO: */}
                <i
                  className={`wi wi-wind ${WIND_DIR_TO_CLASS[data.current.wind_dir]} text-xl`}
                ></i>
              </div>
              <div>Gusts: {data.current.gust_kph}km/h</div>
            </div>
            <div>
              <div>Precipitation: {data.current.precip_mm}mm</div>
              <div>Pressure: {data.current.pressure_mb}hPa</div>
              <div>Cloud Cover: {data.current.cloud}%</div>
              <div>Humidity: {data.current.humidity}%</div>
            </div>
          </div>
          <div className="text-ctp-overlay2">
            Last Updated: {data.current.last_updated}
          </div>
        </div>
        <button
          className="p-2 rounded-md hover:bg-ctp-surface0 cursor-pointer transition-colors active:bg-ctp-surface2"
          onClick={() => {
            mutate();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="fill-ctp-text w-7 h-7 max-w-7 max-h-7"
          >
            <path d="M463.5 224l8.5 0c13.3 0 24-10.7 24-24l0-128c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1c-87.5 87.5-87.5 229.3 0 316.8s229.3 87.5 316.8 0c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0c-62.5 62.5-163.8 62.5-226.3 0s-62.5-163.8 0-226.3c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8l119.5 0z" />
          </svg>
        </button>
      </div>
    </>
  );
}
