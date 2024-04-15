"use client";

import { useOrigin } from "@/hooks/useOrigin";
import { useParams } from "next/navigation";
import { APIAlert } from "@/components/ui/api-alert";

interface ApiListProps {
	entityName: string;
	entityIdName: string;
}

export const ApiList: React.FC<ApiListProps> = ({
	entityName,
	entityIdName,
}) => {
	const params = useParams();
	const origin = useOrigin();

	const baseURL = `${origin}/api/${params.storeId}`;

	return (
		<>
			<APIAlert
				title="GET"
				variant="public"
				description={`${baseURL}/${entityName}`}
			/>
			<APIAlert
				title="GET"
				variant="public"
				description={`${baseURL}/${entityName}/{${entityIdName}}`}
			/>
			<APIAlert
				title="POST"
				variant="admin"
				description={`${baseURL}/${entityName}`}
			/>
			<APIAlert
				title="PATCH"
				variant="admin"
				description={`${baseURL}/${entityName}/{${entityIdName}}`}
			/>
			<APIAlert
				title="DELETE"
				variant="admin"
				description={`${baseURL}/${entityName}/{${entityIdName}}`}
			/>
		</>
	);
};
