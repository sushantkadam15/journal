import React from 'react';
import { Col, ColorPicker, Row, Space } from 'antd';

const CustomColorPicker = ({
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
                    <span className='dark:text-text-dark-primary'>{title}: </span>
                    <Col>
                        <ColorPicker
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

export default CustomColorPicker;
