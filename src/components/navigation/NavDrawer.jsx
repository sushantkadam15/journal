import React, { useState } from 'react';
import { Button, Drawer, Space } from 'antd';
import {
    UserOutlined,
    CalendarOutlined,
    MailOutlined
} from '@ant-design/icons';
import { Divider, Menu as AntMenu, Switch, Avatar, Flex } from 'antd';

const NavDrawer = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Space>
                <Button type="primary" onClick={showDrawer}>
                    Open
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
                closable={false}
                onClose={onClose}
                open={true}
                key={'left'}
                width={260}
                mask={false}
            >
                <div className="flex flex-col items-center gap-5">
                    <Avatar shape="square" size={64} icon={<UserOutlined />} />
                    <Button type="primary">New Page </Button>
                    <Menu />
                </div>
            </Drawer>
        </>
    );
};
export default NavDrawer;

function getItem(label, key, icon = null, children = null) {
    return {
        key,
        icon,
        children,
        label
    };
}

const categoryStyle = {
    backgroundColor: '#FAFAFA'
};

const navigationData = [
    {
        label: 'My Journal',
        key: '1',
        icon: <MailOutlined />,

        children: [
            { label: 'Submenu 1 ', key: '1-1' },
            { label: 'Submenu 2', key: '1-2' },
            { label: 'Submenu 3', key: '1-3' },
            { label: 'Submenu 4', key: '1-4' },
            { label: 'Submenu 5', key: '1-5' },
            { label: 'Submenu 6', key: '1-6' },
            { label: 'Submenu 7', key: '1-7' },
            { label: 'Submenu 8', key: '1-8' },
            { label: 'Submenu 9', key: '1-9' },
            { label: 'Submenu 10', key: '1-10' },
            { label: 'Submenu 11', key: '1-11' },
            { label: 'Submenu 12', key: '1-12' },
            { label: 'Submenu 13', key: '1-13' },
            { label: 'Submenu 14', key: '1-14' },
            { label: 'Submenu 15', key: '1-15' },
            { label: 'Submenu 16', key: '1-16' },
            { label: 'Submenu 17', key: '1-17' },
            { label: 'Submenu 18', key: '1-18' },
            { label: 'Submenu 19', key: '1-19' },
            { label: 'Submenu 20', key: '1-20' },
            { label: 'Submenu 21', key: '1-21' },
            { label: 'Submenu 22', key: '1-22' },
            { label: 'Submenu 23', key: '1-23' },
            { label: 'Submenu 24', key: '1-24' },
            { label: 'Submenu 25', key: '1-25' },
            { label: 'Submenu 26', key: '1-26' },
            { label: 'Submenu 27', key: '1-27' },
            { label: 'Submenu 28', key: '1-28' },
            { label: 'Submenu 29', key: '1-29' },
            { label: 'Submenu 30', key: '1-30' },
            { label: 'Submenu 31', key: '1-31' },
            { label: 'Submenu 32', key: '1-32' },
            { label: 'Submenu 33', key: '1-33' }
        ]
    },
    { label: 'My Insights', key: '2', icon: <CalendarOutlined /> }
];

const journalItems = navigationData.map(({ label, key, icon, children }) =>
    getItem(label, key, icon, children)
);

function Menu() {
    return (
        <>
            <AntMenu
                // style={{
                //     borderRight: 'none',
                //     backgroundColor: 'inherit',
                //     fontFamily: 'inherit'
                // }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['1']}
                expandIcon={false}
                mode={'inline'}
                inlineIndent={20}
                items={journalItems}
                triggerSubMenuAction={'hover'}
            />
        </>
    );
}
