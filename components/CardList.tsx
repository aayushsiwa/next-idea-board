import { title } from "process";
import React from "react";
import Card from "./ui/Card";

const tasks = [
    {
        id: "1",
        title: "title",
        body: "Your Card component is well-structured, but I have a few suggestions to improve accessibility, styling consistency, and maintainability:",
    },
    {
        id: "2",
        title: "title",
        body: "Your Card component is well-structured, but I have a few suggestions to improve accessibility, styling consistency, and maintainability:",
    },
    {
        id: "3",
        title: "title",
        body: "Your Card component is well-structured, but I have a few suggestions to improve accessibility, styling consistency, and maintainability:",
    },
    {
        id: "4",
        title: "title",
        body: "Your Card component is well-structured, but I have a few suggestions to improve accessibility, styling consistency, and maintainability:",
    },
    {
        id: "5",
        title: "title",
        body: "Your Card component is well-structured, but I have a few suggestions to improve accessibility, styling consistency, and maintainability:",
    },
    {
        id: "6",
        title: "title",
        body: "Your Card component is well-structured, but I have a few suggestions to improve accessibility, styling consistency, and maintainability:",
    },
    {
        id: "7",
        title: "title",
        body: "and maintainability:",
    },
    {
        id: "12",
        title: "title",
        body: "Your Card component is well-structured, but I have a few suggestions to improve accessibility, styling consistency, and maintainability:",
    },
    {
        id: "15",
        title: "title",
        body: "Your Card component is well-structured, but I have a few suggestions to improve accessibility, styling consistency, and maintainability:",
    },
    {
        id: "16",
        title: "title",
        body: "Your Card component is well-structured, but I have a few suggestions to improve accessibility, styling consistency, and maintainability:",
    },
    {
        id: "17",
        title: "title",
        body: "Your Card component is well-structured, but I have a few suggestions to improve accessibility, styling consistency, and maintainability:",
    },
    {
        id: "18",
        title: "title",
        body: "Your Card component is well-structured, but I have a few suggestions to improve accessibility, styling consistency, and maintainability:",
    },
    {
        id: "19",
        title: "title",
        body: "Your Card component is well-structured, but I have a few suggestions to improve accessibility, styling consistency, and maintainability:",
    },
    {
        id: "20",
        title: "title",
        body: "and maintainability:",
    },
];

function CardList() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {tasks.map((task) => (
                <Card title={task.title} body={task.body} key={task.id} />
            ))}
        </div>
    );
}

export default CardList;
