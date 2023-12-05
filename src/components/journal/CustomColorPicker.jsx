import React from 'react';
import { Col, ColorPicker, Row, Space } from 'antd';

const CustomColorPicker = ({ title, value, handleColorChange, presets }) => {
    return (
        <Space direction="vertical">
            <Row align="middle">
                <Space>
                    <span>{title}: </span>
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
                            onChangeComplete={handleColorChange}
                        />
                    </Col>
                </Space>
            </Row>
        </Space>
    );
};

export default CustomColorPicker;