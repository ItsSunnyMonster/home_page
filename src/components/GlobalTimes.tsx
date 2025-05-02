import CurrentTime from "./CurrentTime";
import Timezone from "./Timezone";

export default function GlobalTimes() {
  return (
    <div className="text-ctp-text flex flex-col items-center gap-3">
      <CurrentTime />
      <div className="flex gap-10">
        <Timezone name="Auckland" timezone="Pacific/Auckland" />{" "}
        <Timezone name="Fuzhou" timezone="Asia/Shanghai" />{" "}
        <Timezone name="Brisbane" timezone="Australia/Brisbane" />{" "}
      </div>
    </div>
  );
}
