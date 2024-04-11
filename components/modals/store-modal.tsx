"use client";

import { useStoreModal } from "@/hooks/useStoreModal";
import { Modal } from "@/components/ui/modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
	name: z.string().min(1),
});

export const StoreModal = () => {
	const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		try {
            setLoading(true);
            const response = await axios.post("/api/stores", values);

            toast.success("Store created successfully");
        } catch (error) {
            toast.error("Failed to create store");
        } finally {
            setLoading(false);
        }
	};

	return (
		<Modal
			title="Create Store"
			description="Create a new store to manage products & categories."
			isOpen={storeModal.isOpen}
			onClose={storeModal.onClose}
		>
			<div>
				<div className="space-y-4 py-2 pb-4">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
                                                disabled={loading}
												placeholder="Store Name"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="pt-6 space-x-2 flex items-center justify-end w-full">
								<Button
                                    disabled={loading}
									type="button"
									variant="outline"
									onClick={storeModal.onClose}
								>
									Cancel
								</Button>
								<Button disabled={loading} type="submit">Create</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	);
};
