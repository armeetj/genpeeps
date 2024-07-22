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
    <main className={`flex min-h-screen flex-col items-center space-y-9 p-24`}>
      <h1 className="font-black text-3xl">genpeeps</h1>
      <p>
        Automatically generate Notion styled profiles/avatars. Based on
        openpeeps and opeep.fun
      </p>
      <div className="w-[200px]">
        <Peep {...properties} />
      </div>
    </main>
  );
}
