import prisma from "@/lib/prisma";
import PricingForm from "@/components/PricingForm";
import { notFound } from "next/navigation";

export default async function EditPricingPlanPage({ params }: { params: { id: string } }) {
    const plan = await prisma.pricingPlan.findUnique({
        where: { id: params.id }
    });

    if (!plan) {
        notFound();
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Edit Pricing Plan</h1>
            <PricingForm
                mode="edit"
                planId={plan.id}
                initialData={{
                    name: plan.name,
                    price: plan.price,
                    order: plan.order
                }}
            />
        </div>
    );
}
