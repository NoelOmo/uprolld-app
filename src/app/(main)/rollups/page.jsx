import Link from "next/link";

import PlaceholderContent from "@/components/demo/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import RollupListComponent from "./components/rollup-list-component";
import { getRollUpsForUser } from "./backend/rollups-be";
import { revalidatePath } from "next/cache";

export default async function DashboardPage() {

  const rollups = await getRollUpsForUser();

  revalidatePath('/')
  
  return (
    <ContentLayout title="Rollups">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/rollups">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Rollups</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <RollupListComponent rollups={rollups} />
    </ContentLayout>
  );
}
