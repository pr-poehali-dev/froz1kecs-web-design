import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SettingsSectionProps {
  theme: string;
  onThemeChange: (theme: string) => void;
}

const themes = [
  { id: 'default', name: 'Черно-белая', color: '#ffffff' },
  { id: 'yellow', name: 'Желтая', color: '#ffd700' },
  { id: 'purple', name: 'Фиолетовая', color: '#9b87f5' },
  { id: 'red', name: 'Красная', color: '#ef4444' },
  { id: 'green', name: 'Зеленая', color: '#22c55e' },
  { id: 'summer', name: 'Летняя', color: '#882aff' },
  { id: 'autumn', name: 'Осенняя', color: '#fbbf24' },
];

export default function SettingsSection({ theme, onThemeChange }: SettingsSectionProps) {
  return (
    <div className="space-y-6 animate-fade-in">
      <h2 className="text-3xl font-bold gradient-text">Настройки</h2>
      <Card className="glass-card p-6">
        <h3 className="text-xl font-semibold mb-4">Смена темы</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {themes.map(t => (
            <Button
              key={t.id}
              variant={theme === t.id ? 'default' : 'outline'}
              onClick={() => onThemeChange(t.id)}
              className="justify-start"
            >
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: t.color }}
              />
              {t.name}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
