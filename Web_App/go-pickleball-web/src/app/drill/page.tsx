import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';

const drillTypes = [
  { id: 1, title: 'Dink', subtitle: '丁克球', description: '短距离控制性击球练习', path: '/drill/dink' },
  { id: 2, title: 'Drop', subtitle: '长丁克', description: '从后场到前场的控制性击球', path: '/drill/drop' },
  { id: 3, title: 'Volley', subtitle: '截击', description: '网前截击球技术练习', path: '/drill/volley' },
  { id: 4, title: 'Wall Drill', subtitle: '单人对墙练习', description: '利用墙壁进行的单人练习', path: '/drill/wall' }
];

export default function DrillPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex flex-col gap-4">
        {drillTypes.map((drill) => (
          <Link key={drill.id} href={drill.path}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex h-32">
              <div className="w-1/3 relative">
                <ImagePlaceholder />
              </div>
              <div className="w-2/3 p-4 flex flex-col justify-center">
                <h2 className="text-xl font-bold text-gray-800">{drill.title}</h2>
                <h3 className="text-lg text-gray-600">{drill.subtitle}</h3>
                <p className="text-sm text-gray-500">{drill.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}