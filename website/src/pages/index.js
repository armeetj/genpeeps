import Peep from "react-peeps";
const properties = {
  accessory: "SunglassWayfarer",
  body: "BlazerPantsWB",
  face: "Contempt",
  facialHair: "None",
  hair: "Mohawk",
};

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <div className="w-[200px]">
        <Peep {...properties} />
      </div>
    </main>
  );
}
