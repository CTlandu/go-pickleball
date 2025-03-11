import Image from 'next/image';
import Link from 'next/link';
import ImagePlaceholder from '@/components/ImagePlaceholder';

const dinkTypes = [
  { id: 1, title: '对角丁克', description: '练习对角线方向的丁克球控制', path: '/drill/dink/diagonal' },
  { id: 2, title: '猫和老鼠丁克', description: '一人进攻一人防守的丁克练习', path: '/drill/dink/cat-mouse' },
  { id: 3, title: '直线丁克', description: '练习直线方向的丁克球控制', path: '/drill/dink/straight' },
  { id: 4, title: '交替丁克', description: '两人交替击打丁克球', path: '/drill/dink/alternate' }
];

export default function DinkPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">丁克球练习</h1>
        <p className="text-gray-600">选择一种练习方式</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {dinkTypes.map((dink) => (
          <Link key={dink.id} href={dink.path}>
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-44 flex flex-col">
              <div className="h-24 relative">
                <ImagePlaceholder />
              </div>
              <div className="p-3 flex-1">
                <h3 className="font-bold text-gray-800 mb-1">{dink.title}</h3>
                <p className="text-xs text-gray-500">{dink.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}