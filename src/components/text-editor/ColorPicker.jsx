import React from 'react';
import { Col, ColorPicker as AntColorPicker, Row, Space } from 'antd';

const ColorPicker = ({
    title,
    value,
    handleColorChange,
    presets,
    colorPickerStyles
}) => {
    return (
        <Space direction="vertical">
            <Row align="middle">
                <Space>
                    <span className="font-JetBrains dark:text-text-dark-primary">
                        {title}:{' '}
                    </span>
                    <Col>
                        <AntColorPicker
                            size="small"
                            placement="top"
                            styles={{
                                popupOverlayInner: {
                                    width: 150
                                }
                            }}
                            value={value}
                            presets={presets}
                            trigger="hover"
                            panelRender={(_, { components: { Presets } }) => (
                                <div className="flex w-32 flex-wrap">
                                    <Presets />
                                </div>
                            )}
                            onChangeComplete={(value) => {
                                const inputColor =
                                    value.metaColor.originalInput;
                                handleColorChange(
                                    inputColor,
                                    colorPickerStyles
                                );
                            }}
                        />
                    </Col>
                </Space>
            </Row>
        </Space>
    );
};

export default ColorPicker;
