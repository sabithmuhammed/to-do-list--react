import { ArrowDownOutlined, ArrowUpOutlined, CheckOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Badge, Button, Checkbox } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import React, { useState } from "react";

const TaskCard = ({task,index,setTasks,tasks,writeToLocalStorage}) => {
    const [editIndex, setEditIndex] = useState(-1);

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
            return "blue";
        } else if (priority === "Moderate") {
            return "orange";
        } else {
            return "red";
        }
    }
    return (
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
                        className={`${
                            task.check && "line-through"
                        } text-base whitespace-pre-line`}
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
                            onClick={() => setEditIndex(index)}
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
    );
};

export default TaskCard;
