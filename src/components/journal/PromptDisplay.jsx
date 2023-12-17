import React, { useState } from 'react';
import prompts from '../../util/prompts.json';
import { Button } from 'antd';
import { IoCloseSharp } from 'react-icons/io5';
import { FaLightbulb } from 'react-icons/fa6';

const PromptDisplay = ({
    isPromptDisplayVisible,
    setIsPromptDisplayVisible,
    currentMood
}) => {
    const [prompt, setPrompt] = useState('');

    const generatePrompt = () => {
        const positiveMoods = ['Happy', 'Relaxed', 'Excited'];
        const selectedEmotion =
            currentMood.charAt(0).toUpperCase() + currentMood.slice(1) ||
            positiveMoods[Math.floor(Math.random() * positiveMoods.length)];

        const promptsArray = prompts[selectedEmotion];
        const randomIndex = Math.floor(Math.random() * promptsArray.length);
        const currentPrompt = promptsArray[randomIndex];
        setPrompt(currentPrompt);
    };



    const hidePromptDisplay = () => {
        setIsPromptDisplayVisible(false);
        setPrompt('');
    };
    return (
        <>
            <div
                className={
                    isPromptDisplayVisible
                        ? 'mb-4 pb-2 flex flex-col   bg-[#85858514] '
                        : 'hidden'
                }
            >
                <Button
                    className="mb-5 mr-2 mt-2 self-end"
                    type="secondary"
                    onClick={hidePromptDisplay}
                >
                    <IoCloseSharp size={20} />
                </Button>
                <div className="flex items-center px-5 pb-5">
                    <p className="ml-auto font-JetBrains font-medium tracking-wider text-[#303030]">
                        {prompt}
                    </p>
                    <span className="ml-auto">
                        <Button type="primary" onClick={generatePrompt}>
                            Regenerate
                        </Button>
                    </span>
                </div>
            </div>
            <div className="mb-4 mr-4 mt-5 flex">
                <Button
                    className={
                        isPromptDisplayVisible
                            ? 'hidden'
                            : 'ml-auto flex items-center gap-2'
                    }
                    type="default"
                    onClick={() => {
                        generatePrompt();
                        setIsPromptDisplayVisible(true);
                    }}
                >
                    <FaLightbulb />
                    Generate Prompt
                </Button>
            </div>
        </>
    );
};

export default PromptDisplay;
