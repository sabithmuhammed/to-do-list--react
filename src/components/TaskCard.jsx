import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    CheckOutlined,
    DeleteOutlined,
    EditOutlined,
} from "@ant-design/icons";
import { Badge, Button, Checkbox } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React, { useState } from "react";
import { useDarkMode } from "../context/DarkModeContext";

const TaskCard = ({ task, index, setTasks, tasks, writeToLocalStorage }) => {
    const [editIndex, setEditIndex] = useState(-1);
    const { isDarkMode } = useDarkMode();

    function handleCheck(index) {
        const updatedArray = [...tasks];
        updatedArray[index].check = !updatedArray[index].check;
        setTasks(updatedArray);
        writeToLocalStorage(updatedArray);
    }

    function removeTask(index) {
        setTasks((t) => t.filter((_, i) => i !== index));
        writeToLocalStorage(tasks.filter((_, i) => i !== index));
    }

    function moveUp(index) {
        if (index > 0) {
            const updatedArray = [...tasks];
            [updatedArray[index], updatedArray[index - 1]] = [
                updatedArray[index - 1],
                updatedArray[index],
            ];
            setTasks(updatedArray);
            writeToLocalStorage(updatedArray);
        }
    }

    function moveDown(index) {
        if (index < tasks.length - 1) {
            const updatedArray = [...tasks];
            [updatedArray[index + 1], updatedArray[index]] = [
                updatedArray[index],
                updatedArray[index + 1],
            ];
            setTasks(updatedArray);
            writeToLocalStorage(updatedArray);
        }
    }
    function handleEdit(value, index) {
        const updatedArray = [...tasks];
        updatedArray[index].title = value;
        setTasks(updatedArray);
        writeToLocalStorage(updatedArray);
    }

    function getPriorityColor(priority) {
        if (!priority || priority === "Low") {
            return isDarkMode ? "#164c7e" : "#1890ff";
        } else if (priority === "Moderate") {
            return isDarkMode ? "#aa6215" : "#d87a16";
        } else {
            return isDarkMode ? "#a61d24" : "#d32029";
        }
    }

    function handlePriorityToggle(priority, index) {
        let newPriority = "Low";
        if (priority == "Moderate") {
            newPriority = "High";
        } else if (priority == "Low") {
            newPriority = "Moderate";
        }
        const updatedArray = [...tasks];
        updatedArray[index].priority = newPriority;
        setTasks(updatedArray);
        writeToLocalStorage(updatedArray);
    }

    return (
        <Badge.Ribbon
            text={task?.priority ? task.priority : "Low"}
            color={getPriorityColor(task.priority)}
            key={task.title + index}
            className="select-none"
        >
            <div className="relative border-[1px] p-3 pt-6 rounded-lg border-gray-300 dark:bg-[#3f3f3f] dark:border-none dark:shadow-sm dark:shadow-black/50">
                <div
                    className={`absolute cursor-pointer z-10  top-0 -right-3 h-9 ${
                        task?.priority && task.priority == "Moderate"
                            ? "w-20"
                            : "w-12"
                    }`}
                    onDoubleClick={() =>
                        handlePriorityToggle(task.priority, index)
                    }
                ></div>
                <div className="flex gap-4 items-start">
                    <Checkbox
                        checked={task.check}
                        onChange={() => handleCheck(index)}
                    />
                    <Paragraph
                        className={`${
                            task.check && "line-through"
                        } text-base whitespace-pre-line dark:text-neutral-200`}
                        disabled={task.check}
                        editable={{
                            editing: index === editIndex,
                            onChange: (value) => handleEdit(value, index),
                            onEnd: () => {
                                setEditIndex(-1);
                            },
                            icon: <div></div>,
                        }}
                    >
                        {task.title}
                    </Paragraph>
                </div>
                <div className="px-5 mb-3">
                    <hr className="dark:border-[#282828]" />
                </div>
                <div className="px-5 flex gap-3">
                    <Button
                        icon={<ArrowUpOutlined />}
                        onClick={() => moveUp(index)}
                        className="dark:shadow-sm dark:shadow-black/50"
                        style={{
                            backgroundColor: isDarkMode ? "#282828" : "",
                            border: isDarkMode ? "#282828" : "",
                            color: isDarkMode ? "rgb(229,229,229)" : "",
                        }}
                    />
                    <Button
                        icon={<ArrowDownOutlined />}
                        onClick={() => moveDown(index)}
                        style={{
                            backgroundColor: isDarkMode ? "#282828" : "",
                            border: isDarkMode ? "#282828" : "",
                            color: isDarkMode ? "rgb(229,229,229)" : "",
                        }}
                    />
                    {editIndex === index ? (
                        <Button
                            icon={<CheckOutlined />}
                            type="primary"
                            onClick={() => setEditIndex(-1)}
                            style={{
                                backgroundColor: isDarkMode ? "#282828" : "",
                                border: isDarkMode ? "#282828" : "",
                                color: isDarkMode ? "rgb(229,229,229)" : "",
                            }}
                        />
                    ) : (
                        <Button
                            disabled={task.check}
                            icon={<EditOutlined />}
                            onClick={() => setEditIndex(index)}
                            style={{
                                backgroundColor: isDarkMode ? "#282828" : "",
                                border: isDarkMode ? "#282828" : "",
                                color: isDarkMode ? "rgb(229,229,229)" : "",
                            }}
                        />
                    )}
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removeTask(index)}
                        style={{
                            backgroundColor: isDarkMode ? "#282828" : "",
                        }}
                    />
                </div>
            </div>
        </Badge.Ribbon>
    );
};

export default TaskCard;
