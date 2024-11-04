import { CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import React, { useEffect, useState } from "react";

const ReleaseNote = () => {
    const [currentRelease] = useState("2.0.1");
    const [showRelease, setShowRelease] = useState(false);

    useEffect(() => {
        const release = localStorage.getItem("release");
        if (!(release == currentRelease)) {
            setShowRelease(true);
        }
    }, []);

    function closeReleaseNote() {
        localStorage.setItem("release", currentRelease);
        setShowRelease(false);
    }

    return (
        showRelease && (
            <div className="w-screen  fixed flex justify-end z-20  p-3">
                <div className="w-full max-w-[420px] bg-white border-[1px] rounded-md p-3 text-center relative">
                    <Button
                        danger
                        icon={<CloseOutlined />}
                        className="absolute top-2 right-2"
                        onClick={closeReleaseNote}
                    />
                    <Title level={4}>Release note (v2.0.1)</Title>
                    <hr className="my-2" />
                    <ul className="text-start">
                        <li>
                            <Title level={5}>
                                Double click to change priority
                            </Title>

                            <Paragraph>
                                Double click the priority ribbon to change the
                                priority of a task
                            </Paragraph>
                        </li>
                        <hr className="my-2" />

                        <li>
                            <Title level={5}>Drag and drop</Title>

                            <Paragraph>
                                Drang and drop to re-order the tasks
                            </Paragraph>
                        </li>
                    </ul>
                </div>
            </div>
        )
    );
};

export default ReleaseNote;
