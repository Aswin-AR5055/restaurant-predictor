import {
    useEffect,
    useState
} from "react";

import Layout
from "../components/Layout";

import MenuForm
from "../components/MenuForm";

import MenuTable
from "../components/MenuTable";

import {
    getMenuItems,
    createMenuItem,
    deleteMenuItem
}
from "../services/menuService";

function Menu() {

    const [items,
        setItems] =
        useState([]);

    useEffect(() => {

        loadMenuItems();

    }, []);

    async function loadMenuItems() {

        const data =
            await getMenuItems();

        setItems(data);
    }

    async function handleCreate(
        item
    ) {

        await createMenuItem(
            item
        );

        loadMenuItems();
    }

    async function handleDelete(
        id
    ) {

        await deleteMenuItem(
            id
        );

        loadMenuItems();
    }

    return (

        <Layout>

            <h1
                className="
                    text-4xl
                    font-bold
                    mb-6
                "
            >
                Menu Management
            </h1>

            <MenuForm
                onSubmit={
                    handleCreate
                }
            />

            <MenuTable
                items={items}
                onDelete={
                    handleDelete
                }
            />

        </Layout>
    );
}

export default Menu;