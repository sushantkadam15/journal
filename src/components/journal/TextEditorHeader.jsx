import { useState } from 'react';
import logo from '../../assets/logo.svg';
import { Select } from 'antd';
import lightningIcon from '../../assets/icons/mood/bolt-lightning.svg';
import moonIcon from '../../assets/icons/mood/cloud-moon.svg';
import cloudShowerIcon from '../../assets/icons/mood/cloud-showers.svg';
import cloudIcon from '../../assets/icons/mood/cloud.svg';
import rainbowIcon from '../../assets/icons/mood/rainbow.svg';
import raindropsIcon from '../../assets/icons/mood/Raindrops.svg';
import palmTreeIcon from '../../assets/icons/mood/tree-palm.svg';
import waterIcon from '../../assets/icons/mood/water.svg';

import focusModeIcon from '../../assets/icons/circle-dot.svg';
import darkModeIcon from '../../assets/icons/circle-half-stroke.svg';
import soundIcon from '../../assets/icons/volume-off.svg';
import bulbIcon from '../../assets/icons/icons8-bulb-32.png';


const moodOptions = [
    { value: 'happy', label: 'Happy', icon: rainbowIcon },
    { value: 'relaxed', label: 'Relaxed', icon: palmTreeIcon },
    { value: 'excited', label: 'Excited', icon: moonIcon },
    { value: 'neutral', label: 'Neutral', icon: cloudIcon },
    { value: 'stressed', label: 'Stressed', icon: lightningIcon },
    { value: 'sad', label: 'Sad', icon: raindropsIcon },
    { value: 'angry', label: 'Angry', icon: cloudShowerIcon },
    { value: 'anxious', label: 'Anxious', icon: waterIcon }
];



const TextEditorHeader = () => {
    const [isMoodDropdownOpen, setIsMoodDropdownOpen] = useState(false);
    const onMoodChange = (mood) => {
        console.log(mood);
    };

    return (
        <div className="flex items-start justify-between font-JetBrains">
            <div className="flex items-center gap-8 ">
                <img className="h-14" src={logo} alt="logo" />
                <div
                    className="shadow-box flex items-center gap-1 border border-solid py-2 pl-4 font-JetBrains text-sm"
                    onMouseEnter={() => setIsMoodDropdownOpen(true)}
                    onMouseLeave={() => setIsMoodDropdownOpen(false)}
                >
                    Current Mood:
                    <Select
                        defaultValue="happy"
                        size="small"
                        bordered={false}
                        className="w-32 font-JetBrains text-sm"
                        onChange={onMoodChange}
                        open={isMoodDropdownOpen}
                        onSelect={() => setIsMoodDropdownOpen(false)}
                        options={moodOptions.map(({ value, label, icon }) => ({
                            value,
                            label: (
                                <div className="flex items-center gap-2">
                                    <span>{label}</span>
                                    <img
                                        className="h-4"
                                        src={icon}
                                        alt={value}
                                    />
                                </div>
                            )
                        }))}
                    />
                </div>
            </div>
            <div className="flex gap-8">
                <button className="flex flex-col items-center gap-3 bg-transparent">
                    <img
                        className="h-[16px]"
                        src={bulbIcon}
                        alt="Generate Prompt"
                    />
                    <span>Add Prompt</span>
                </button>
                <button className="flex flex-col items-center gap-3 bg-transparent">
                    <img src={darkModeIcon} alt="dark mode" />
                    <span>Dark Mode</span>
                </button>
                <button className="flex flex-col items-center gap-3 bg-transparent">
                    <img src={focusModeIcon} alt="focus mode" />
                    <span>Focus Mode</span>
                </button>
                <button className="flex flex-col items-center gap-3 bg-transparent">
                    <img src={soundIcon} alt="sound" />
                    <span>Sound</span>
                </button>
            </div>
        </div>
    );
};

export default TextEditorHeader;