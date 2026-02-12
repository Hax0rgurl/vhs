import dynamic from 'next/dynamic';

const MyChart = dynamic(() => import('@/components/MyChart'), {
  ssr: false,
  loading: () => <p>Loading chart...</p>
});

export default function ChartPage() {
  return (
    <div>
      <h1>Chart Page</h1>
      <MyChart />
    </div>
  );
}
