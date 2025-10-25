import { Card } from '@/components/ui/card';

export default function AboutSection() {
  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-3xl font-bold gradient-text">О сайте</h2>
      <Card className="glass-card p-6 space-y-2 text-sm opacity-80">
        <p>Web by moondar1nka with company AductWork, CrystalXteam</p>
        <p className="gradient-text font-semibold">froz1kecs clan</p>
        <p>join to me at mc.HolyWorld.ru</p>
        <p>2025 product | web version 1.0 (релиз)</p>
        <p className="mt-4">
          Клан froz1kecs - клан на Майнкрафт анархии HolyWorld
        </p>
      </Card>
    </div>
  );
}
