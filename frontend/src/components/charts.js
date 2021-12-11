import {
    LineChart,
    ResponsiveContainer,
    Legend, Tooltip,
    Line,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

// Sample chart data
const data = [
    {
        date: '01 Nov',
        visitor: 5,
        buy: 2
    },
    {
        date: '02 Nov',
        visitor: 7,
        buy: 4
    },
    {
        date: '03 Nov',
        visitor: 9,
        buy: 3
    },
    {
        date: '04 Nov',
        visitor: 10,
        buy: 5
    },
    {
        date: '05 Nov',
        visitor: 9,
        buy: 4
    },
    {
        date: '06 Nov',
        visitor: 10,
        buy: 8
    },
    {
        date: '07 Nov',
        visitor: 11,
        buy: 10
    },
    {
        date: '08 Nov',
        visitor: 12,
        buy: 9
    },
    {
        date: '09 Nov',
        visitor: 11,
        buy: 8
    },
    {
        date: '10 Nov',
        visitor: 13,
        buy: 8
    },
    {
        date: '11 Nov',
        visitor: 11,
        buy: 10
    },
    {
        date: '12 Nov',
        visitor: 14,
        buy: 12
    },
];

function Charts() {
    return (
        <>
            <h1 className="chart-text-heading">
                Traffic November 2021
            </h1>
            <ResponsiveContainer width="100%" aspect={3}>
                <LineChart data={data} margin={{ right: 30 }}>
                    <CartesianGrid />
                    <XAxis dataKey="date"
                        interval={'preserveStartEnd'} />
                    <YAxis></YAxis>
                    <Legend />
                    <Tooltip />
                    <Line dataKey="visitor"
                        stroke="blue" activeDot={{ r: 8 }} />
                    <Line dataKey="buy"
                        stroke="red" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </>
    );
}

export default Charts;
