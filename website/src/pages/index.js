import React, { useState, useRef } from "react";
import Peep from "react-peeps";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import toImg from "react-svg-to-image"
import { saveAs } from 'file-saver'; // For downloading images
import Link from "next/link";
import { SelectLabel } from "@radix-ui/react-select";

import { savePng, saveSvg } from "@/utils/save";



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
    const [accessory, setAccessory] = useState("GlassRoundThick");
    const [body, setBody] = useState("Shirt");
    const [face, setFace] = useState("Calm");
    const [facialHair, setFacialHair] = useState("Full");
    const [hair, setHair] = useState("Turban");
    const svgRef = useRef(null);

    const properties = {
        accessory,
        body,
        face,
        facialHair,
        hair,
    };

    // const styles = {
    //     peepStyle: {
    //         width: 300,
    //         height: 300,
    //         justifyContent: 'center',
    //         alignSelf: 'center'
    //         view
    //     },
    // }

    const handleDownloadSVG = () => {
        const svgElement = svgRef.current.querySelector('svg');
        saveSvg(svgElement, "avatar.svg");
    }

    const handleDownloadPNG = () => {
        const svgElement = svgRef.current.querySelector('svg');
        savePng(svgElement, "avatar.png", 1);
    }

    const handleCopyReactCode = () => {
        const reactCode = `<Peep ${Object.entries(properties).map(([key, value]) => `${key}="${value}"`).join(' ')} />`;
        navigator.clipboard.writeText(reactCode);
        alert('React code copied to clipboard!');
    };

    return (
        <>
            <div id="header" className="flex justify-center w-full py-1 font-mono text-sm text-white bg-black">
                <p>
                    Made by {" "}
                    <Link href="https://armeet.ca" className="underline">@armeet</Link>
                </p>
            </div>
            <main className="flex flex-col items-center p-4 space-y-6 md:p-10">
                <h1 className="font-mono text-3xl font-black">&lt;genpeeps&gt;</h1>
                <p className="text-center">
                    Generate Notion styled profiles/avatars with AI. <br />
                    Based on {" "}
                    <Link href="https://www.openpeeps.com/" target="_blank" className="underline">openpeeps</Link> and {" "}
                    <Link href="https://opeeps.fun/" target="_blank" className="underline">opeeps.fun</Link>.
                </p>
                <div ref={svgRef} className="w-[200px]">
                    <Peep
                        // style={styles.peepStyle}
                        // viewBox={{ x: '0', y: '0', width: '1050', height: '1200' }}
                        {...properties}
                    />
                </div>
                <div className="grid w-full max-w-md grid-cols-1 gap-4 md:grid-cols-2">
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
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                    <Button onClick={handleDownloadSVG}>Download SVG</Button>
                    <Button onClick={handleDownloadPNG}>Download PNG</Button>
                    <Button onClick={handleCopyReactCode}>Copy React Code</Button>
                </div>
            </main></>
    );
}
