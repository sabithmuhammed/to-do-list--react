import { Button, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import React, { useMemo, useState } from "react";

const NewTask = ({ tasks, setTasks, writeToLocalStorage }) => {
    const [newTask, setNewTask] = useState("");
    const [priority, setPriority] = useState("Low");
    const options = useMemo(() => [
        {
            value: "Low",
            label: "Low",
        },
        {
            value: "Moderate",
            label: "Moderate",
        },
        {
            value: "High",
            label: "High",
        },
    ]);

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }
    function addTask(e) {
        e.preventDefault();
        if (newTask.trim()) {
            setTasks((t) => [{ title: newTask, check: false, priority }, ...t]);
            writeToLocalStorage([...tasks, { title: newTask, check: false }]);
            setNewTask("");
            setPriority("Low");
        }
    }
    return (
        <div className="mx-auto w-full md:w-[700px]  p-3 border-[1px] rounded-lg border-gray-300">
            <div className="">
                <Title level={4}>New task</Title>
                <form className="flex gap-4 py-3">
                    <TextArea
                        placeholder="Enter new task"
                        value={newTask}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                addTask(e);
                            }
                        }}
                        onChange={handleInputChange}
                        autoSize={{
                            minRows: 1,
                            maxRows: 3,
                        }}
                        size="large"
                    />
                    <Button type="primary" onClick={addTask}>
                        Add
                    </Button>
                </form>
                <div className="ps-2 flex gap-2">
                    <Text type="secondary" strong>
                        Priority
                    </Text>
                    <Select
                        defaultValue="Low"
                        value={priority}
                        onChange={(value) => setPriority(value)}
                        style={{
                            width: 120,
                        }}
                        options={options}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewTask;
