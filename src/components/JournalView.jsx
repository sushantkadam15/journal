import React from 'react';
import { useState } from 'react';
import logo from '../assets/logo.svg';
import { Select } from 'antd';
import lightningIcon from '../assets/icons/mood/bolt-lightning.svg';
import moonIcon from '../assets/icons/mood/cloud-moon.svg';
import cloudShowerIcon from '../assets/icons/mood/cloud-showers.svg';
import cloudIcon from '../assets/icons/mood/cloud.svg';
import rainbowIcon from '../assets/icons/mood/rainbow.svg';
import raindropsIcon from '../assets/icons/mood/Raindrops.svg';
import palmTreeIcon from '../assets/icons/mood/tree-palm.svg';
import waterIcon from '../assets/icons/mood/water.svg';

export const JournalView = () => {
    const [isMoodDropdownOpen, setIsMoodDropdownOpen] = useState(false);
    const handleChange = (value) => {
        console.log(`selected ${value}`);
    };

    return (
        <div>
            {/* Header  */}
            <div>
                <div>
                    <div className="flex items-center gap-8">
                        <img src={logo} alt="logo" />
                        <div
                            className="shadow-box flex items-center gap-1 border border-solid pl-4 font-JetBrains text-sm py-2"
                            onMouseEnter={() => setIsMoodDropdownOpen(true)}
                            onMouseLeave={() => setIsMoodDropdownOpen(false)}
                        >
                            Current Mood:
                            <Select
                                defaultValue="happy"
                                size="small"
                                bordered={false}
                                className='font-JetBrains text-sm w-32'
                                onChange={handleChange}
                                open={isMoodDropdownOpen}
                                onSelect={() => setIsMoodDropdownOpen(false)}
                                options={[
                                    {
                                        value: 'happy',
                                        label: (
                                            <div className="flex items-center gap-2">
                                                <span>Happy</span>
                                                <img
                                                    className="h-4"
                                                    src={rainbowIcon}
                                                    alt="happy"
                                                />
                                            </div>
                                        )
                                    },
                                    {
                                        value: 'relaxed',
                                        label: (
                                            <div className="flex items-center gap-2">
                                                <span>Relaxed</span>
                                                <img
                                                    className="h-4"
                                                    src={palmTreeIcon}
                                                    alt="relaxed"
                                                />
                                            </div>
                                        )
                                    },
                                    {
                                        value: 'excited',
                                        label: (
                                            <div className="flex items-center gap-2">
                                                <span>Excited</span>
                                                <img
                                                    className="h-4"
                                                    src={moonIcon}
                                                    alt="excited"
                                                />
                                            </div>
                                        )
                                    },
                                    {
                                        value: 'neutral',
                                        label: (
                                            <div className="flex items-center gap-2">
                                                <span>Neutral</span>
                                                <img
                                                    className="h-4"
                                                    src={cloudIcon}
                                                    alt="neutral"
                                                />
                                            </div>
                                        )
                                    },
                                    {
                                        value: 'stressed',
                                        label: (
                                            <div className="flex items-center gap-2">
                                                <span>Stressed</span>
                                                <img
                                                    className="h-4"
                                                    src={lightningIcon}
                                                    alt="stressed"
                                                />
                                            </div>
                                        )
                                    },
                                    {
                                        value: 'sad',
                                        label: (
                                            <div className="flex items-center gap-2">
                                                <span>Sad</span>
                                                <img
                                                    className="h-4"
                                                    src={raindropsIcon}
                                                    alt="sad"
                                                />
                                            </div>
                                        )
                                    },
                                    {
                                        value: 'angry',
                                        label: (
                                            <div className="flex items-center gap-2">
                                                <span>Angry</span>
                                                <img
                                                    className="h-4"
                                                    src={cloudShowerIcon}
                                                    alt="angry"
                                                />
                                            </div>
                                        )
                                    },
                                    {
                                        value: 'anxious',
                                        label: (
                                            <div className="flex items-center gap-2">
                                                <span>Anxious</span>
                                                <img
                                                    className="h-4"
                                                    src={waterIcon}
                                                    alt="anxious"
                                                />
                                            </div>
                                        )
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};
