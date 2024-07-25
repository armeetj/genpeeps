import React, { useState, useRef, useEffect } from "react";
import Peep from "react-peeps";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { saveAs } from 'file-saver'; // For downloading images
import Link from "next/link";
import { SelectLabel } from "@radix-ui/react-select";

import { savePng, saveSvg } from "@/utils/save";

import { InboxOutlined, LoadingOutlined } from '@ant-design/icons';
import { message, Upload, Spin } from 'antd';

const { Dragger } = Upload;

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
    const [accessory, setAccessory] = useState(null);
    const [body, setBody] = useState(null);
    const [face, setFace] = useState(null);
    const [facialHair, setFacialHair] = useState(null);
    const [hair, setHair] = useState(null);
    const svgRef = useRef(null);

    const [imageData, setImageData] = useState(null);
    const [loading, setLoading] = useState(false);

    const properties = {
        accessory,
        body,
        face,
        facialHair,
        hair,
    };

    useEffect(() => {
        randomizeProperties();
    }, []);

    function animate(fn, args, dt, n) {
        for (let i = 0; i < n; i++) {
            setTimeout(() => {
                fn(args());
            }, dt * i);
        }

    }

    function readImage(file) {
        const reader = new FileReader();
        reader.onload = e => {
            if (e.type == "load") {
                const data = e.target.result;
                setImageData(data);
            }
        };
        reader.readAsDataURL(file)

        return false;
    }

    function generateAvatar() {
        setLoading(true);
    }

    const uploadProps = {
        name: 'file',
        multiple: false,
        maxCount: 1,
        listType: "picture",
        // action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        accept: ".png, .jpg, .jpeg",
        beforeUpload: readImage,
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDownload(e) {
            console.log("download");

        },
        onRemove(e) {
            setImageData(null);
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };
    const randomizeProperties = () => {
        animate(setAccessory, () => accessoryOptions[Math.floor(Math.random() * accessoryOptions.length)], 10, 20);
        animate(setBody, () => bodyOptions[Math.floor(Math.random() * bodyOptions.length)], 100, 5);
        animate(setFace, () => faceOptions[Math.floor(Math.random() * faceOptions.length)], 100, 8);
        animate(setFacialHair, () => facialHairOptions[Math.floor(Math.random() * facialHairOptions.length)], 80, 15);
        animate(setHair, () => hairOptions[Math.floor(Math.random() * hairOptions.length)], 50, 20);
    }

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

                <Dragger {...uploadProps} >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">
                        Upload a picture of yourself to magically <br />generate a personalized avatar with AI ✨ <br />
                        (png, jpeg)
                    </p>
                </Dragger>

                {imageData && <Button disabled={loading} onClick={generateAvatar} className="font-mono font-black">
                    {loading && <Spin percent="auto" className="mr-4" />}
                    🪄 generate ✨</Button>}


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
                    <Button variant="secondary" onClick={handleDownloadSVG}>📥 download</Button>
                    {/* <Button onClick={handleDownloadPNG}>Download PNG</Button> */}
                    <Button variant="secondary" onClick={handleCopyReactCode}>📎 copy react code</Button>
                    <Button variant="secondary" onClick={randomizeProperties}>🎲 randomize</Button>
                </div>
            </main></>
    );
}
