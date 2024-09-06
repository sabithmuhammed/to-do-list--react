import { Badge, Button, Progress, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import React, { useEffect, useState } from "react";
import Checkbox from "antd/es/checkbox/Checkbox";
import Paragraph from "antd/es/typography/Paragraph";
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    CheckOutlined,
    DeleteOutlined,
    EditOutlined,
} from "@ant-design/icons";

function ToDoList() {
    const [tasks, setTasks] = useState(
        JSON.parse(localStorage.getItem("to-do-app")) ?? []
    );
    const [newTask, setNewTast] = useState("");
    const [priority, setPriority] = useState("Low");

    const [progress, setProgresss] = useState(0);
    const [editIndex, setEditIndex] = useState(-1);

    useEffect(() => {
        const newProgress = tasks.reduce(
            (acc, task) => (task.check ? acc + 1 : acc),
            0
        );
        setProgresss(newProgress);
    }, [tasks]);

    function handleInputChange(event) {
        setNewTast(event.target.value);
    }

    function writeToLocalStorage(data) {
        localStorage.setItem("to-do-app", JSON.stringify(data));
    }

    function addTask(e) {
        e.preventDefault();
        if (newTask.trim()) {
            setTasks((t) => [{ title: newTask, check: false, priority }, ...t]);
            localStorage.setItem(
                "to-do-app",
                JSON.stringify([...tasks, { title: newTask, check: false }])
            );
            setNewTast("");
            setPriority("Low");
        }
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
    function handleCheck(index) {
        const updatedArray = [...tasks];
        updatedArray[index].check = !updatedArray[index].check;
        setTasks(updatedArray);
        writeToLocalStorage(updatedArray);
    }

    function handleEdit(value, index) {
        const updatedArray = [...tasks];
        updatedArray[index].title = value;
        setTasks(updatedArray);
        writeToLocalStorage(updatedArray);
    }

    function getPriorityColor(priority) {
        if (!priority || priority === "Low") {
            return "blue";
        } else if (priority === "Moderate") {
            return "orange";
        } else {
            return "red";
        }
    }

    return (
        <div className="w-full pt-10 px-3">
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
                            options={[
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
                            ]}
                        />
                    </div>
                </div>
            </div>

            <div className="mx-auto w-full md:w-[700px]  p-3 border-[1px] rounded-lg border-gray-300 mt-3">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                        <Title level={5}>My tasks</Title>
                        <Progress
                            type="circle"
                            percent={Math.round(
                                (progress / tasks.length) * 100
                            )}
                            size={"small"}
                            steps={{
                                count: tasks.length,
                                gap: 5,
                            }}
                            trailColor="rgba(0, 0, 0, 0.16)"
                            strokeWidth={20}
                        />
                    </div>
                    {tasks.length ? (
                        tasks.map((task, index) => (
                            <Badge.Ribbon
                                text={task?.priority ? task.priority : "Low"}
                                color={getPriorityColor(task.priority)}
                                key={task.title + index}
                            >
                                <div className="border-[1px] p-3 pt-6 rounded-lg border-gray-300">
                                    <div className="flex gap-4 items-start">
                                        <Checkbox
                                            checked={task.check}
                                            onChange={() => handleCheck(index)}
                                        />
                                        <Paragraph
                                            className={`${task.check && 'line-through'} text-base whitespace-pre-line`}
                                            disabled={task.check}
                                            editable={{
                                                editing: index === editIndex,
                                                onChange: (value) =>
                                                    handleEdit(value, index),
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
                                        <hr />
                                    </div>
                                    <div className="px-5 flex gap-3">
                                        <Button
                                            icon={<ArrowUpOutlined />}
                                            onClick={() => moveUp(index)}
                                        />
                                        <Button
                                            icon={<ArrowDownOutlined />}
                                            onClick={() => moveDown(index)}
                                        />
                                        {editIndex === index ? (
                                            <Button
                                                icon={<CheckOutlined />}
                                                type="primary"
                                                onClick={() => setEditIndex(-1)}
                                            />
                                        ) : (
                                            <Button
                                            disabled={task.check}
                                                icon={<EditOutlined />}
                                                onClick={() =>
                                                    setEditIndex(index)
                                                }
                                            />
                                        )}
                                        <Button
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() => removeTask(index)}
                                        />
                                    </div>
                                </div>
                            </Badge.Ribbon>
                        ))
                    ) : (
                        <Text className="text-center">
                            No pending tasks, try adding some!
                        </Text>
                    )}
                </div>
            </div>
        </div>
    );
}
export default ToDoList;
