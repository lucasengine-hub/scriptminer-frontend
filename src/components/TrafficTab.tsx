import { useState } from 'react';
import { Megaphone, TrendingUp, MousePointerClick, DollarSign, Save, Check } from 'lucide-react';
import { trafficMetrics, type TrafficMetric } from '../lib/mockdata';
import { PageHeader, SectionCard, StatCard, inputClass } from './ui';

interface TrafficTabProps {
  t: (k: string) => string;
}

export function TrafficTab({ t }: TrafficTabProps) {
  const [pixels, setPixels] = useState({ facebook: '', google: '', tiktok: '' });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const metricIcons = [
    <DollarSign className="w-4 h-4" />,
    <TrendingUp className="w-4 h-4" />,
    <MousePointerClick className="w-4 h-4" />,
    <DollarSign className="w-4 h-4" />,
  ];

  return (
    <div>
      <PageHeader title={t('trafficTitle')} subtitle={t('trafficSubtitle')} />

      {/* Analytics widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {trafficMetrics.map((m: TrafficMetric, i: number) => (
          <StatCard key={m.id} icon={metricIcons[i]} label={m.label} value={m.value} trend={m.trend} accent={(['blue', 'emerald', 'amber', 'purple'] as const)[i]} />
        ))}
      </div>

      <SectionCard title={t('pixelId')} subtitle="" icon={<Megaphone className="w-4 h-4 text-accent-400" />}>
        <div className="space-y-5">
          {([
            { id: 'facebook', label: 'Facebook Pixel ID' },
            { id: 'google', label: 'Google Ads Pixel ID' },
            { id: 'tiktok', label: 'TikTok Pixel ID' },
          ] as const).map((field) => (
            <div key={field.id}>
              <label className="text-sm font-medium text-muted mb-2 block">{field.label}</label>
              <input type="text" value={pixels[field.id]} onChange={(e) => setPixels({ ...pixels, [field.id]: e.target.value })} placeholder={t('pixelPlaceholder')} className={`${inputClass} font-mono text-sm`} />
            </div>
          ))}
          <button onClick={handleSave} className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent-500 to-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-glow hover:-translate-y-0.5 transition-all">
            {saved ? <><Check className="w-4 h-4" />{t('savedSuccess')}</> : <><Save className="w-4 h-4" />{t('save')}</>}
          </button>
        </div>
      </SectionCard>
    </div>
  );
}
