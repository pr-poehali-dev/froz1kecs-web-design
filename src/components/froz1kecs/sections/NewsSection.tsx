import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface NewsSectionProps {
  newsDetailId: string | null;
  onNewsDetailChange: (id: string | null) => void;
}

const news = [
  {
    id: '1',
    title: 'Вайп Лайт анархий - 24.10.25',
    detail: 'Вайп состоялся 24 октября 2025 года. Все игроки начинают с нуля. Удачи в новом сезоне!',
  },
  {
    id: '2',
    title: 'Обновление платформы',
    detail: 'Платформа клана froz1kecs была обновлена. Добавлены новые функции и улучшен дизайн.',
  },
];

export default function NewsSection({ newsDetailId, onNewsDetailChange }: NewsSectionProps) {
  if (newsDetailId) {
    const item = news.find(n => n.id === newsDetailId);
    return (
      <div className="animate-fade-in">
        <Button variant="ghost" onClick={() => onNewsDetailChange(null)} className="mb-4">
          <Icon name="ArrowLeft" size={20} className="mr-2" />
          Назад
        </Button>
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-4 gradient-text">{item?.title}</h2>
          <p className="text-lg">{item?.detail}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <h2 className="text-3xl font-bold gradient-text">Новости</h2>
      {news.map(item => (
        <Card
          key={item.id}
          className="glass-card p-6 cursor-pointer hover-scale"
          onClick={() => onNewsDetailChange(item.id)}
        >
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="opacity-70">Нажми чтобы узнать об обновлениях</p>
        </Card>
      ))}
    </div>
  );
}
