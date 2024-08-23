import { useBenchmarkFilters } from '@/services/state/benchmarksStore'
import React from 'react'

import { useQuery } from '@tanstack/react-query';

interface ButtonProps {
    children: React.ReactNode;
    type: 'testType' | 'metrics';
    value: string;
    className: string
}

function LeaderboardFilters() {

    return (
        <div className=''>
            <div className='container mx-auto px-4 py-6'>
                <p>Test type:</p>
                <div className='flex flex-wrap items-center justify-between my-2'>
                    <Button className="bg-rose-800" type="testType" value="all">All</Button>
                    <Button className="bg-emerald-800" type="testType" value="cpuBound">CPU-bound</Button>
                    <Button className="bg-blue-800" type="testType" value="ioBound">IO-bound</Button>
                    <Button className="bg-yellow-800" type="testType" value="memoryBound">Memory-bound</Button>
                    <Button className="bg-indigo-800" type="testType" value="file">File</Button>
                    <Button className="bg-purple-800" type="testType" value="complexSqlQuery">Complex sql query</Button>
                </div>
                <p>Metrics:</p>
                <div className='flex items-center space-x-4 my-2'>
                    <Button className="bg-fuchsia-800" type="metrics" value="combinedScore">Combined score</Button>
                    <Button className="bg-rose-800" type="metrics" value="requestsSec">Requests/sec</Button>
                    <Button className="bg-cyan-800" type="metrics" value="latency">Latency</Button>
                    <Button className="bg-violet-800" type="metrics" value="cpuUtilization">Cpu utilization</Button>
                    <Button className="bg-yellow-800" type="metrics" value="memoryUtilization">Memory utilization</Button>
                </div>
            </div>
        </div>
    );
}

function Button({ children, type, value, className }: ButtonProps) {

    const { filters, setFilters } = useBenchmarkFilters();

    const isActive = filters[type] === value;

    return (
        <button
            className={`flex px-2 rounded-full bg-opacity-30 items-center space-x-4 ${className} ${isActive ? 'bg-opacity-30 border-2 border-[var(--color-python)]' : ''}`}
            onClick={() => setFilters({ ...filters, [type]: value })}
        >
            {children}
        </button>
    );
}

export default LeaderboardFilters;
