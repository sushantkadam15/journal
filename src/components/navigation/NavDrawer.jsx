import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { TbBook2 } from 'react-icons/tb';
import { RxHamburgerMenu } from 'react-icons/rx';
import { useMenu } from '../../contexts/NavDrawerContext';
import { Avatar } from 'antd';

const journalData = [
    {
        label: 'Item One',
        id: '1'
    },
    {
        label: 'Item Two',
        id: '2'
    },
    {
        label: 'Item Three',
        id: '3'
    },
    {
        label: 'Item Four',
        id: '4'
    },
    {
        label: 'Item Five',
        id: '5'
    },
    {
        label: 'Item Six',
        id: '6'
    },
    {
        label: 'Item Seven',
        id: '7'
    },
    {
        label: 'Item Eight',
        id: '8'
    },
    {
        label: 'Item Nine',
        id: '9'
    },
    {
        label: 'Item Ten',
        id: '10'
    },
    {
        label: 'Item Eleven',
        id: '11'
    },
    {
        label: 'Item Twelve',
        id: '12'
    },
    {
        label: 'Item Thirteen',
        id: '13'
    },
    {
        label: 'Item Fourteen this continues to the end',
        id: '14'
    },
    {
        label: 'Item Fifteen',
        id: '15'
    },
    {
        label: 'Item Sixteen',
        id: '16'
    },
    {
        label: 'Item Seventeen',
        id: '17'
    },
    {
        label: 'Item Eighteen',
        id: '18'
    },
    {
        label: 'Item Nineteen',
        id: '19'
    },
    {
        label: 'Item Twenty',
        id: '20'
    },
    {
        label: 'Item Twenty One',
        id: '21'
    },
    {
        label: 'Item Twenty Two',
        id: '22'
    },
    {
        label: 'Item Twenty Three',
        id: '23'
    },
    {
        label: 'Item Twenty Four',
        id: '24'
    },
    {
        label: 'Item Twenty Five',
        id: '25'
    },
    {
        label: 'Item Twenty Six',
        id: '26'
    },
    {
        label: 'Item Twenty Seven',
        id: '27'
    },
    {
        label: 'Item Twenty Eight',
        id: '28'
    },
    {
        label: 'Item Twenty Nine',
        id: '29'
    },
    {
        label: 'Item Thirty',
        id: '30'
    }
];

const NavDrawer = () => {
    const { open, showDrawer, hideDrawer } = useMenu();
    return (
        <>
            <Space
                style={{
                    position: 'absolute',
                    top: '9%',
                    left: '1%',
                    transform: 'translateY(-50%)',
                    zIndex: '10'
                }}
            >
                <Button type="text" onClick={showDrawer}>
                    <RxHamburgerMenu size={24} color="#A6A6C8" />
                </Button>
            </Space>
            <Drawer
                style={{
                    borderRadius: 'var(--size-0, 0px)',
                    background: 'var(--Color-nav-bg, #EBEBEB)',
                    boxShadow: '4px 4px 8px 0px rgba(0, 0, 0, 0.25)',
                    fontFamily: 'JetBrains Mono'
                }}
                placement={'left'}
                onClose={hideDrawer}
                open={open}
                key={'left'}
                width={260}
                keyboard={true}
            >
                <div className="flex flex-col items-center gap-5">
                    <Avatar shape="square" size={64} icon={<UserOutlined />} />
                    <Button type="primary">New Page </Button>
                    <h2 className="flex w-full items-center gap-2 rounded-md bg-[#FAFAFA] px-4 py-2  text-sm">
                        <TbBook2 size={20} color="#A6A6C8" /> My Journal
                    </h2>

                    <div className="flex h-96 flex-col gap-1 overflow-auto">
                        {journalData.map(({ label, id }) => (
                            <Button key={id} type="text">
                                <div
                                    style={{
                                        width: '150px',
                                        textAlign: 'left',
                                        fontSize: '13px',
                                        fontWeight: 'var(--font-weight-1, 400)',
                                        color: 'var(--Color-text, #000000)',
                                        overflow: 'hidden',
                                        whiteSpace: 'nowrap',
                                        textOverflow: 'ellipsis',
                                        textIndent: '5px'
                                    }}
                                >
                                    {label}
                                </div>
                            </Button>
                        ))}
                    </div>

                    <Button className="flex w-full items-center gap-2 rounded-md border-none bg-[#FAFAFA] px-4  py-2 text-sm outline-none">
                        <TbBook2 size={20} color="#A6A6C8" /> My Insights
                    </Button>
                </div>
            </Drawer>
        </>
    );
};
export default NavDrawer;
