import React, { useState } from "react";
import Peep from "react-peeps";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectItem,
    SelectSeparator,
} from "@/components/ui/select";

const accessoryOptions = [
    "None",
    "Eyepatch",
    "GlassAviator",
    "GlassButterfly",
    "GlassButterflyOutline",
    "GlassClubmaster",
    "GlassRound",
    "GlassRoundThick",
    "SunglassClubmaster",
    "SunglassWayfarer"
];

const bodyOptions = [
    "ArmsCrossed",
    "BlazerBlackTee",
    "ButtonShirt",
    "Coffee",
    "Device",
    "DotJacket",
    "Dress",
    "Explaining",
    "FurJacket",
    "Gaming",
    "Geek",
    "Hoodie",
    "Killer",
    "Paper",
    "PocketShirt",
    "PointingUp",
    "PoloSweater",
    "Selena",
    "Shirt",
    "ShirtCoat",
    "ShirtFilled",
    "SportyShirt",
    "StripedShirt",
    "Sweater",
    "SweaterDots",
    "Thunder",
    "Turtleneck",
    "Whatever",
    "Bike",
    "ClosedLegBW",
    "ClosedLegWB",
    "CrossedLegs",
    "HandsBackBW",
    "HandsBackWB",
    "MediumBW",
    "MediumWB",
    "OneLegUpBW",
    "OneLegUpWB",
    "Wheelchair",
    "BlazerBW",
    "BlazerPantsBW",
    "BlazerPantsWB",
    "BlazerWB",
    "CrossedArmsBW",
    "CrossedArmsWB",
    "Doc",
    "DocProtectiveClothe",
    "DocStethoscope",
    "EasingBW",
    "EasingWB",
    "PointingFingerBW",
    "PointingFingerWB",
    "PolkaDots",
    "RestingBW",
    "RestingWB",
    "RoboDanceBW",
    "RoboDanceOutline",
    "RoboDanceWB",
    "ShirtBW",
    "ShirtPantsBW",
    "ShirtPantsWB",
    "ShirtWB",
    "WalkingBW",
    "WalkingFilled",
    "WalkingWB"
];

const faceOptions = [
    "Angry",
    "Awe",
    "Blank",
    "Calm",
    "CalmNM",
    "Cheeky",
    "CheersNM",
    "Concerned",
    "ConcernedFear",
    "Contempt",
    "Cute",
    "Cyclops",
    "Driven",
    "EatingHappy",
    "Explaining",
    "EyesClosed",
    "Fear",
    "Hectic",
    "LoveGrin",
    "LoveGrinTeeth",
    "Monster",
    "OldAged",
    "Rage",
    "Serious",
    "Smile",
    "SmileBig",
    "SmileLol",
    "SmileNM",
    "SmileTeeth",
    "Solemn",
    "Suspicious",
    "Tired",
    "VeryAngry"
];

const facialHairOptions = [
    "Chin",
    "Dali",
    "Full",
    "FullMajestic",
    "FullMedium",
    "Goatee",
    "GoateeCircle",
    "GrayFull",
    "Handlebars",
    "Imperial",
    "MajesticHandlebars",
    "MoustacheThin",
    "None",
    "Painters",
    "PaintersFilled",
    "Swashbuckler",
    "Yosemite"
];

const hairOptions = [
    "Afro",
    "Bald",
    "BaldSides",
    "BaldTop",
    "Bangs",
    "BangsFilled",
    "BantuKnots",
    "Beanie",
    "Bear",
    "Bun",
    "BunCurly",
    "BunFancy",
    "Buns",
    "CornRows",
    "CornRowsFilled",
    "DocBouffant",
    "DocShield",
    "DocSurgery",
    "FlatTop",
    "FlatTopLong",
    "GrayBun",
    "GrayMedium",
    "GrayShort",
    "HatHip",
    "Hijab",
    "Long",
    "LongAfro",
    "LongBangs",
    "LongCurly",
    "Medium",
    "MediumBangs",
    "MediumBangsFilled",
    "MediumLong",
    "MediumShade",
    "MediumShort",
    "MediumStraight",
    "Mohawk",
    "MohawkDino",
    "Pomp",
    "ShavedRight",
    "ShavedSides",
    "ShavedWavy",
    "Short",
    "ShortCurly",
    "ShortMessy",
    "ShortScratch",
    "ShortVolumed",
    "ShortWavy",
    "Turban",
    "Twists",
    "TwistsVolumed"
];

export default function Home() {
    const [accessory, setAccessory] = useState("SunglassWayfarer");
    const [body, setBody] = useState("BlazerPantsWB");
    const [face, setFace] = useState("Contempt");
    const [facialHair, setFacialHair] = useState("None");
    const [hair, setHair] = useState("Mohawk");

    const properties = {
        accessory,
        body,
        face,
        facialHair,
        hair,
    };

    return (
        <main className={`flex min-h-screen flex-col items-center space-y-9 p-24`}>
            <h1 className="text-3xl font-black">genpeeps</h1>
            <p>
                Automatically generate Notion styled profiles/avatars. Based on
                openpeeps and opeep.fun
            </p>
            <div className="flex flex-col space-y-4">
                <div className="w-[200px]">
                    <Peep {...properties} />
                </div>
                <Select value={accessory} onValueChange={setAccessory}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select accessory" />
                    </SelectTrigger>
                    <SelectContent>
                        {accessoryOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={body} onValueChange={setBody}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select body" />
                    </SelectTrigger>
                    <SelectContent>
                        {bodyOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={face} onValueChange={setFace}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select face" />
                    </SelectTrigger>
                    <SelectContent>
                        {faceOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={facialHair} onValueChange={setFacialHair}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select facial hair" />
                    </SelectTrigger>
                    <SelectContent>
                        {facialHairOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={hair} onValueChange={setHair}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select hair" />
                    </SelectTrigger>
                    <SelectContent>
                        {hairOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                                {option}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

            </div>
        </main>
    );
}
