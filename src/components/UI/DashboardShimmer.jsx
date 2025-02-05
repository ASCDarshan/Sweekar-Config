import {
    ShimmerTitle,
    ShimmerText,
    ShimmerCircularImage,
    ShimmerThumbnail,
    ShimmerBadge,
    ShimmerTable,
} from "react-shimmer-effects";

const DashboardShimmer = () => {
    return (
        <div className="p-4">
            <div className="mb-6">
                <ShimmerTitle line={2} gap={10} variant="primary" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                {[1, 2, 3, 4].map((index) => (
                    <div key={index} className="border rounded-lg p-4">
                        <ShimmerText line={2} gap={10} />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="border rounded-lg p-4">
                    <ShimmerTitle line={1} gap={10} variant="secondary" />
                    <div className="mt-4">
                        <ShimmerThumbnail height={200} rounded />
                    </div>
                </div>
                <div className="border rounded-lg p-4">
                    <ShimmerTitle line={1} gap={10} variant="secondary" />
                    <div className="mt-4">
                        <ShimmerThumbnail height={200} rounded />
                    </div>
                </div>
            </div>

            <div className="border rounded-lg p-4">
                <ShimmerTitle line={1} gap={10} variant="secondary" className="mb-4" />
                <ShimmerTable row={5} col={4} />
            </div>

            <div className="border rounded-lg p-4 mt-6">
                <ShimmerTitle line={1} gap={10} variant="secondary" className="mb-4" />
                <div className="space-y-4">
                    {[1, 2, 3].map((index) => (
                        <div key={index} className="flex items-center space-x-4">
                            <ShimmerCircularImage size={40} />
                            <div className="flex-1">
                                <ShimmerText line={2} gap={10} />
                            </div>
                            <ShimmerBadge width={60} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardShimmer;
