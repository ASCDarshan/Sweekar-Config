import {
    ShimmerTitle,
    ShimmerText,
    ShimmerCircularImage,
    ShimmerThumbnail,
    ShimmerBadge,
    ShimmerButton,
} from "react-shimmer-effects";

const UserProfileShimmer = () => {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="mb-6">
                <ShimmerThumbnail height={200} rounded />
            </div>

            <div className="relative">
                <div className="absolute -top-16 left-8">
                    <ShimmerCircularImage size={128} />
                </div>

                <div className="pt-16 px-6 pb-6 bg-white rounded-lg border">
                    <div className="flex justify-between items-start mb-6">
                        <div className="space-y-2">
                            <ShimmerTitle line={1} gap={10} variant="primary" />
                            <ShimmerText line={1} gap={10} />
                        </div>
                        <ShimmerButton size="lg" />
                    </div>

                    <div className="mb-6">
                        <ShimmerText line={3} gap={10} />
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {[1, 2, 3].map((index) => (
                            <div key={index} className="text-center">
                                <ShimmerBadge width={80} />
                                <ShimmerText line={1} gap={10} className="mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex gap-4 mt-6 border-b pb-4">
                {[1, 2, 3, 4].map((index) => (
                    <ShimmerBadge key={index} width={100} />
                ))}
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="bg-white rounded-lg border p-4">
                            <div className="flex items-center gap-3 mb-4">
                                <ShimmerCircularImage size={40} />
                                <div>
                                    <ShimmerText line={2} gap={10} />
                                </div>
                            </div>
                            <ShimmerText line={3} gap={10} />
                            <div className="mt-4">
                                <ShimmerThumbnail height={200} rounded />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="space-y-6">
                    <div className="bg-white rounded-lg border p-4">
                        <ShimmerTitle
                            line={1}
                            gap={10}
                            variant="secondary"
                            className="mb-4"
                        />
                        <ShimmerText line={4} gap={10} />
                    </div>

                    <div className="bg-white rounded-lg border p-4">
                        <ShimmerTitle
                            line={1}
                            gap={10}
                            variant="secondary"
                            className="mb-4"
                        />
                        <div className="grid grid-cols-3 gap-2">
                            {[1, 2, 3, 4, 5, 6].map((index) => (
                                <ShimmerThumbnail key={index} height={80} rounded />
                            ))}
                        </div>
                    </div>

                    <div className="bg-white rounded-lg border p-4">
                        <ShimmerTitle
                            line={1}
                            gap={10}
                            variant="secondary"
                            className="mb-4"
                        />
                        <div className="grid grid-cols-3 gap-3">
                            {[1, 2, 3, 4, 5, 6].map((index) => (
                                <div key={index} className="text-center">
                                    <ShimmerCircularImage size={50} />
                                    <ShimmerText line={1} gap={10} className="mt-2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfileShimmer;
