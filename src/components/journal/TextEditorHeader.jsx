// Importing necessary libraries and assets
import { useState } from 'react';
import logo from '../../assets/logo.svg';
import { Button, Select, Tooltip } from 'antd';
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
import { BsFullscreenExit } from 'react-icons/bs';

// Mood options for the dropdown
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

// TextEditorHeader component
const TextEditorHeader = ({
    currentMood,
    setCurrentMood,
    isFocusModeOn,
    setIsFocusModeOn,
    setIsPromptDisplayVisible,
    setIsTextEditorMenuCollapsed,
    darkModeToggle
}) => {
    // State for mood dropdown
    const [isMoodDropdownOpen, setIsMoodDropdownOpen] = useState(false);

    // Function to handle mood change
    const onMoodChange = (mood) => {
        setCurrentMood(mood);
    };

    // Component return
    return (
        <>
            {/* If not in focus mode */}
            {!isFocusModeOn ? (
                <div className="flex items-start justify-between font-JetBrains md:mx-20 md:mt-5">
                    <div className="flex items-center gap-8 ">
                        <img className="h-12" src={logo} alt="logo" />
                        <div
                            className="shadow-box flex items-center gap-1 border border-solid py-2 pl-4 font-JetBrains text-sm"
                            onMouseEnter={() => setIsMoodDropdownOpen(true)}
                            onMouseLeave={() => setIsMoodDropdownOpen(false)}
                        >
                            Current Mood:
                            {/* Mood dropdown */}
                            <Select
                                defaultValue="happy"
                                size="small"
                                bordered={false}
                                className="w-32 font-JetBrains text-sm"
                                value={currentMood}
                                onChange={onMoodChange}
                                open={isMoodDropdownOpen}
                                onSelect={() => setIsMoodDropdownOpen(false)}
                                options={moodOptions.map(
                                    ({ value, label, icon }) => ({
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
                                    })
                                )}
                            />
                        </div>
                    </div>

                    {/* Buttons for dark mode, focus mode, and sound */}
                    <div className="flex gap-8">
                        <button className="flex flex-col items-center gap-3 bg-transparent"
                        onClick={darkModeToggle}
                        >
                            <img src={darkModeIcon} alt="dark mode" />
                            <span>Dark Mode</span>
                        </button>

                        <button
                            className="flex flex-col items-center gap-3 bg-transparent"
                            onClick={() => {
                                setIsFocusModeOn(true);
                                setIsPromptDisplayVisible(false);
                                setIsTextEditorMenuCollapsed(true);
                            }}
                        >
                            <img src={focusModeIcon} alt="focus mode" />
                            <span>Focus Mode</span>
                        </button>

                        <button className="flex flex-col items-center gap-3 bg-transparent">
                            <img src={soundIcon} alt="sound" />
                            <span>Sound</span>
                        </button>
                    </div>
                </div>
            ) : (
                // If in focus mode
                <div className="fixed right-[10%] top-[3%] z-10">
                    <Tooltip title="Exit Focus Mode" trigger="hover">
                        <Button
                            type="link"
                            onClick={() => {
                                setIsFocusModeOn(false);
                                setIsTextEditorMenuCollapsed(false);
                            }}
                        >
                            <BsFullscreenExit size={18} color="#A6A6C8" />
                        </Button>
                    </Tooltip>
                </div>
            )}
        </>
    );
};

// Exporting the component
export default TextEditorHeader;
