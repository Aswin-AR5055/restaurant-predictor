import {
    useEffect,
    useState
} from "react";

import Layout
from "../components/Layout";

import SaleForm
from "../components/SaleForm";

import SalesTable
from "../components/SalesTable";

import {
    getSales,
    createSale
}
from "../services/salesService";

function Sales() {

    const [sales,
        setSales] =
        useState([]);

    useEffect(() => {

        loadSales();

    }, []);

    async function loadSales() {

        const data =
            await getSales();

        setSales(data);
    }

    async function handleCreate(
        sale
    ) {

        await createSale(
            sale
        );

        loadSales();
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
                Sales
            </h1>

            <SaleForm
                onSubmit={
                    handleCreate
                }
            />

            <SalesTable
                sales={sales}
            />

        </Layout>

    );
}

export default Sales;