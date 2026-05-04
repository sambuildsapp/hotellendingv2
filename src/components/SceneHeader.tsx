'use client';

interface SceneHeaderProps {
    title: string;
    subtitle: string;
    day?: string;
}

export default function SceneHeader({ title, subtitle, day }: SceneHeaderProps) {
    return (
        <div className="text-center mb-8">
            {day && (
                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-3">
                    {day}
                </span>
            )}
            <h1 className="text-4xl font-bold text-slate-900 mb-2">{title}</h1>
            <p className="text-xl text-slate-600">{subtitle}</p>
        </div>
    );
}
