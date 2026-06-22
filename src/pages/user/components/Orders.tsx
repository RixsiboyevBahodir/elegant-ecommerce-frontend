import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import Shopping from "../../wishlist/components/Shopping"

export default function () {
    const [tabsValue, setTabsValue] = useState("Shopping cart")
    return (
        <div>
            <Tabs value={tabsValue}>
                <TabsList variant="line">
                    <TabsTrigger value="Shopping cart" onClick={() => setTabsValue("Shopping cart")}>Shopping cart 1</TabsTrigger>
                    <TabsTrigger value="Checkout details" onClick={() => setTabsValue("Checkout details")}>Checkout details 2</TabsTrigger>
                    <TabsTrigger value="Order complete" onClick={() => setTabsValue("Order complete")}>Order complete 3</TabsTrigger>
                </TabsList>
            </Tabs>
            {
                tabsValue == 'Shopping cart' ? <Shopping/> : tabsValue == "Checkout details" ? <p>Checkout details</p> : <p>Order complete</p>
            }
        </div>
    )
}
