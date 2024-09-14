import { Skeleton } from "@/components/ui/skeleton"
export default function Loading() {
    return (
        <>
            <div className="w-full flex justify-center items-center">
                <div className="w-[40%] flex flex-col items-center justify-center space-y-3 mt-10">
                    <div className="flex gap-4">
                        <Skeleton className="h-[200px] w-[350px] rounded-3xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-[300px] rounded-3xl" />
                            <Skeleton className="h-8 w-[250px] rounded-3xl" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Skeleton className="h-[200px] w-[350px] rounded-3xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-[300px] rounded-3xl" />
                            <Skeleton className="h-8 w-[250px] rounded-3xl" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Skeleton className="h-[200px] w-[350px] rounded-3xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-[300px] rounded-3xl" />
                            <Skeleton className="h-8 w-[250px] rounded-3xl" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Skeleton className="h-[200px] w-[350px] rounded-3xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-[300px] rounded-3xl" />
                            <Skeleton className="h-8 w-[250px] rounded-3xl" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Skeleton className="h-[200px] w-[350px] rounded-3xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-[300px] rounded-3xl" />
                            <Skeleton className="h-8 w-[250px] rounded-3xl" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Skeleton className="h-[200px] w-[350px] rounded-3xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-[300px] rounded-3xl" />
                            <Skeleton className="h-8 w-[250px] rounded-3xl" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Skeleton className="h-[200px] w-[350px] rounded-3xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-[300px] rounded-3xl" />
                            <Skeleton className="h-8 w-[250px] rounded-3xl" />
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Skeleton className="h-[200px] w-[350px] rounded-3xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-8 w-[300px] rounded-3xl" />
                            <Skeleton className="h-8 w-[250px] rounded-3xl" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}