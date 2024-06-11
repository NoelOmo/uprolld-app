
import Link from "next/link";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import RollupCarouselComponent from "./components/rollup-carousel-component";
import { getEmailById, getEmailsByRollUpId, getRollUpById } from "../backend/rollups-be";

export default async function SingleRollupPage({params: {id}}) {

    let emailArrs = [];
    if (id.includes("view-")) {
        const finalId = id.replace("view-", "");
        const singleEmail = await getEmailById(finalId);
        if (singleEmail !== null) {
            emailArrs.push(singleEmail);
        }
    }else {
        const emails = await getEmailsByRollUpId(id);
        emailArrs = emails.documents;
    }

    return (
        <ContentLayout title="Account">
            <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link href="#">Home</Link>
                </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link href="/rollups">Rollups</Link>
                </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage>{id}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>
            <RollupCarouselComponent rollup={emailArrs} />
        </ContentLayout>
    )
}