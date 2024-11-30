import { Button, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import React, { useMemo, useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

const NewTask = ({ tasks, setTasks, writeToLocalStorage }) => {
    const [newTask, setNewTask] = useState("");
    const [priority, setPriority] = useState("Low");
    const { isDarkMode } = useDarkMode();
    const options = useMemo(
        () => [
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
        ],
        []
    );

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }
    function addTask(e) {
        e.preventDefault();
        if (newTask.trim()) {
            setTasks((t) => [{ title: newTask, check: false, priority }, ...t]);
            writeToLocalStorage([
                { title: newTask, check: false, priority },
                ...tasks,
            ]);
            setNewTask("");
            setPriority("Low");
        }
    }
    return (
        <div className="mx-auto w-full md:w-[700px]  p-3 border-[1px] rounded-lg border-gray-300 dark:border-none dark:bg-[#282828] dark:shadow-xl">
            <div className="">
                <Title level={4} className="dark:text-neutral-200">
                    New task
                </Title>
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
                        className="dark:bg-[#3f3f3f] dark:border-none dark:text-neutral-100 dark:placeholder:text-neutral-300 dark:shadow-sm dark:shadow-black/50"
                    />
                    <Button
                        type="primary"
                        onClick={addTask}
                        className="dark:bg-[#164c7e] dark:shadow-sm dark:shadow-black/50"
                    >
                        Add
                    </Button>
                </form>
                <div className="ps-2 flex gap-2">
                    <Text
                        type="secondary"
                        strong
                        className="dark:text-neutral-200"
                    >
                        Priority
                    </Text>
                    <Select
                        defaultValue="Low"
                        value={priority}
                        onChange={(value) => setPriority(value)}
                        style={{
                            width: 120,
                        }}
                        className={isDarkMode ? "dark-mode" : ""}
                        dropdownStyle={{
                            backgroundColor: isDarkMode ? "#3f3f3f" : "", // Dark mode dropdown
                            color: "blue",
                        }}
                        options={options}
                        
                    />
                </div>
            </div>
        </div>
    );
};

export default NewTask;
