import TimeOfDay from "@/components/TimeOfDay";
import WeatherWidget from "@/components/WeatherWidget";

export default function Home() {
  return (
    <>
      <p className="font-bold text-ctp-text text-[8cqw] lg:text-8xl xl:text-9xl">
        ~ Good <TimeOfDay /> ~
      </p>

      <WeatherWidget />
    </>
  );
}
