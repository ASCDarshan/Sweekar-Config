/* eslint-disable react/prop-types */
import {
    ShimmerTitle,
    ShimmerText,
    ShimmerButton,
    ShimmerBadge,
    ShimmerTable,
} from "react-shimmer-effects";

const DataTableShimmer = ({ rows = 10 }) => {
    return (
        <div className="w-full bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div className="flex-1 w-full">
                        <div className="mb-3">
                            <ShimmerTitle line={1} gap={10} variant="primary" />
                        </div>
                        <div className="w-full sm:w-72">
                            <ShimmerText line={1} gap={10} />
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <ShimmerButton size="md" />
                        <ShimmerButton size="md" />
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    {[1, 2, 3, 4].map((index) => (
                        <div key={index} className="w-32">
                            <ShimmerText line={1} gap={10} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="p-4">
                    <div className="mb-4">
                        <ShimmerText line={1} gap={10} />
                    </div>

                    <ShimmerTable row={rows} col={6} />
                </div>
            </div>

            <div className="p-4 border-t">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <ShimmerText line={1} gap={10} />
                        <div className="w-20">
                            <ShimmerBadge />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <ShimmerButton size="sm" />
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <div key={index} className="w-8 h-8">
                                    <ShimmerBadge />
                                </div>
                            ))}
                        </div>
                        <ShimmerButton size="sm" />
                    </div>

                    <div className="flex items-center gap-2">
                        <ShimmerText line={1} gap={10} />
                    </div>
                </div>
            </div>
        </div>
    );
};

const AdvancedDataTableShimmer = ({
    rows = 10,
    showToolbar = true,
    showFilters = true,
    showPagination = true,
    showSelection = true,
}) => {
    return (
        <div className="space-y-4">
            {showToolbar && (
                <div className="bg-white rounded-lg p-4 border">
                    <div className="flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex gap-2">
                            <ShimmerButton size="sm" />
                            <ShimmerButton size="sm" />
                            <ShimmerButton size="sm" />
                        </div>

                        <div className="flex gap-2">
                            <ShimmerBadge width={40} />
                            <ShimmerBadge width={40} />
                        </div>
                    </div>
                </div>
            )}
            <div className="bg-white rounded-lg shadow-sm">
                {showFilters && (
                    <div className="p-4 border-b">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {[1, 2, 3, 4].map((index) => (
                                <div key={index}>
                                    <ShimmerText line={2} gap={10} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto">
                    <div className="p-4">
                        {showSelection && (
                            <div className="mb-4 flex items-center gap-2">
                                <ShimmerBadge width={20} />
                                <ShimmerText line={1} gap={10} />
                            </div>
                        )}

                        <ShimmerTable row={rows} col={6} />
                    </div>
                </div>

                {showPagination && (
                    <div className="p-4 border-t">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-3">
                                <ShimmerText line={1} gap={10} />
                                <ShimmerBadge width={60} />
                            </div>

                            <div className="flex items-center gap-2">
                                <ShimmerButton size="sm" />
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((index) => (
                                        <ShimmerBadge key={index} width={32} />
                                    ))}
                                </div>
                                <ShimmerButton size="sm" />
                            </div>

                            <div className="flex items-center gap-2">
                                <ShimmerText line={1} gap={10} />
                                <ShimmerBadge width={40} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export { DataTableShimmer, AdvancedDataTableShimmer };
